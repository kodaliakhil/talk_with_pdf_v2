import { chatSession } from "@/configs/AIModel";
import { api } from "@/convex/_generated/api";
import { useAction } from "convex/react";
import { Bold, ItalicIcon, Sparkles, UnderlineIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner"
import React from "react";

const EditorExtensions = ({ editor }) => {
  const { fileId } = useParams();

  const SearchAI = useAction(api.myActions.search);
  const onAiClick = async () => {
    toast("AI is thinking...");
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      " "
    );
    console.log(selectedText);
    const result = await SearchAI({ query: selectedText, fileId: fileId });
    const unformattedAns = JSON.parse(result);
    let allUnformattedAns = "";
    unformattedAns &&
      unformattedAns.forEach((item) => {
        allUnformattedAns += item.pageContent;
      });
    const PROMPT = `For question:${selectedText} and with the given content as answer, please give appropriate answer in HTML format. The answer content is: ${allUnformattedAns}`;
    const AiModelResult = await chatSession.sendMessage(PROMPT);
    console.log(AiModelResult.response.text());
    const finalAns = AiModelResult.response
      .text()
      .replace("```", "")
      .replace("html", "")
      .replace("```", "");
    const AllText = editor.getHTML();
    editor.commands.setContent(
      AllText + "<p> <strong>Answer: </strong>" + finalAns + " </p>"
    );
  };
  return (
    editor && (
      <div className="p-5 ">
        <div className="control-group">
          <div className="button-group flex gap-3">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "text-blue-500" : ""}
            >
              <Bold />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "text-blue-500" : ""}
            >
              <ItalicIcon />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive("underline") ? "text-blue-500" : ""}
            >
              <UnderlineIcon />
            </button>
            <button
              onClick={() => onAiClick()}
              className={"hover:text-blue-500"}
            >
              <Sparkles />
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditorExtensions;
