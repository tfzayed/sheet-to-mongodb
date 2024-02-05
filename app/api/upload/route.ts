import connectDB from "@/lib/mongodb";
import DataModel from "@/model/DataModel";
import { Item } from "@/types/Type";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body: Item = await req.json();

  await connectDB();

  try {
    const options = { ordered: true };
    const result = await DataModel.insertMany(body, options);

    return NextResponse.json({
      success: "Data Added",
    });
  } catch (error) {
    return NextResponse.json({
      failed: "Data Failed to Add",
    });
  }
}
