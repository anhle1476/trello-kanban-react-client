export const formatDate = (date) => {
  const [, month, day] = date.split("-");
  return month + "/" + day;
};

export const getDate = (dateStr) => (dateStr ? new Date(dateStr) : undefined);

export const getDateStr = (date) =>
  date ? date.toISOString().split("T")[0] : null;
