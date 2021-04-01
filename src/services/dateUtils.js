export const formatDate = (date) => {
  const [, month, day] = date.split("-");
  return day + "/" + month;
};

export const getDate = (dateStr) => (dateStr ? new Date(dateStr) : undefined);

export const getDateStr = (date) =>
  date ? date.toISOString().split("T")[0] : null;

export const formatDateFromStr = (str) => formatDate(str.split("T")[0]);

export const sortByLastedView = (boards) => {
  boards.sort((b1, b2) => new Date(b2.lastedView) - new Date(b1.lastedView));
};
