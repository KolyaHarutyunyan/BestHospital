import { makeStyles } from "@material-ui/core";
import { Colors, Images } from "@eachbase/utils";

export const billDetailsStyle = makeStyles(() => ({
   billDetailsContainerStyle: {
      width: "100%",
      backgroundColor: Colors.BackgroundWhite,
      borderRadius: "8px",
      boxShadow: "0px 0px 6px #347AF033",
      padding: "24px",
   },
   billStatusesBoxStyle: {
      width: "100%",
      display: "flex",
      marginBottom: "24px",
      "& .statusSelectForBill": {
         marginRight: "24px",
         "& li:hover": { backgroundColor: "#EBF2FD !important" },
         "& h6::before, & li::before": { content: "unset" },
      },
   },
   billDetailsFirstPartStyle: {
      width: "100%",
      backgroundColor: Colors.BackgroundWhite,
      borderRadius: "8px",
      boxShadow: "0px 0px 6px #8A8A8A3D",
      padding: "16px",
   },
   billOutlineStyle: {
      display: "flex",
      alignItems: "center",
      marginBottom: "8px",
   },
   billIdIconBoxStyle: {
      width: "36px",
      height: "36px",
      padding: "1px",
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: `1px solid ${Colors.BackgroundBlue}`,
      backgroundColor: Colors.BackgroundWhite,
      marginRight: "8px",
      "& > div": {
         width: "100%",
         height: "100%",
         borderRadius: "inherit",
         backgroundColor: Colors.BackgroundBlue,
         display: "flex",
         justifyContent: "center",
         alignItems: "center",
         "& > img": {
            width: "24px",
            height: "24px",
         },
      },
   },
   billIdTextBoxStyle: {
      fontSize: "16px",
      fontWeight: 600,
      color: Colors.TextSecondary,
   },
   billDetailsListStyle: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      "& li": {
         maxWidth: "505px",
         width: "100%",
         padding: "9px 16px",
         backgroundColor: Colors.BackgroundCatskillWhite,
         borderRadius: "8px",
         marginTop: "8px",
         "& > span": {
            fontSize: "14px",
            fontWeight: 600,
            color: Colors.TextSecondary,
            "& em": {
               fontSize: "inherit",
               fontWeight: 500,
               color: Colors.TextMiddleGray,
               marginLeft: "8px",
            },
         },
      },
   },
   billDetailsSecondPartStyle: { width: "100%" },
   billDetailsTitleBoxStyle: {
      width: "100%",
      height: "24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "32px 0 16px",
   },
   billDetailsTitleStyle: {
      fontSize: "18px",
      fontWeight: 700,
      color: Colors.TextSecondary,
      textTransform: "capitalize",
   },
   addTransactionButnStyle: {
      backgroundColor: "inherit",
      fontSize: "14px",
      fontWeight: 600,
      color: Colors.TextSecondary,
      textTransform: "capitalize",
      padding: 0,
      "&:hover": { backgroundColor: "inherit" },
      "&::before": {
         content: "''",
         width: "24px",
         height: "24px",
         backgroundImage: `url(${Images.addOrange})`,
         backgroundSize: "contain",
         backgroundRepeat: "no-repeat",
         backgroundPosition: "center",
         marginRight: "6px",
      },
   },
   billTransactionsTableBoxStyle: { width: "100%" },
   paginationBoxStyle: {
      width: "100%",
      marginTop: "16px",
      display: "flex",
      justifyContent: "flex-end",
   },
   billDetailsThirdPartStyle: {},
}));
