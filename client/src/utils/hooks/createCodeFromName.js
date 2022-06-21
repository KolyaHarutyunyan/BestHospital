export const createCodeFromName = (name) => {
   if (typeof name !== "string") return;
   return name
      .split(" ")
      .map((item) => item.substring(0, 2))
      .join("");
};
