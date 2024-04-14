export const phoneFormater = (phone: string): string => {
  return phone.replace(/(\d{3})(\d{2})(\d{3})/, "$1 $2 $3");
};

export const dateFormater = (date: string): string => {
  const d = new Date(date);
  return `${d.getDate()} ${d.toLocaleString("default", { month: "long" })} ${d.getFullYear()}`;
};

export const emailValidator = (email: string): boolean => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const firstLetterUppercase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
