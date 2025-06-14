import React, { useState, useEffect, useMemo, useCallback } from "react";
import { SubtitleItem } from "@/lib/srtParser";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

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

// 100 most common languages with ISO 639-1 codes
const LANGUAGES: { label: string; value: string }[] = [
  { label: "English", value: "en" }, { label: "Mandarin Chinese", value: "zh" }, { label: "Hindi", value: "hi" },
  { label: "Spanish", value: "es" }, { label: "French", value: "fr" }, { label: "Standard Arabic", value: "ar" },
  { label: "Bengali", value: "bn" }, { label: "Portuguese", value: "pt" }, { label: "Russian", value: "ru" },
  { label: "Urdu", value: "ur" }, { label: "Indonesian", value: "id" }, { label: "German", value: "de" },
  { label: "Japanese", value: "ja" }, { label: "Swahili", value: "sw" }, { label: "Marathi", value: "mr" },
  { label: "Telugu", value: "te" }, { label: "Turkish", value: "tr" }, { label: "Tamil", value: "ta" },
  { label: "Western Punjabi", value: "pa" }, { label: "Wu Chinese (Shanghainese)", value: "wuu" },
  { label: "Vietnamese", value: "vi" }, { label: "Korean", value: "ko" }, { label: "Hausa", value: "ha" },
  { label: "Javanese", value: "jv" }, { label: "Egyptian Arabic", value: "arz" }, { label: "Italian", value: "it" },
  { label: "Thai", value: "th" }, { label: "Gujarati", value: "gu" }, { label: "Kannada", value: "kn" },
  { label: "Polish", value: "pl" }, { label: "Yue Chinese (Cantonese)", value: "yue" },
  { label: "Persian (Farsi)", value: "fa" }, { label: "Malayalam", value: "ml" }, { label: "Sundanese", value: "su" },
  { label: "Sudanese Arabic", value: "apd" }, { label: "Ukrainian", value: "uk" }, { label: "Bhojpuri", value: "bho" },
  { label: "Tagalog", value: "tl" }, { label: "Romanian", value: "ro" }, { label: "Dutch", value: "nl" },
  { label: "Greek", value: "el" }, { label: "Czech", value: "cs" }, { label: "Hungarian", value: "hu" },
  { label: "Belarusian", value: "be" }, { label: "Swedish", value: "sv" }, { label: "Serbian", value: "sr" },
  { label: "Azerbaijani", value: "az" }, { label: "Chhattisgarhi", value: "hne" }, { label: "Malay", value: "ms" },
  { label: "Nepali", value: "ne" }, { label: "Uzbek", value: "uz" }, { label: "Sindhi", value: "sd" },
  { label: "Moroccan Arabic", value: "ary" }, { label: "Tagalog", value: "tl" }, { label: "Burmese", value: "my" },
  { label: "Amharic", value: "am" }, { label: "Fula", value: "ff" }, { label: "Oromo", value: "om" },
  { label: "Igbo", value: "ig" }, { label: "Uzbek", value: "uz" }, { label: "Maithili", value: "mai" },
  { label: "Yoruba", value: "yo" }, { label: "Uzbek", value: "uz" }, { label: "Sindhi", value: "sd" },
  { label: "Balochi", value: "bal" }, { label: "Magahi", value: "mag" }, { label: "Thai", value: "th" },
  { label: "Xhosa", value: "xh" }, { label: "Burmese", value: "my" }, { label: "Kurdish", value: "ku" },
  { label: "Haitian Creole", value: "ht" }, { label: "Ilocano", value: "ilo" }, { label: "Quechua", value: "qu" },
  { label: "Shona", value: "sn" }, { label: "Sinhalese", value: "si" }, { label: "Finnish", value: "fi" },
  { label: "Hebrew", value: "he" }, { label: "Slovak", value: "sk" }, { label: "Danish", value: "da" },
  { label: "Norwegian", value: "no" }, { label: "Bulgarian", value: "bg" }, { label: "Catalan", value: "ca" },
  { label: "Croatian", value: "hr" }, { label: "Lithuanian", value: "lt" }, { label: "Latvian", value: "lv" },
  { label: "Slovenian", value: "sl" }, { label: "Estonian", value: "et" }, { label: "Galician", value: "gl" },
  { label: "Basque", value: "eu" }, { label: "Irish", value: "ga" }, { label: "Macedonian", value: "mk" },
  { label: "Albanian", value: "sq" }, { label: "Armenian", value: "hy" }, { label: "Georgian", value: "ka" },
  { label: "Mongolian", value: "mn" }, { label: "Kazakh", value: "kk" }, { label: "Lao", value: "lo" },
  { label: "Turkmen", value: "tk" }, { label: "Tajik", value: "tg" }, { label: "Kyrgyz", value: "ky" },
  { label: "Tatar", value: "tt" }, { label: "Uzbek", value: "uz" }, { label: "Pashto", value: "ps" }
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

const SubtitleList: React.FC<SubtitleListProps> = React.memo(({ items }) => {
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

  // Sử dụng useCallback cho hàm click subtitle (giảm render lại)
  const handleSubtitleClick = useCallback(async (item: SubtitleItem) => {
    const id = String(item.id);
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(id);

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
      const prompt = `
        Phân tích toàn diện ngữ pháp đoạn văn sau (hiện ở định dạng bảng, kèm giải thích rõ ràng từng cấu trúc được phát hiện) từ ngôn ngữ '${subtitleLang}' sang tiếng '${nativeLang}':\n
        "${stripHtmlTags(item.text)}"
        Trả về kết quả rõ ràng, ngắn gọn (sử dụng tiếng ${LANGUAGES.find(l => l.value === nativeLang)?.label || "mẹ đẻ"}), bao gồm:
        - Dịch nghĩa đầy đủ nếu chưa cùng ngôn ngữ
        - Bảng phân tích từ loại, vai trò ngữ pháp, cấu trúc nổi bật.
        - Những điểm ngữ pháp đáng chú ý.
        Không nói lan man.
      `;
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
  }, [expandedId, apiKey, subtitleLang, nativeLang, analysis]);

  // Dùng useMemo để filter (tối ưu render)
  const filtered = useMemo(() => {
    return search.trim() === ""
      ? items
      : items.filter((item) =>
          stripHtmlTags(item.text).toLowerCase().includes(search.toLowerCase())
        );
  }, [search, items]);

  return (
    <div
      className="flex flex-col flex-1 min-h-0 w-full shadow-2xl rounded-2xl border-2 border-border animate-fade-in max-w-[750px] mx-auto"
      style={{
        background: bgColor,
        color: textColor,
        transition: "background 0.2s, color 0.2s",
        height: "100%",
        minHeight: 0,
        maxHeight: "100%",
        boxSizing: 'border-box'
      }}
    >
      <div className="px-2 sm:px-4 pt-7 flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="flex flex-row items-center gap-2 mb-1 sm:mb-0 flex-1 min-w-0">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Cài đặt hiển thị subtitle"
                className="mr-1 flex-shrink-0"
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
            <PopoverContent
              side="right"
              align="start"
              sideOffset={16}
              className="p-5 sm:p-6 rounded-xl border-2 shadow-2xl z-40"
              style={{
                width: "95vw",
                maxWidth: 500,
                minWidth: 220,
                height: "auto",
                minHeight: 240,
                maxHeight: "90vh",
                overflowY: "auto",
                left: 0,
                right: 0,
                margin: "0 auto",
              }}
            >
              <div className="sm:hidden text-center font-medium mb-2">Cài đặt hiển thị & ngôn ngữ</div>
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
                {/* Reorder fields here for better usability */}
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
                <div className="mb-3">
                  <div className="text-xs mb-1">Ngôn ngữ mẹ đẻ của bạn:</div>
                  <select
                    value={nativeLang}
                    onChange={e => setNativeLang(e.target.value)}
                    className="rounded border px-2 py-1 text-sm bg-background w-full"
                  >
                    {LANGUAGES.map(lang =>
                      <option value={lang.value} key={lang.value + "_native"}>{lang.label}</option>
                    )}
                  </select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <h2
            className="text-xl sm:text-2xl font-bold flex-1 truncate flex items-center"
            style={{ color: textColor }}
          >
            Danh sách Subtitles ({filtered.length})

            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className="ml-2 cursor-pointer transition hover:scale-110"
                  title="Về trang chủ"
                  onClick={() => window.location.assign('/')}
                  tabIndex={0}
                  style={{
                    color: "red",
                    fontSize: "1.18em",
                    userSelect: "none",
                    outline: "none"
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      window.location.assign('/');
                    }
                  }}
                  role="button"
                  aria-label="Về trang chủ"
                >
                  🔄
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" align="center">
                Về trang chủ
              </TooltipContent>
            </Tooltip>
          </h2>
        </div>
        <input
          type="text"
          placeholder="Tìm kiếm nội dung..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="rounded-md border px-3 py-2 bg-accent focus:outline-primary transition w-full sm:w-56 text-base flex-shrink-0 sm:flex-shrink"
          style={{ color: textColor, background: "#fafbfc" }}
        />
      </div>
      <div
        className="overflow-y-auto px-2 sm:px-4 pb-4 mt-2 flex flex-col gap-2 flex-1 min-h-0"
        style={{
          fontSize,
          fontFamily,
          color: textColor,
          flex: 1,
          minHeight: 0,
          maxHeight: "100%",
        }}
      >
        {filtered.length === 0 ? (
          <div className="text-center text-muted-foreground py-6 text-base">Không tìm thấy subtitle nào.</div>
        ) : (
          filtered.map((item) => {
            const id = String(item.id);
            const isExpanded = expandedId === id;
            const analysisResult = analysis[id];
            const isAnalyzed = analysisResult?.status === "success";
            return (
              <div
                key={id}
                className="group"
              >
                <div
                  className={`bg-accent/60 rounded-lg py-3 px-4 text-base sm:text-lg font-mono whitespace-pre-line transition border hover:border-primary/40 cursor-pointer select-text`}
                  style={{
                    wordBreak: "break-word",
                    fontSize,
                    fontFamily,
                    background: "inherit",
                    color: "inherit",
                    borderColor: isAnalyzed ? "#FFD600" : undefined,
                    borderWidth: isAnalyzed ? "2px" : undefined,
                  }}
                  onClick={() => handleSubtitleClick(item)}
                  tabIndex={0}
                  aria-expanded={isExpanded}
                >
                  {stripHtmlTags(item.text)}
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
});

export default SubtitleList;
