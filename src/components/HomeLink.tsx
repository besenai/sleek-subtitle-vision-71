
import React from "react";
import { ArrowLeft } from "lucide-react";

const HomeLink = () => (
  <a
    href="/"
    className="flex items-center gap-1 text-primary hover:underline font-medium mr-3 text-base sm:text-lg"
    aria-label="Về trang chủ"
  >
    <ArrowLeft size={20} className="inline-block -ml-1" />
    <span>Về trang chủ</span>
  </a>
);

export default HomeLink;
