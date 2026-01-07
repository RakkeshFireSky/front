import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const BACKEND_URL = process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASE_URL_DEVELOPMENT
    : process.env.NEXT_PUBLIC_BASE_URL;
  const backendRes = await fetch(
    `${BACKEND_URL}/api/sign-in`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    }
  );

  const data = await backendRes.json();

  return NextResponse.json(data, {
    status: backendRes.status,
    headers: {
      "Set-Cookie": backendRes.headers.get("set-cookie") ?? "",
    },
  });
}
