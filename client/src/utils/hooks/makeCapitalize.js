export const makeCapitalize = (value = "") => {
   if (typeof value !== "string") return value;

   return value.includes("_")
      ? value
           .split("_")
           .map(
              (el) => el.slice(0, 1).toUpperCase() + el.slice(1).toLowerCase()
           )
           .join(" ")
      : value
           .split(" ")
           .map(
              (el) => el.slice(0, 1).toUpperCase() + el.slice(1).toLowerCase()
           )
           .join(" ");
};
