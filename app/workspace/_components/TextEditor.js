import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import EditorExtensions from "./EditorExtensions";

const TextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit,Placeholder.configure({ placeholder: "Type something..." })],

    
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "h-screen p-5 focus:outline-none",
      },
    }
  });
  return (
    <div>
       <EditorExtensions editor={editor}/>
      <div>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TextEditor;
