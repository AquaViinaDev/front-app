# Multi-stage build for Next.js (glibc base to avoid SWC/minifier musl edge-cases)
FROM node:20-bookworm-slim AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_API_URL
ARG API_INTERNAL_URL
ARG NEXT_PUBLIC_MEDIA_URL
ARG NEXT_PUBLIC_DEFAULT_LOCALE
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV API_INTERNAL_URL=$API_INTERNAL_URL
ENV NEXT_PUBLIC_MEDIA_URL=$NEXT_PUBLIC_MEDIA_URL
ENV NEXT_PUBLIC_DEFAULT_LOCALE=$NEXT_PUBLIC_DEFAULT_LOCALE
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ARG API_INTERNAL_URL
ARG NEXT_PUBLIC_MEDIA_URL
ARG NEXT_PUBLIC_DEFAULT_LOCALE
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV API_INTERNAL_URL=$API_INTERNAL_URL
ENV NEXT_PUBLIC_MEDIA_URL=$NEXT_PUBLIC_MEDIA_URL
ENV NEXT_PUBLIC_DEFAULT_LOCALE=$NEXT_PUBLIC_DEFAULT_LOCALE

RUN apt-get update && apt-get install -y --no-install-recommends curl \
  && rm -rf /var/lib/apt/lists/*

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
