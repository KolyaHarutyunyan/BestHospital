import { makeStyles } from "@material-ui/core/styles";

export const staffStyle = makeStyles(() => ({
   staffSingleItem: {
      width: "100%",
      height: "calc(100vh - 186px)",
      backgroundColor: "white",
      padding: "20px",
      borderRadius: 8,
      "@media (max-width: 1280px)": {
         maxWidth: "1190px",
         "&.narrow": { maxWidth: "1000px" },
      },
   },
}));
