export interface FormatOption {
  format: "short" | "long";
}

export const formatDate = (date: Date, { format }: FormatOption) => {
  const options: Intl.DateTimeFormatOptions =
    format === "short"
      ? {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }
      : {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        };

  return date.toLocaleString("th-TH", options);
};
