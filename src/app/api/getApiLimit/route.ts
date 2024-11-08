import { NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    // console.log("userid", userId);?
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // console.log("userid", userId);
    const userApiLimit = await prismadb.userApiLimit.findUnique({
      where: { userId },
    });
    return NextResponse.json(
      {
        apiLimit: userApiLimit ? userApiLimit.apiLimit : 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching API limit:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
