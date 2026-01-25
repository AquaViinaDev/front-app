export function register() {
  process.on("uncaughtException", (error) => {
    console.error("uncaughtException", error);
    if (error instanceof Error) {
      console.error("uncaughtException.stack", error.stack);
    }
  });

  process.on("unhandledRejection", (reason) => {
    console.error("unhandledRejection", reason);
    if (reason instanceof Error) {
      console.error("unhandledRejection.stack", reason.stack);
    }
  });
}

export function onRequestError(
  error: unknown,
  request: { url?: string; method?: string },
  context: { routeType?: string }
) {
  console.error("onRequestError", {
    url: request?.url,
    method: request?.method,
    routeType: context?.routeType,
    error,
  });
  if (error instanceof Error) {
    console.error("onRequestError.stack", error.stack);
  }
}
