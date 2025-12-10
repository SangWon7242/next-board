export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const year = String(date.getFullYear()).slice(2); // 25
  const month = String(date.getMonth() + 1); // 12
  const day = String(date.getDate()); // 1 ~ 30

  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const period = hours < 12 ? "오전" : "오후";
  const displayHours = hours % 12 || 12; // 0시는 12시로 표시

  return `${year}. ${month}. ${day}. ${period} ${displayHours}:${minutes}`;
}
