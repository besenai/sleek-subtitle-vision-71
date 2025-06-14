
import React from "react";

interface SidebarBannerProps {
  imgSrc?: string;
  link?: string;
  alt?: string;
  children?: React.ReactNode;
}

const SidebarBanner: React.FC<SidebarBannerProps> = ({
  imgSrc,
  link,
  alt,
  children,
}) => {
  // Banner placeholder nếu không có hình
  const content = imgSrc ? (
    <img
      src={imgSrc}
      className="w-full h-auto max-h-52 rounded-xl object-cover border"
      alt={alt || "Banner quảng cáo"}
      style={{ aspectRatio: "16/9" }} // Hình 16:9
    />
  ) : (
    <div className="flex items-center justify-center w-full h-40 bg-accent rounded-xl border border-dashed text-muted-foreground font-semibold text-lg select-none">
      {children ?? "Quảng cáo"}
    </div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
};

export default SidebarBanner;
