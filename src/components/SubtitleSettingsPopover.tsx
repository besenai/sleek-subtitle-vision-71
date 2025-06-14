
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { LANGUAGES, fontFamilies, presetThemes } from "./subtitleListConstants";

interface SubtitleSettingsPopoverProps {
  bgColor: string;
  setBgColor: (bg: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
  apiKey: string;
  setApiKey: (k: string) => void;
  subtitleLang: string;
  setSubtitleLang: (l: string) => void;
  nativeLang: string;
  setNativeLang: (l: string) => void;
}

const SubtitleSettingsPopover: React.FC<SubtitleSettingsPopoverProps> = ({
  bgColor,
  setBgColor,
  textColor,
  setTextColor,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
  apiKey,
  setApiKey,
  subtitleLang,
  setSubtitleLang,
  nativeLang,
  setNativeLang,
}) => (
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
            <Button size="sm" variant="outline" aria-label="Giảm" onClick={() => setFontSize((f: number) => Math.max(12, f - 2))}>-</Button>
            <span className="text-sm px-2">{fontSize}px</span>
            <Button size="sm" variant="outline" aria-label="Tăng" onClick={() => setFontSize((f: number) => Math.min(40, f + 2))}>+</Button>
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
);

export default SubtitleSettingsPopover;
