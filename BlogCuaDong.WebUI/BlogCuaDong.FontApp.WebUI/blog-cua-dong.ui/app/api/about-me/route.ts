import { NextResponse } from "next/server";
import { getAboutMeContent, saveAboutMeContent } from "@/lib/about-me-service";
import { withApiErrorHandler } from "@/lib/api-error-handler";

export const GET = withApiErrorHandler(async () => {
  const content = await getAboutMeContent();
  return NextResponse.json(content);
});

export const PUT = withApiErrorHandler(async (request) => {
  const payload = await request.json();
  const content = await saveAboutMeContent(payload);
  return NextResponse.json(content);
});
