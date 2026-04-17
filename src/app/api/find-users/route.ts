import { NextResponse } from "next/server";

// Force Vercel and Next.js to allow this endpoint up to 60 seconds of execution time
// This prevents the default Vercel Hobby tier 10-second drop.
export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Set an explicit 59-second timeout inside the proxy itself
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 590000);

    const response = await fetch("https://orkhan57.app.n8n.cloud/webhook-test/find-users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
      // Prevents caching of the n8n response
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    // Forward whatever raw data n8n replies with (whether perfectly valid JSON or empty text)
    const rawText = await response.text();

    return new NextResponse(rawText, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json",
      },
    });
  } catch (error: any) {
    console.error("Next.js Proxy Error:", error.message);
    if (error.name === "AbortError") {
      return NextResponse.json({ error: "n8n took longer than 60 seconds to respond." }, { status: 504 });
    }
    return NextResponse.json({ error: "Connection to n8n failed entirely." }, { status: 500 });
  }
}
