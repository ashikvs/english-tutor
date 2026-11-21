const STORAGE_KEY = 'english-with-amrtha.progress.v1';
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

export interface LearnerProgress {
  completedDays: number[];
  learningDates: string[];
}

function validDays(value: unknown): number[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((day): day is number =>
    typeof day === 'number' && Number.isInteger(day) && day >= 1 && day <= 30,
  ))].sort((first, second) => first - second);
}

function validDates(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter((date): date is string =>
    typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)
      && !Number.isNaN(Date.parse(`${date}T00:00:00Z`))
      && ordinalDate(dateOrdinal(date)) === date,
  ))].sort();
}

export function readProgress(): LearnerProgress {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return { completedDays: [], learningDates: [] };

    const parsed: unknown = JSON.parse(saved);
    // Accept the original array format so progress already saved by v1 is retained.
    if (Array.isArray(parsed)) return { completedDays: validDays(parsed), learningDates: [] };
    if (!parsed || typeof parsed !== 'object') return { completedDays: [], learningDates: [] };

    const data = parsed as Record<string, unknown>;
    return {
      completedDays: validDays(data.completedDays),
      learningDates: validDates(data.learningDates),
    };
  } catch {
    return { completedDays: [], learningDates: [] };
  }
}

export function saveProgress(progress: LearnerProgress): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // The in-memory progress still works if browser storage is unavailable.
  }
}

export function recordLessonCompletion(progress: LearnerProgress, day: number): LearnerProgress {
  const completedDays = validDays([...progress.completedDays, day]);
  const today = getLocalDate();
  const learningDates = validDates([...progress.learningDates, today]);
  return { completedDays, learningDates };
}

export function getCurrentStreak(learningDates: string[]): number {
  const learned = new Set(validDates(learningDates));
  const today = getLocalDate();
  const todayOrdinal = dateOrdinal(today);
  const start = learned.has(today) ? todayOrdinal : todayOrdinal - 1;
  if (!learned.has(ordinalDate(start))) return 0;

  let streak = 0;
  for (let ordinal = start; learned.has(ordinalDate(ordinal)); ordinal -= 1) streak += 1;
  return streak;
}

function getLocalDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function dateOrdinal(date: string): number {
  const [year, month, day] = date.split('-').map(Number);
  return Math.floor(Date.UTC(year, month - 1, day) / DAY_IN_MILLISECONDS);
}

function ordinalDate(ordinal: number): string {
  return new Date(ordinal * DAY_IN_MILLISECONDS).toISOString().slice(0, 10);
}
