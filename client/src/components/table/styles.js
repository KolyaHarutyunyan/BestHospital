import { makeStyles } from "@material-ui/core/styles";
import { Backgrounds, Colors } from "@eachbase/utils";

export const tableStyle = makeStyles(() => ({
   tableHead: {
      boxShadow: "0px 3px 6px #347AF01A",
      borderRadius: "8px",
      height: 51,
      "& > tr": {
         borderRadius: "8px",
         "& > th:first-child": {
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "8px",
         },
         "& > th:last-child": {
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
         },
      },
      "& .MuiTableCell-stickyHeader": {
         background: Backgrounds.headerLightBlue,
      },
      "& .MuiTableCell-sizeSmall": {
         fontSize: "14px",
         fontWeight: "600",
         lineHeight: "19px",
         color: Colors.TextSecondary,
         padding: "8px 16px 8px 16px",
         border: "none",
         "@media (min-width: 1920px)": {
            padding: "12px 24px 12px 24px",
         },
      },
   },
   tableRow: {
      boxShadow: "0px 3px 6px #347AF01A",
      cursor: "pointer",
      borderRadius: "8px",
      backgroundColor: Colors.BackgroundWhite,
      "&.billingSystem:hover": {
         backgroundColor: Colors.BackgroundWhite,
         "& > td": { backgroundColor: Colors.BackgroundWhite },
      },
      "& td": { backgroundColor: Colors.BackgroundWhite },
      "& > td:first-child": {
         borderTopLeftRadius: "8px",
         borderBottomLeftRadius: "8px",
      },
      "& > td:last-child": {
         borderTopRightRadius: "8px",
         borderBottomRightRadius: "8px",
      },
      "&:hover": {
         backgroundColor: "#EBF2FD80",
         "& > td": { backgroundColor: "#EBF2FD80" },
      },
      height: "50px",
      "& .makeStyles-membersTableWrapper-26 .MuiTableContainer-root": {
         background: "#FFFFFF 0% 0% no-repeat padding-box",
         boxShadow: "0px 8px 12px #0052E01A",
      },
      "& .MuiTableCell-sizeSmall": {
         fontSize: "14px",
         lineHeight: "22px",
         color: Colors.TextPrimary,
         border: "none",

         padding: "8px 16px 8px 16px",
         "@media (min-width: 1920px)": {
            padding: "12px 32px 12px 32px",
         },
      },

      "& .MuiTableCell-sizeSmall:last-child": {
         paddingTop: "12px",
         fontSize: "16px",
         lineHeight: "30px",
         color: "#545F7E",
      },

      "& MuiSwitch-track": {
         borderRadius: "12px",
         background: "lightgray",
      },

      "& .MuiSwitch-colorPrimary.Mui-checked": {
         color: "white",
      },

      "& .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track": {
         background: "#387DFF",
         borderRadius: "12px",
         opacity: "1",
      },
   },
}));
