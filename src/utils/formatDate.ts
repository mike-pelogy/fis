export default function formatDate(date?: Date) {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return dateFormatter.format(date || new Date());
}
