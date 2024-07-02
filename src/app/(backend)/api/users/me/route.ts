import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    console.log(userId);
    if (!userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User Found", data: user });
  } catch (error: any) {
    console.error("Error fetching user details:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
