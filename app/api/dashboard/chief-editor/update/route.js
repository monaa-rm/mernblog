export const dynamic = 'force-dynamic'
import connect from "@/utils/connect";
import { NextResponse } from "next/server";
import ChiefEditor from "@/model/ChiefEditor";

export async function POST(req) {
  try {
    connect();
    const inputData = await req.json();
    const chief_editor_id = inputData.goalId;

    
    // CHECK EXISTING CHIEF EDITOR NUMBER
    if (inputData.number != undefined) {
      const existChiefEditor = await ChiefEditor.findOne({
        number: inputData.number,
        situation: true,
      });
      if (existChiefEditor) {
        const oldChiefEditorData = {
          situation: false,
        };
        await ChiefEditor.findOneAndUpdate(
          existChiefEditor._id,
          oldChiefEditorData,
          { new: true }
        );
      }
    }
    
    // CHECK EXISTING CHIEF EDITOR SITUATION
    if (inputData.situation != undefined) {
      const theNumber = await ChiefEditor.findById(chief_editor_id)
      const existChiefEditor = await ChiefEditor.findOne({
        situation: inputData.situation,
        number : theNumber.number
      });
      if (existChiefEditor) {
        const oldChiefEditorData = {
          situation: false,
        };
        await ChiefEditor.findOneAndUpdate(
          existChiefEditor._id,
          oldChiefEditorData,
          { new: true }
        );
      }
    }
    
    const newData = {
      situation: inputData.situation,
      number: inputData.number,
    };


    await ChiefEditor.findByIdAndUpdate(chief_editor_id, newData, {
      new: true,
    });

    return NextResponse.json(
      { data: "اطلاعات به روزرسانی شد." },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: "خطا " }, { status: 401 });
  }
}
