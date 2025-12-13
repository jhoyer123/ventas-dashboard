import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[150px] p-3",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sincronizar valor externo con el editor
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  const ToolbarButton = ({
    isActive,
    onClick,
    children,
    title,
  }: {
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault(); // Previene que el editor pierda el foco
        onClick();
      }}
      title={title}
      className={`
        px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150
        ${
          isActive
            ? "bg-blue-600 text-white shadow-sm"
            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
        }
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      {/* TOOLBAR */}
      <div className="flex flex-wrap gap-2 p-3 bg-gray-50 border-b border-gray-300">
        {/* Formato de texto */}
        <div className="flex gap-1">
          <ToolbarButton
            isActive={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
            title="Negrita (Ctrl+B)"
          >
            <strong>B</strong>
          </ToolbarButton>

          <ToolbarButton
            isActive={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            title="Cursiva (Ctrl+I)"
          >
            <em>I</em>
          </ToolbarButton>

          <ToolbarButton
            isActive={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            title="Subrayado (Ctrl+U)"
          >
            <u>U</u>
          </ToolbarButton>

          <ToolbarButton
            isActive={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            title="Tachado"
          >
            <s>S</s>
          </ToolbarButton>
        </div>

        {/* Separador */}
        <div className="w-px bg-gray-300 h-8 self-center"></div>

        {/* Encabezados */}
        <div className="flex gap-1">
          <ToolbarButton
            isActive={editor.isActive("heading", { level: 1 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            title="Título 1"
          >
            H1
          </ToolbarButton>

          <ToolbarButton
            isActive={editor.isActive("heading", { level: 2 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            title="Título 2"
          >
            H2
          </ToolbarButton>

          <ToolbarButton
            isActive={editor.isActive("heading", { level: 3 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            title="Título 3"
          >
            H3
          </ToolbarButton>
        </div>

        {/* Separador */}
        <div className="w-px bg-gray-300 h-8 self-center"></div>

        {/* Listas */}
        <div className="flex gap-1">
          <ToolbarButton
            isActive={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            title="Lista con viñetas"
          >
            • Lista
          </ToolbarButton>

          <ToolbarButton
            isActive={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            title="Lista numerada"
          >
            1. Lista
          </ToolbarButton>
        </div>

        {/* Separador */}
        {/* <div className="w-px bg-gray-300 h-8 self-center"></div> */}

        {/* Cita */}
        {/* <ToolbarButton
          isActive={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Cita"
        >
          " Cita
        </ToolbarButton> */}

        {/* Separador */}
        <div className="w-px bg-gray-300 h-8 self-center"></div>

        {/* Alineación */}
        <div className="flex gap-1">
          <ToolbarButton
            isActive={editor.isActive({ textAlign: "left" })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            title="Alinear a la izquierda"
          >
            ⬅️
          </ToolbarButton>

          <ToolbarButton
            isActive={editor.isActive({ textAlign: "center" })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            title="Centrar"
          >
            ⬆️
          </ToolbarButton>

          <ToolbarButton
            isActive={editor.isActive({ textAlign: "right" })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            title="Alinear a la derecha"
          >
            ➡️
          </ToolbarButton>
        </div>

        {/* Separador */}
        <div className="w-px bg-gray-300 h-8 self-center"></div>

        {/* Línea horizontal */}
        <ToolbarButton
          isActive={false}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Línea horizontal"
        >
          ―
        </ToolbarButton>

        {/* Limpiar formato */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().clearNodes().unsetAllMarks().run();
          }}
          title="Limpiar formato"
          className="px-3 py-1.5 rounded-md text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 border border-red-300 transition-all duration-150"
        >
          🧹 Limpiar
        </button>
      </div>

      {/* EDITOR */}
      <EditorContent
        editor={editor}
        className="bg-white prose prose-sm max-w-none 
                   [&_.ProseMirror]:min-h-[150px] 
                   [&_.ProseMirror]:max-h-[400px] 
                   [&_.ProseMirror]:overflow-y-auto
                   [&_.ProseMirror]:p-4
                   [&_.ProseMirror]:focus:outline-none
                   [&_.ProseMirror_p]:my-2
                   [&_.ProseMirror_h1]:text-2xl
                   [&_.ProseMirror_h1]:font-bold
                   [&_.ProseMirror_h1]:my-4
                   [&_.ProseMirror_h2]:text-xl
                   [&_.ProseMirror_h2]:font-bold
                   [&_.ProseMirror_h2]:my-3
                   [&_.ProseMirror_h3]:text-lg
                   [&_.ProseMirror_h3]:font-bold
                   [&_.ProseMirror_h3]:my-2
                   [&_.ProseMirror_ul]:list-disc
                   [&_.ProseMirror_ul]:ml-6
                   [&_.ProseMirror_ul]:my-2
                   [&_.ProseMirror_ol]:list-decimal
                   [&_.ProseMirror_ol]:ml-6
                   [&_.ProseMirror_ol]:my-2
                   [&_.ProseMirror_li]:my-1
                   [&_.ProseMirror_blockquote]:border-l-4
                   [&_.ProseMirror_blockquote]:border-gray-300
                   [&_.ProseMirror_blockquote]:pl-4
                   [&_.ProseMirror_blockquote]:italic
                   [&_.ProseMirror_blockquote]:text-gray-600
                   [&_.ProseMirror_blockquote]:my-4
                   [&_.ProseMirror_hr]:border-gray-300
                   [&_.ProseMirror_hr]:my-4
                   [&_.ProseMirror_strong]:font-bold
                   [&_.ProseMirror_em]:italic
                   [&_.ProseMirror_u]:underline
                   [&_.ProseMirror_s]:line-through"
      />

      {/* Info de ayuda */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-300 text-xs text-gray-500">
        💡 Usa{" "}
        <kbd className="px-1 py-0.5 bg-gray-200 rounded text-gray-700">
          Ctrl+B
        </kbd>{" "}
        para negrita,
        <kbd className="px-1 py-0.5 bg-gray-200 rounded text-gray-700 ml-1">
          Ctrl+I
        </kbd>{" "}
        para cursiva
      </div>
    </div>
  );
}
