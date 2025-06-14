import React, { useState } from "react";
import { SubtitleItem } from "@/lib/srtParser";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

// Các lựa chọn màu nền và tương ứng màu chữ đảm bảo độ tương phản
const presetThemes = [
  { bg: "#f6f8fc", text: "#202020", name: "Trắng xanh (Mặc định)" },
  { bg: "#000000", text: "#ffffff", name: "Đen" },
  { bg: "#fffbe6", text: "#444444", name: "Vàng nhạt" },
  { bg: "#27282e", text: "#fafbfc", name: "Tối nhẹ" },
  { bg: "#ecfdf5", text: "#065f46", name: "Xanh mint" },
  { bg: "#22223b", text: "#f2e9e4", name: "Xanh đậm - Trắng" },
  { bg: "#f8ffe5", text: "#455e2d", name: "Xanh lá nhạt" },
  { bg: "#ffebee", text: "#b71c1c", name: "Đỏ nhạt" },
];

const fontFamilies = [
  { label: "Sans (Hiện đại)", value: "Inter, Arial, sans-serif" },
  { label: "Serif (Cổ điển)", value: "Georgia, Times New Roman, serif" },
  { label: "Mono", value: "Menlo, Monaco, monospace" },
  { label: "Comic", value: "'Comic Sans MS', cursive, sans-serif" },
  { label: "Montserrat", value: "'Montserrat', Arial, sans-serif" },
  { label: "Roboto", value: "'Roboto', Arial, sans-serif" },
  { label: "Open Sans", value: "'Open Sans', Arial, sans-serif" },
  { label: "Quicksand", value: "'Quicksand', Arial, sans-serif" },
  { label: "Lora", value: "'Lora', Georgia, serif" },
  { label: "Merriweather", value: "'Merriweather', Georgia, serif" },
  { label: "Playfair Display", value: "'Playfair Display', Times New Roman, serif" },
  { label: "Fira Mono", value: "'Fira Mono', Menlo, Monaco, monospace" },
  { label: "Oswald", value: "'Oswald', Arial, sans-serif" },
  { label: "Cabin", value: "'Cabin', Arial, sans-serif" },
];

interface SubtitleListProps {
  items: SubtitleItem[];
}

// Hàm loại bỏ mọi thẻ HTML ra khỏi text
function stripHtmlTags(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

const SubtitleList: React.FC<SubtitleListProps> = ({ items }) => {
  const [search, setSearch] = useState("");

  // Cài đặt theme
  const [bgColor, setBgColor] = useState(presetThemes[0].bg);
  const [textColor, setTextColor] = useState(presetThemes[0].text);
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState(fontFamilies[0].value);

  const filtered =
    search.trim() === ""
      ? items
      : items.filter((item) =>
          stripHtmlTags(item.text).toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div
      className="w-full mt-6 flex flex-col shadow-xl rounded-xl border border-border animate-fade-in"
      style={{
        background: bgColor,
        color: textColor,
        transition: "background 0.2s, color 0.2s",
      }}
    >
      <div className="px-4 pt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 mb-1 sm:mb-0">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Cài đặt hiển thị subtitle"
                className="mr-1"
                style={{
                  color: textColor,
                  background: "transparent",
                  border: "none",
                  boxShadow: "none",
                  padding: 0,
                }}
              >
                <Settings size={22} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div>
                <div className="font-semibold mb-2 flex items-center gap-1">
                  <Settings size={16} />
                  Tuỳ chọn giao diện
                </div>
                <div className="mb-3">
                  <div className="text-xs mb-1">Màu nền:</div>
                  <div className="flex gap-2 flex-wrap">
                    {presetThemes.map((theme, i) => (
                      <button
                        key={theme.bg}
                        onClick={() => {
                          setBgColor(theme.bg);
                          setTextColor(theme.text);
                        }}
                        className={`rounded-full border w-7 h-7 flex items-center justify-center cursor-pointer transition focus:ring-2 ${bgColor === theme.bg ? "ring-2 ring-primary" : ""}`}
                        style={{
                          background: theme.bg,
                          borderColor: theme.bg === "#000000" ? "#ccc" : theme.bg,
                        }}
                        aria-label={theme.name}
                        title={theme.name}
                        type="button"
                      >
                        {bgColor === theme.bg && (
                          <span className="block w-3 h-3 rounded-full border border-white bg-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-3">
                  <div className="text-xs mb-1">Font size:</div>
                  <div className="flex gap-2 items-center">
                    <Button size="sm" variant="outline" aria-label="Giảm" onClick={() => setFontSize((f) => Math.max(12, f - 2))}>-</Button>
                    <span className="text-sm px-2">{fontSize}px</span>
                    <Button size="sm" variant="outline" aria-label="Tăng" onClick={() => setFontSize((f) => Math.min(40, f + 2))}>+</Button>
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-1">Font chữ:</div>
                  <select
                    value={fontFamily}
                    onChange={e => setFontFamily(e.target.value)}
                    className="rounded border px-2 py-1 text-sm bg-background"
                  >
                    {fontFamilies.map(f => (
                      <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <h2 className="text-xl sm:text-2xl font-bold flex-1" style={{ color: textColor }}>
            Danh sách Subtitles ({filtered.length})
          </h2>
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm nội dung..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-md border px-3 py-2 bg-accent focus:outline-primary transition w-full sm:w-56 text-base"
          style={{ color: textColor, background: "#fafbfc" }}
        />
      </div>
      <div
        className="max-h-[60vh] overflow-y-auto px-2 sm:px-4 pb-4 mt-1 flex flex-col gap-2"
        style={{ fontSize, fontFamily, color: textColor }}
      >
        {filtered.length === 0 ? (
          <div className="text-center text-muted-foreground py-6 text-base">Không tìm thấy subtitle nào.</div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className="bg-accent/60 rounded-lg py-3 px-4 text-base sm:text-lg font-mono whitespace-pre-line transition border hover:border-primary/40 cursor-pointer select-text"
              style={{
                wordBreak: "break-word",
                fontSize,
                fontFamily,
                background: "inherit",
                color: "inherit",
              }}
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
