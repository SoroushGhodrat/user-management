export const phoneFormater = (phone: string): string => {
  return phone.replace(/(\d{3})(\d{2})(\d{3})/, "$1 $2 $3");
};

export const dateFormater = (date: string): string => {
  const d = new Date(date);
  return `${d.getDate()} ${d.toLocaleString("default", { month: "long" })} ${d.getFullYear()}`;
};

export const firstLetterUppercase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
