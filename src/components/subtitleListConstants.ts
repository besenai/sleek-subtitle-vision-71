/** Các hằng số và hàm dùng cho SubtitleList, SubtitleSettingsPopover, SubtitleItemCard */

export const presetThemes = [
  { bg: "#f6f8fc", text: "#202020", name: "Trắng xanh (Mặc định)" },
  { bg: "#000000", text: "#ffffff", name: "Đen" },
  { bg: "#fffbe6", text: "#444444", name: "Vàng nhạt" },
  { bg: "#27282e", text: "#fafbfc", name: "Tối nhẹ" },
  { bg: "#ecfdf5", text: "#065f46", name: "Xanh mint" },
  { bg: "#22223b", text: "#f2e9e4", name: "Xanh đậm - Trắng" },
  { bg: "#f8ffe5", text: "#455e2d", name: "Xanh lá nhạt" },
  { bg: "#ffebee", text: "#b71c1c", name: "Đỏ nhạt" },
];

export const fontFamilies = [
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
export const LANGUAGES: { label: string; value: string }[] = [
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

export function stripHtmlTags(input: string): string {
  return input.replace(/<[^>]*>/g, "");
}
