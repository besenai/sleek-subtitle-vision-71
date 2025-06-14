import React, { useState, useEffect } from "react";
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

// Font chữ
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

// Danh sách ngôn ngữ phổ biến với mã
const LANGUAGES: { label: string; value: string }[] = [
  { label: "Tiếng Anh", value: "en" },
  { label: "Tiếng Việt", value: "vi" },
  { label: "Tiếng Nhật", value: "ja" },
  { label: "Tiếng Hàn", value: "ko" },
  { label: "Tiếng Pháp", value: "fr" },
  { label: "Tiếng Trung", value: "zh" },
  { label: "Tiếng Đức", value: "de" },
  { label: "Tiếng Tây Ban Nha", value: "es" },
  { label: "Tiếng Nga", value: "ru" },
  { label: "Tiếng Thái", value: "th" },
  { label: "Tiếng Ý", value: "it" },
];

// Hàm loại bỏ mọi thẻ HTML ra khỏi text
function stripHtmlTags(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

interface SubtitleListProps {
  items: SubtitleItem[];
}

type AnalysisResult = {
  status: "idle" | "loading" | "error" | "success";
  message?: string;
  data?: string; // Kết quả hiển thị (HTML hoặc plain text)
};

const LOCAL_KEY = "subtitle_settings";
type LocalSettings = {
  apiKey?: string;
  subtitleLang?: string;
  nativeLang?: string;
};

const SubtitleList: React.FC<SubtitleListProps> = ({ items }) => {
  // UI settings
  const [search, setSearch] = useState("");
  const [bgColor, setBgColor] = useState(presetThemes[0].bg);
  const [textColor, setTextColor] = useState(presetThemes[0].text);
  const [fontSize, setFontSize] = useState(18);
  const [fontFamily, setFontFamily] = useState(fontFamilies[0].value);

  // API và ngôn ngữ
  const [apiKey, setApiKey] = useState<string>("");
  const [subtitleLang, setSubtitleLang] = useState("en");
  const [nativeLang, setNativeLang] = useState("vi");

  // Đọc settings từ localStorage
  useEffect(() => {
    const local = localStorage.getItem(LOCAL_KEY);
    if (local) {
      try {
        const parsed: LocalSettings = JSON.parse(local);
        if (parsed.apiKey) setApiKey(parsed.apiKey);
        if (parsed.subtitleLang) setSubtitleLang(parsed.subtitleLang);
        if (parsed.nativeLang) setNativeLang(parsed.nativeLang);
      } catch {}
    }
  }, []);

  // Lưu settings vào localStorage
  useEffect(() => {
    localStorage.setItem(
      LOCAL_KEY,
      JSON.stringify({ apiKey, subtitleLang, nativeLang })
    );
  }, [apiKey, subtitleLang, nativeLang]);

  // Trạng thái mở rộng và phân tích
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<Record<string, AnalysisResult>>({});

  // Khi click subtitle
  const handleSubtitleClick = async (item: SubtitleItem) => {
    const id = item.id as string;
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(id);

    // Nếu đã phân tích rồi thì không cần gọi lại
    if (analysis[id]?.status === "success") return;

    if (!apiKey) {
      setAnalysis(a => ({
        ...a,
        [id]: { status: "error", message: "Vui lòng nhập Google API Key trước." },
      }));
      return;
    }
    setAnalysis(a => ({
      ...a,
      [id]: { status: "loading" },
    }));

    try {
      // Chuẩn bị prompt (gọi bằng model Gemini 1.5 của Google AI Studio API)
      const prompt = `
        Phân tích toàn diện ngữ pháp đoạn văn sau (hiện ở định dạng bảng, kèm giải thích rõ ràng từng cấu trúc được phát hiện) từ ngôn ngữ '${subtitleLang}' sang tiếng '${nativeLang}':\n
        "${stripHtmlTags(item.text)}"
        Trả về kết quả rõ ràng, ngắn gọn (sử dụng tiếng ${LANGUAGES.find(l => l.value === nativeLang)?.label || "mẹ đẻ"}), bao gồm:
        - Dịch nghĩa đầy đủ nếu chưa cùng ngôn ngữ
        - Bảng phân tích từ loại, vai trò ngữ pháp, cấu trúc nổi bật.
        - Những điểm ngữ pháp đáng chú ý.
        Không nói lan man.
      `;

      // Gọi API Gemini aistudio (Google, endpoint public)
      const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 512,
            stopSequences: [],
            topP: 0.8,
            topK: 32,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          ],
        }),
      });

      if (!res.ok) throw new Error("Lỗi kết nối đến API Google: " + res.status);
      const data = await res.json();
      let outText: string = "";

      // Tuỳ trả về json, parse content
      if (
        data &&
        data.candidates &&
        data.candidates[0]?.content &&
        Array.isArray(data.candidates[0].content.parts)
      ) {
        outText = data.candidates[0].content.parts
          .map((part: any) => part.text || "")
          .join("\n")
          .trim();
      } else {
        throw new Error("Không tìm thấy kết quả phân tích.");
      }

      setAnalysis(a => ({
        ...a,
        [id]: { status: "success", data: outText },
      }));
    } catch (e: any) {
      setAnalysis(a => ({
        ...a,
        [id]: { status: "error", message: (e?.message || "Lỗi không xác định!") },
      }));
    }
  };

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
            <PopoverContent className="w-80 max-h-[80vh] overflow-y-auto">
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
                <div className="mb-3">
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
                <hr className="my-3" />
                <div className="font-semibold mb-2 mt-2">Cấu hình API & ngôn ngữ</div>
                <div className="mb-3">
                  <div className="text-xs mb-1">Google API key dùng Gemini:</div>
                  <input
                    type="password"
                    autoComplete="off"
                    value={apiKey}
                    placeholder="Nhập Google API key"
                    onChange={e => setApiKey(e.target.value.trim())}
                    className="rounded border px-2 py-1 text-sm bg-background w-full"
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Đăng ký miễn phí tại <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener" className="underline text-blue-600">Google AI Studio</a>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="text-xs mb-1">Ngôn ngữ của phụ đề:</div>
                  <select
                    value={subtitleLang}
                    onChange={e => setSubtitleLang(e.target.value)}
                    className="rounded border px-2 py-1 text-sm bg-background w-full"
                  >
                    {LANGUAGES.map(lang =>
                      <option value={lang.value} key={lang.value}>{lang.label}</option>
                    )}
                  </select>
                </div>
                <div>
                  <div className="text-xs mb-1">Ngôn ngữ mẹ đẻ của bạn:</div>
                  <select
                    value={nativeLang}
                    onChange={e => setNativeLang(e.target.value)}
                    className="rounded border px-2 py-1 text-sm bg-background w-full"
                  >
                    {LANGUAGES.map(lang =>
                      <option value={lang.value} key={lang.value}>{lang.label}</option>
                    )}
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
          filtered.map((item) => {
            const isExpanded = expandedId === item.id;
            const analysisResult = analysis[item.id as string];
            return (
              <div key={item.id} className="group">
                <div
                  className={`bg-accent/60 rounded-lg py-3 px-4 text-base sm:text-lg font-mono whitespace-pre-line transition border hover:border-primary/40 cursor-pointer select-text`}
                  style={{
                    wordBreak: "break-word",
                    fontSize,
                    fontFamily,
                    background: "inherit",
                    color: "inherit",
                  }}
                  onClick={() => handleSubtitleClick(item)}
                  tabIndex={0}
                  aria-expanded={isExpanded}
                >
                  {stripHtmlTags(item.text)}
                  <span className="ml-2 text-xs text-primary group-hover:underline">{isExpanded ? "▲" : "▼"}</span>
                </div>
                {isExpanded && (
                  <div className="border rounded-lg mt-1 bg-background p-3 animate-fade-in text-sm whitespace-pre-wrap break-words">
                    {!analysisResult || analysisResult.status === "idle" || analysisResult.status === "loading" ? (
                      <span className="block py-2 text-muted-foreground">
                        Đang phân tích ngữ pháp... <span className="animate-pulse">⏳</span>
                      </span>
                    ) : analysisResult.status === "error" ? (
                      <span className="block py-2 text-destructive">{analysisResult.message}</span>
                    ) : (
                      <span dangerouslySetInnerHTML={{ __html: analysisResult.data || "" }} />
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SubtitleList;
