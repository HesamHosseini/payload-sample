import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("payload-token")?.value;

    return NextResponse.json({ token });
}
