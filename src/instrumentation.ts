export function register() {
  process.on("uncaughtException", (error) => {
    console.error("uncaughtException", error);
  });

  process.on("unhandledRejection", (reason) => {
    console.error("unhandledRejection", reason);
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
}
