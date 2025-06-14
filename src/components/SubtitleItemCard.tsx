
import React from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { SubtitleItem } from "@/lib/srtParser";

// Hàm loại bỏ HTML tag
function stripHtmlTags(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}

type AnalysisResult = {
  status: "idle" | "loading" | "error" | "success";
  message?: string;
  data?: string;
};

interface SubtitleItemCardProps {
  item: SubtitleItem;
  id: string;
  isExpanded: boolean;
  isAnalyzed: boolean;
  analysisResult: AnalysisResult | undefined;
  fontSize: number;
  fontFamily: string;
  textColor: string;
  onSubtitleClick: (item: SubtitleItem) => void;
}

const SubtitleItemCard: React.FC<SubtitleItemCardProps> = ({
  item,
  id,
  isExpanded,
  isAnalyzed,
  analysisResult,
  fontSize,
  fontFamily,
  textColor,
  onSubtitleClick,
}) => (
  <div className="group">
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
      onClick={() => onSubtitleClick(item)}
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
