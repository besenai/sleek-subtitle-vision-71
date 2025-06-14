
import React, { useState } from "react";
import { SubtitleItem } from "@/lib/srtParser";

interface SubtitleListProps {
  items: SubtitleItem[];
}

// Hàm loại bỏ mọi thẻ HTML ra khỏi text
function stripHtmlTags(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

const SubtitleList: React.FC<SubtitleListProps> = ({ items }) => {
  const [search, setSearch] = useState("");

  const filtered =
    search.trim() === ""
      ? items
      : items.filter(
          (item) => stripHtmlTags(item.text).toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div className="w-full mt-6 flex flex-col bg-card shadow-xl rounded-xl border border-border animate-fade-in">
      <div className="px-4 pt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        <h2 className="text-xl sm:text-2xl font-bold flex-1">Danh sách Subtitles ({filtered.length})</h2>
        <input
          type="text"
          placeholder="Tìm kiếm nội dung..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-md border px-3 py-2 bg-accent focus:outline-primary transition w-full sm:w-56 text-base"
        />
      </div>
      <div className="max-h-[60vh] overflow-y-auto px-2 sm:px-4 pb-4 mt-1 flex flex-col gap-2">
        {filtered.length === 0 ? (
          <div className="text-center text-muted-foreground py-6 text-base">
            Không tìm thấy subtitle nào.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-accent/60 rounded-lg py-3 px-4 text-base sm:text-lg font-mono whitespace-pre-line transition border hover:border-primary/40 cursor-pointer select-text"
              style={{ wordBreak: "break-word" }}
            >
              {stripHtmlTags(item.text)}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubtitleList;
