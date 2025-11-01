export function timeAgo(dateInput: string | Date): string {
  const now: Date = new Date();
  const pastDate: Date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  const diffInMs: number = now.getTime() - pastDate.getTime();
  const msInDay: number = 1000 * 60 * 60 * 24;
  const diffInDays: number = Math.floor(diffInMs / msInDay);

  return diffInDays === 0
    ? "Today"
    : diffInDays === 1
    ? "1 day ago"
    : `${diffInDays} days ago`;
}
