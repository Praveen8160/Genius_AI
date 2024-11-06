import { NextResponse } from "next/server";
import prismadb from "../../../lib/prismadb";
export async function POST(req: Request) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      console.log("hello");
      return 0;
    }

    const userApiLimit = await prismadb.userApiLimit.findUnique({
      where: {
        userId,
      },
    });

    if (!userApiLimit) {
      console.log("hyy");
      return 0;
    }
    return NextResponse.json(userApiLimit.apiLimit);
  } catch (error) {
    console.log("error", error);
  }
}
