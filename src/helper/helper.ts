export const phoneFormater = (phone: string): string => {
  return phone.replace(/(\d{3})(\d{2})(\d{3})/, "$1 $2 $3");
};

export const dateFormater = (date: string): string => {
  const d = new Date(date);
  return `${d.getDate()} ${d.toLocaleString("default", { month: "long" })} ${d.getFullYear()}`;
};
