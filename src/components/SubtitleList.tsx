
import React, { useState } from "react";
import { SubtitleItem } from "@/lib/srtParser";

interface SubtitleListProps {
  items: SubtitleItem[];
}

const SubtitleList: React.FC<SubtitleListProps> = ({ items }) => {
  const [search, setSearch] = useState("");
  const [highlightId, setHighlightId] = useState<number|null>(null);

  const filtered =
    search.trim() === ""
      ? items
      : items.filter(
          (item) =>
            item.text.toLowerCase().includes(search.toLowerCase()) ||
            item.id.toString() === search ||
            item.start.includes(search) ||
            item.end.includes(search)
        );

  return (
    <div className="w-full mt-6 flex flex-col bg-card shadow-xl rounded-xl border border-border animate-fade-in">
      <div className="px-6 pt-5 flex flex-col sm:flex-row sm:items-center gap-2">
        <h2 className="text-2xl font-bold flex-1">Danh sách Subtitles ({filtered.length})</h2>
        <input
          type="text"
          placeholder="Tìm kiếm nội dung, thời gian, số dòng..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-md border px-3 py-1 bg-accent focus:outline-primary transition w-full sm:w-56 text-base"
        />
      </div>
      <div className="overflow-x-auto overflow-y-auto max-h-[60vh] mt-3 min-h-[10rem]">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-accent/70">
              <th className="text-left px-4 py-2 text-sm font-medium text-muted-foreground">#</th>
              <th className="text-left px-4 py-2 text-sm font-medium text-muted-foreground">Thời gian</th>
              <th className="text-left px-4 py-2 text-sm font-medium text-muted-foreground">Nội dung</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-4 text-center text-muted-foreground">Không tìm thấy subtitle nào.</td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr
                  key={item.id}
                  className={`transition cursor-pointer hover:bg-primary/10 ${
                    highlightId === item.id ? "bg-primary/10 text-primary" : ""
                  }`}
                  onMouseEnter={() => setHighlightId(item.id)}
                  onMouseLeave={() => setHighlightId(null)}
                  onClick={() => setHighlightId(item.id)}
                >
                  <td className="px-4 py-2 w-10 font-semibold">{item.id}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{item.start} - {item.end}</td>
                  <td className="px-4 py-2 font-mono whitespace-pre-line">{item.text}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubtitleList;
