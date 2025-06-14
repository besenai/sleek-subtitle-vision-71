
import React from "react";
import { stripHtmlTags, LANGUAGES } from "./subtitleListConstants";
import { SubtitleItem } from "@/lib/srtParser";

type AnalysisResult = {
  status: "idle" | "loading" | "error" | "success";
  message?: string;
  data?: string;
};

export interface SubtitleItemCardProps {
  item: SubtitleItem;
  id: string;
  isExpanded: boolean;
  analysisResult?: AnalysisResult;
  isAnalyzed: boolean;
  fontSize: number;
  fontFamily: string;
  onClick: () => void;
}

const SubtitleItemCard: React.FC<SubtitleItemCardProps> = ({
  item, id, isExpanded, analysisResult, isAnalyzed,
  fontSize, fontFamily, onClick
}) => (
  <div key={id} className="group">
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
      onClick={onClick}
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

export default SubtitleItemCard;
