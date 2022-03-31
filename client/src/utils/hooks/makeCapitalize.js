export const makeCapitalize = (val = "") => {
   if (typeof val !== "string") return val;

   return val.includes("_")
      ? val
           .split("_")
           .map(
              (el) => el.slice(0, 1).toUpperCase() + el.slice(1).toLowerCase()
           )
           .join(" ")
      : val
           .split(" ")
           .map(
              (el) => el.slice(0, 1).toUpperCase() + el.slice(1).toLowerCase()
           )
           .join(" ");
};
