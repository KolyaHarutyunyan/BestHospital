export const showDashIfEmpty = (value = "") => {
   if (value.toString().trim().length === 0) {
      return <div style={{ marginLeft: "5%" }}>{"---"}</div>;
   }

   return value;
};
