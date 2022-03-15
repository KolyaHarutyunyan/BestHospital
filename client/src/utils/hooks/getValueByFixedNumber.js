export const getValueByFixedNumber = (value = 0, number = 2) =>
   typeof value === "number" ? value.toFixed(number) : value;
