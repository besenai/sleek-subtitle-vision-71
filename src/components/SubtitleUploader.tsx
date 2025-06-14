
import React, { useRef } from "react";
import { toast } from "@/hooks/use-toast";

interface SubtitleUploaderProps {
  onUpload: (content: string) => void;
}

const SubtitleUploader: React.FC<SubtitleUploaderProps> = ({ onUpload }) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.name.endsWith(".srt")) {
      toast({ title: "Vui lòng chọn file .srt!", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onUpload(content);
      toast({ title: "Tải file SRT thành công!", variant: "default" });
    };
    reader.onerror = () => {
      toast({ title: "Không thể đọc file!", variant: "destructive" });
    };
    reader.readAsText(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) handleFile(file);
  };

  return (
    <div
      className="w-full py-10 border-2 border-dashed border-accent rounded-xl cursor-pointer bg-accent/30 hover:bg-accent/40 transition flex flex-col items-center gap-3"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      onClick={() => ref.current?.click()}
      tabIndex={0}
      role="button"
      aria-label="Chọn hoặc kéo thả file SRT"
    >
      <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-primary/70 mb-2">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v-8m0 0l-3.5 3.5M12 8l3.5 3.5M19 17.998A4 4 0 0115 13.999H9a4 4 0 01-4 4"/>
      </svg>
      <span className="font-semibold text-lg">Kéo &amp; thả hoặc bấm vào đây để chọn file SRT</span>
      <span className="text-xs text-muted-foreground">(Chỉ hỗ trợ file .srt)</span>
      <input
        ref={ref}
        type="file"
        accept=".srt"
        onChange={onInputChange}
        className="hidden"
      />
    </div>
  );
};

export default SubtitleUploader;
