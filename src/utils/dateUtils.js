export const formatDate = (date) => {
  const [, month, day] = date.split("-");
  return month + "/" + day;
};

export const getDate = (dateStr) => (dateStr ? new Date(dateStr) : undefined);
