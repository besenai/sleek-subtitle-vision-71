
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { SubtitleItem } from "@/lib/srtParser";
import SubtitleSettingsPopover from "./SubtitleSettingsPopover";
import SubtitleItemCard from "./SubtitleItemCard";
import { presetThemes, fontFamilies, LANGUAGES, stripHtmlTags } from "./subtitleListConstants";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LOCAL_KEY = "subtitle_settings";
type AnalysisResult = {
  status: "idle" | "loading" | "error" | "success";
  message?: string;
  data?: string;
};
type LocalSettings = {
  apiKey?: string;
  subtitleLang?: string;
  nativeLang?: string;
};

interface SubtitleListProps {
  items: SubtitleItem[];
}

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
  const navigate = useNavigate();

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
          <SubtitleSettingsPopover
            bgColor={bgColor}
            setBgColor={setBgColor}
            textColor={textColor}
            setTextColor={setTextColor}
            fontSize={fontSize}
            setFontSize={setFontSize}
            fontFamily={fontFamily}
            setFontFamily={setFontFamily}
            apiKey={apiKey}
            setApiKey={setApiKey}
            subtitleLang={subtitleLang}
            setSubtitleLang={setSubtitleLang}
            nativeLang={nativeLang}
            setNativeLang={setNativeLang}
          />
          <h2
            className="text-xl sm:text-2xl font-bold flex-1 truncate flex items-center gap-1"
            style={{ color: textColor }}
          >
            Danh sách Subtitles ({filtered.length})
            <button
              type="button"
              onClick={() => navigate("/")}
              className="ml-2 transition hover:scale-110"
              title="Về trang chủ"
              aria-label="Về trang chủ"
              style={{ color: "red", background: "none", border: "none", cursor: "pointer", fontSize: "1.4em", lineHeight: "1" }}
              tabIndex={0}
            >↻</button>
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
              <SubtitleItemCard
                key={id}
                item={item}
                id={id}
                isExpanded={isExpanded}
                analysisResult={analysisResult}
                isAnalyzed={isAnalyzed}
                fontSize={fontSize}
                fontFamily={fontFamily}
                onClick={() => handleSubtitleClick(item)}
              />
            );
          })
        )}
      </div>
    </div>
  );
});

export default SubtitleList;
