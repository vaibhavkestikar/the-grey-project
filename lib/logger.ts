type LogContext = Record<string, string | number | boolean | null | undefined>;

export function logError(
  scope: string,
  context: LogContext,
  error: unknown
): void {
  const message = error instanceof Error ? error.message : String(error);
  console.error(
    JSON.stringify({
      level: "error",
      scope,
      ...context,
      message,
      timestamp: new Date().toISOString(),
    })
  );
}