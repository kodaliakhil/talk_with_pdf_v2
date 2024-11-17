import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import EditorExtensions from "./EditorExtensions";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const TextEditor = ({ fileId }) => {
  const notes = useQuery(api.notes.GetNotes, { fileId: fileId });
  console.log(notes);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Type something..." }),
    ],

    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "h-screen p-5 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    editor && editor.commands.setContent(notes);
  }, [editor && notes]);

  return (
    <div>
      <EditorExtensions editor={editor} />
      <div className="overflow-scroll h-[88vh]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TextEditor;
