
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
    // Bao khung nội dung chính vào main cho chuẩn SEO
    return (
      <main className="h-screen min-h-0 bg-gradient-to-tr from-blue-50 to-indigo-100 flex flex-col items-center justify-center py-0 px-0">
        <section className="flex flex-col w-full h-full max-w-[750px] mx-auto flex-1 min-h-0 px-1 sm:px-0" aria-label="Danh sách phụ đề">
          <SubtitleList items={subtitles} />
        </section>
      </main>
    );
  }

  // Giao diện khi chưa có phụ đề, cũng đặt main và section cho cấu trúc SEO
  return (
    <main className="h-screen min-h-0 bg-gradient-to-tr from-blue-50 to-indigo-100 flex flex-col items-center justify-center py-0 px-0">
      <section className="flex flex-col w-full h-full max-w-[750px] mx-auto flex-1 min-h-0 justify-center px-1 sm:px-0" aria-label="Trang tải lên phụ đề">
        <div className="bg-white/90 shadow-2xl rounded-xl px-2 sm:px-8 py-5 sm:py-10 flex flex-col items-center gap-6 animate-scale-in w-full">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-primary mb-2 tracking-tight drop-shadow text-center">
            SRT Subtitle Viewer
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-2 max-w-xl text-center">
            Xem, lọc và tìm kiếm file phụ đề .srt dễ dàng! Kéo thả file hoặc chọn file trên máy bạn để bắt đầu.
          </p>
          <SubtitleUploader onUpload={handleSrtUpload} />
          <div className="text-sm mt-3 text-muted-foreground">Chưa có file nào được tải lên</div>
        </div>
      </section>
    </main>
  );
};

export default Index;
