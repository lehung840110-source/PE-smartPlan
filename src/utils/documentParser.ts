import { LessonRow } from '../types/gdtc';

export interface ParsedLessonFileResult {
  title?: string;
  topic?: string;
  week?: number;
  grade?: 1 | 3 | 5;
  lessonNum?: number;
  rows: LessonRow[];
  teacherName?: string;
  schoolName?: string;
  dateRange?: string;
}

export function parseLessonText(rawText: string): ParsedLessonFileResult {
  const result: ParsedLessonFileResult = {
    rows: []
  };

  const lines = rawText.split('\n').map((l) => l.trim()).filter(Boolean);

  // Extract metadata
  for (const line of lines) {
    if (/tuần\s*(\d+)/i.test(line)) {
      const m = line.match(/tuần\s*(\d+)/i);
      if (m) result.week = parseInt(m[1], 10);
    }
    if (/lớp\s*([135])/i.test(line) || /khối\s*([135])/i.test(line)) {
      const m = line.match(/(?:lớp|khối)\s*([135])/i);
      if (m) result.grade = parseInt(m[1], 10) as 1 | 3 | 5;
    }
    if (/tiết\s*(\d+)/i.test(line)) {
      const m = line.match(/tiết\s*(\d+)/i);
      if (m) result.lessonNum = parseInt(m[1], 10);
    }
    if (/chủ đề\s*[:\-]?\s*([^\n]+)/i.test(line)) {
      const m = line.match(/chủ đề\s*[:\-]?\s*([^\n]+)/i);
      if (m) result.topic = m[1].trim();
    }
    if (/bài\s*\d+\s*[:\-]?\s*([^\n]+)/i.test(line)) {
      result.title = line.trim();
    }
  }

  return result;
}
