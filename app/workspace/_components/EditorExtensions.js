import { Bold, ItalicIcon, UnderlineIcon } from "lucide-react";
import React from "react";

const EditorExtensions = ({ editor }) => {
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
            className={editor.isActive('underline') ? 'text-blue-500' : ''}
          >
            <UnderlineIcon/>
          </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditorExtensions;
