
import React, { useState } from "react";
import SubtitleUploader from "@/components/SubtitleUploader";
import SubtitleList from "@/components/SubtitleList";
import SidebarBanner from "@/components/SidebarBanner";
import { parseSRT, SubtitleItem } from "@/lib/srtParser";

const SIDEBAR_WIDTH = "180px"; // desktop

const Index = () => {
  const [subtitles, setSubtitles] = useState<SubtitleItem[] | null>(null);

  const handleSrtUpload = (content: string) => {
    const result = parseSRT(content);
    setSubtitles(result);
  };

  // Wrapper 3 cột layout (desktop: hàng ngang, mobile: dọc)
  return (
    <div className="h-screen w-full min-h-0 bg-gradient-to-tr from-blue-50 to-indigo-100 flex flex-col py-0 px-0">
      <div
        className="flex flex-1 w-full min-h-0"
        style={{
          // Cho phép responsive sidebar
          flexDirection: "row",
        }}
      >
        {/* Sidebar trái */}
        <div
          className="hidden md:flex flex-col justify-center items-center h-full min-h-0 px-2"
          style={{
            width: SIDEBAR_WIDTH,
            minWidth: SIDEBAR_WIDTH,
            maxWidth: SIDEBAR_WIDTH,
          }}
        >
          <SidebarBanner>
            <span>Quảng cáo bên trái</span>
          </SidebarBanner>
        </div>

        {/* Mobile: sidebar trái trên cùng */}
        <div className="md:hidden flex flex-shrink-0 px-2 pt-3">
          <SidebarBanner>
            <span>Quảng cáo bên trái</span>
          </SidebarBanner>
        </div>

        {/* Main content */}
        <div
          className="flex flex-col w-full max-w-[750px] flex-1 min-h-0 justify-center mx-auto px-1 sm:px-0"
          style={{
            minWidth: 0, // Bắt buộc để flex shrink
          }}
        >
          {subtitles ? (
            <SubtitleList items={subtitles} />
          ) : (
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
          )}
        </div>

        {/* Sidebar phải */}
        <div
          className="hidden md:flex flex-col justify-center items-center h-full min-h-0 px-2"
          style={{
            width: SIDEBAR_WIDTH,
            minWidth: SIDEBAR_WIDTH,
            maxWidth: SIDEBAR_WIDTH,
          }}
        >
          <SidebarBanner>
            <span>Quảng cáo bên phải</span>
          </SidebarBanner>
        </div>
      </div>

      {/* Mobile: sidebar phải dưới cùng */}
      <div className="md:hidden flex flex-shrink-0 px-2 pb-3">
        <SidebarBanner>
          <span>Quảng cáo bên phải</span>
        </SidebarBanner>
      </div>
    </div>
  );
};

export default Index;
