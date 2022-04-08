export const showDashIfEmpty = (value = "") => {
   if (value.toString().trim().length === 0) {
      return <div style={{ marginLeft: "25%" }}>{"---"}</div>;
   }

   return value;
};
