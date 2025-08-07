// components/RichTextEditor.tsx
import { useRef, memo } from "react";
import JoditEditor from "jodit-react";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

function RichTextEditor({ value, onChange }: Props) {
  const editor = useRef(null);

  const config = {
    readonly: false,
    height: 350,
    placeholder: "Write your note here",
  };

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      onBlur={(newContent) => onChange(newContent)}
    />
  );
}

export default memo(RichTextEditor);
