export const runtime = "nodejs";

export const GET = async () =>
  new Response(JSON.stringify({ status: "ok" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
