
import React, { useState } from "react";
import SubtitleUploader from "@/components/SubtitleUploader";
import SubtitleList from "@/components/SubtitleList";
import { parseSRT, SubtitleItem } from "@/lib/srtParser";

const Index = () => {
  const [subtitles, setSubtitles] = useState<SubtitleItem[] | null>(null);

  const handleSrtUpload = (content: string) => {
    const result = parseSRT(content);
    setSubtitles(result);
  };

  if (subtitles) {
    // Khi đã có phụ đề chỉ hiển thị mỗi SubtitleList
    return (
      <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-indigo-100 flex flex-col items-center justify-center py-2 px-1">
        <div className="w-full max-w-[650px] sm:max-w-[700px] mx-auto">
          <SubtitleList items={subtitles} />
        </div>
      </div>
    );
  }

  // Khi chưa có phụ đề vẫn hiển thị giao diện tải lên như cũ
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-indigo-100 flex flex-col items-center justify-center py-6 px-2">
      <div className="w-full max-w-[950px] mx-auto">
        <div className="bg-white/90 shadow-2xl rounded-xl px-2 sm:px-8 py-5 sm:py-10 flex flex-col items-center gap-6 animate-scale-in">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-primary mb-2 tracking-tight drop-shadow text-center">
            SRT Subtitle Viewer
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-2 max-w-xl text-center">
            Xem, lọc và tìm kiếm file phụ đề .srt dễ dàng! Kéo thả file hoặc chọn file trên máy bạn để bắt đầu.
          </p>
          <SubtitleUploader onUpload={handleSrtUpload} />
          <div className="text-sm mt-3 text-muted-foreground">Chưa có file nào được tải lên</div>
        </div>
      </div>
    </div>
  );
};

export default Index;

