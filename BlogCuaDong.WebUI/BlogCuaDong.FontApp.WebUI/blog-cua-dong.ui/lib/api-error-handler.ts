import { NextResponse } from "next/server";

export class HttpError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status = 500, details?: unknown) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.details = details;
  }
}

type RouteHandler = (request: Request) => Promise<Response> | Response;

function toErrorResponse(error: unknown) {
  if (error instanceof HttpError) {
    return NextResponse.json(
      {
        message: error.message,
        details: error.details,
      },
      { status: error.status },
    );
  }

  console.error("Unhandled API error", error);
  return NextResponse.json(
    {
      message: "Unexpected server error",
    },
    { status: 500 },
  );
}

export function withApiErrorHandler(handler: RouteHandler) {
  return async function wrappedHandler(request: Request) {
    try {
      return await handler(request);
    } catch (error) {
      return toErrorResponse(error);
    }
  };
}
