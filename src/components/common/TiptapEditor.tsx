"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { useEffect } from "react";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const TiptapEditor = ({ content, onChange }: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "tiptap focus:outline-none min-h-[300px] px-4 py-2",
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const toggleCode = () => {
    const html = editor.getHTML();
    const isCodeView = editor.view.dom.contentEditable === "false";

    if (isCodeView) {
      // Switch back to visual mode
      editor.view.dom.contentEditable = "true";
      editor.commands.setContent(html);
    } else {
      // Switch to code view
      const codeElement = document.createElement("pre");
      codeElement.textContent = html;
      codeElement.style.cssText = "white-space: pre-wrap; font-family: monospace; font-size: 12px;";
      editor.view.dom.innerHTML = "";
      editor.view.dom.appendChild(codeElement);
      editor.view.dom.contentEditable = "false";
    }
  };

  return (
    <div className="card border-0" style={{ margin: 0 }}>
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-700">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 text-sm rounded hover:bg-gray-700 transition ${
            editor.isActive("bold") ? "bg-gray-700" : ""
          }`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 text-sm rounded hover:bg-gray-700 transition ${
            editor.isActive("italic") ? "bg-gray-700" : ""
          }`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 text-sm rounded hover:bg-gray-700 transition ${
            editor.isActive("strike") ? "bg-gray-700" : ""
          }`}
        >
          Strike
        </button>
        <div className="w-px h-6 bg-gray-700 mx-1"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1 text-sm rounded hover:bg-gray-700 transition ${
            editor.isActive("heading", { level: 1 }) ? "bg-gray-700" : ""
          }`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 text-sm rounded hover:bg-gray-700 transition ${
            editor.isActive("heading", { level: 2 }) ? "bg-gray-700" : ""
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 text-sm rounded hover:bg-gray-700 transition ${
            editor.isActive("heading", { level: 3 }) ? "bg-gray-700" : ""
          }`}
        >
          H3
        </button>
        <div className="w-px h-6 bg-gray-700 mx-1"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 text-sm rounded hover:bg-gray-700 transition ${
            editor.isActive("bulletList") ? "bg-gray-700" : ""
          }`}
        >
          Bullet List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 text-sm rounded hover:bg-gray-700 transition ${
            editor.isActive("orderedList") ? "bg-gray-700" : ""
          }`}
        >
          Numbered List
        </button>
        <div className="w-px h-6 bg-gray-700 mx-1"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`px-3 py-1 text-sm rounded hover:bg-gray-700 transition ${
            editor.isActive({ textAlign: "left" }) ? "bg-gray-700" : ""
          }`}
        >
          Left
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`px-3 py-1 text-sm rounded hover:bg-gray-700 transition ${
            editor.isActive({ textAlign: "center" }) ? "bg-gray-700" : ""
          }`}
        >
          Center
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`px-3 py-1 text-sm rounded hover:bg-gray-700 transition ${
            editor.isActive({ textAlign: "right" }) ? "bg-gray-700" : ""
          }`}
        >
          Right
        </button>
        <div className="w-px h-6 bg-gray-700 mx-1"></div>
        <button
          type="button"
          onClick={addLink}
          className={`px-3 py-1 text-sm rounded hover:bg-gray-700 transition ${
            editor.isActive("link") ? "bg-gray-700" : ""
          }`}
        >
          Link
        </button>
        <button
          type="button"
          onClick={addImage}
          className="px-3 py-1 text-sm rounded hover:bg-gray-700 transition"
        >
          Image
        </button>
        <div className="w-px h-6 bg-gray-700 mx-1"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1 text-sm rounded hover:bg-gray-700 transition ${
            editor.isActive("codeBlock") ? "bg-gray-700" : ""
          }`}
        >
          Code Block
        </button>
        <button
          type="button"
          onClick={toggleCode}
          className="px-3 py-1 text-sm rounded hover:bg-gray-700 transition"
        >
          View HTML
        </button>
        <div className="w-px h-6 bg-gray-700 mx-1"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="px-3 py-1 text-sm rounded hover:bg-gray-700 transition disabled:opacity-50"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="px-3 py-1 text-sm rounded hover:bg-gray-700 transition disabled:opacity-50"
        >
          Redo
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
