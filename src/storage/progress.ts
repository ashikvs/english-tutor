const STORAGE_KEY = 'english-with-amrtha.progress.v1';

export function readCompletedDays(): number[] {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    return [...new Set(parsed.filter((day): day is number =>
      typeof day === 'number' && Number.isInteger(day) && day >= 1 && day <= 30,
    ))].sort((first, second) => first - second);
  } catch {
    return [];
  }
}

export function saveCompletedDays(days: number[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(days));
  } catch {
    // The in-memory progress still works if browser storage is unavailable.
  }
}
