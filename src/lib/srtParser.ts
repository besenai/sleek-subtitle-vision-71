
export interface SubtitleItem {
  id: number;
  start: string;
  end: string;
  text: string;
}

function parseTime(str: string) {
  // SRT định dạng: 00:00:05,000
  return str.replace(',', '.');
}

export function parseSRT(srt: string): SubtitleItem[] {
  const entries = srt
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n\n')
    .filter(Boolean);

  const subs: SubtitleItem[] = [];

  for (const entry of entries) {
    const lines = entry.split('\n');
    if (lines.length >= 3) {
      const id = parseInt(lines[0]);
      const [start, end] = lines[1].split(' --> ').map(parseTime);
      const text = lines.slice(2).join('\n');
      if (!isNaN(id) && start && end && text) {
        subs.push({ id, start, end, text });
      }
    }
  }
  return subs;
}
