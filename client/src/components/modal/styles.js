import { makeStyles } from "@material-ui/core/styles";
import { Shadow, Colors, Backgrounds } from "@eachbase/utils";

export const modalsStyle = makeStyles(() => ({
   datePickerStyle: {
      marginTop: 15,
   },
   title: {
      fontSize: 16,
      color: Colors.TextSecondary,
      fontWeight: 600,
      paddingBottom: 16,
   },
   checkboxWrapper: {
      padding: 16,
      boxShadow: `${Shadow.changeShadow}`,
      borderColor: 8,
      marginBottom: 16,
   },
   modalTitleMargin: {
      marginBottom: 25,
   },
   closeButton: {
      display: "flex",
      justifyContent: "flex-end",
   },

   buttons: {
      display: "flex",
   },

   deleteModalWrapper: {
      padding: "8px 40px 0 40px",
   },

   deleteInfo: {
      color: Colors.ThemeRed,
      fontSize: "18px",
   },
   inactiveModalBody: {
      width: "480px",
      padding: "40px",
      borderRadius: "8px",
      backgroundColor: "white",
      position: "relative",
      "@media (max-width: 1400px)": {
         width: "464px",
         padding: "32px",
      },
   },
   positionedButton: {
      position: "absolute",
      right: "8px",
      top: "8px",
   },
   inactiveModalInfo: {
      fontSize: "16px",
      color: Colors.TextSecondary,
      lineHeight: "24px",
      padding: "16px 0 24px",
   },
   credentialInputStyle: {
      marginBottom: 10,
   },
   deleteModal: {
      width: "500px",
      height: "auto",
      background: Backgrounds.whiteModal,
      borderRadius: "8px",
      padding: "8px 0 40px 0",
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
   },
   AddAvailabilityScheduelBlock: {
      margin: "40px 0",
   },
   AddAvailabilityScheduelBox: {
      width: "100%",
      boxShadow: "0px 0px 6px #347AF03D",
      borderRadius: " 8px",
      padding: "16px",
      display: "flex",
      marginTop: 16,
   },
   AddAvailabilityScheduelDayName: {
      color: "#347AF0",
      fontSize: 16,
      fontWeight: "bold",
      // marginRight : 16,
      width: 60,
   },

   iconsCursor: {
      cursor: "pointer",
   },
   AddHourseBox: {
      display: "flex",
      alignItems: "center",
   },
   AddHourseBoxText: {
      fontSize: 14,
      color: Colors.TextPrimary,
      marginLeft: 8,
      cursor: "pointer",
   },
   AddAvailabilityScheduelForm: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
   },
   inputTextFieldBlue: {
      width: 115,
      height: "36 !important",
      "& .MuiOutlinedInput-notchedOutline": {
         borderColor: Colors.ThemeBlue,
      },
      "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
         borderColor: Colors.ThemeWhiteBlue,
      },
      "& .MuiFormLabel-root.Mui-disabled": {
         color: `${Colors.ThemeWhiteBlue}!important`,
      },
      "& .MuiOutlinedInput-root": {
         height: "36px",
         // width:'50px'
      },
      "& .MuiInputLabel-outlined": {
         marginTop: "-3px",
      },
      "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
         transform: "translate(14px, -2px) scale(0.75)",
         color: Colors.ThemeBlue,
      },
   },
   removeBtn: {
      color: Colors.ThemeRed,
      fontSize: 14,
      margin: " 0 16px 14px 8px",
      cursor: "pointer",
   },
   removeTimeBtn: {
      color: Colors.ThemeRed,
      fontSize: 14,
      cursor: "pointer",
      margin: "0 8px",
   },
   notAvailable: {
      fontSize: 14,
      // marginLeft : 8,
      wordBreak: " keep-all",
      flex: "0 0 87px",
      marginBottom: 14,
   },
   line: {
      margin: "0 8px 15px 8px",
      color: Colors.ThemeBlue,
   },
   checkBox: {
      marginBottom: 14,
   },

   availableScheduleWrapper: {
      width: 634,
      backgroundColor: "white",
      padding: "40px 30px",
      borderRadius: 8,
      position: "relative",
   },
   availableScheduleTitle: {
      fontSize: 32,
      color: Colors.TextSecondary,
      fontWeight: "bold",
      lineHeight: "48px",
      marginBottom: 20,
   },
   closeBtn: {
      position: "absolute",
      right: 3,
      top: 11,
   },
   timeRow: {
      padding: "16px 24px",
      borderRadius: 8,
      boxShadow: Shadow.noteModalShadow,
      display: "flex",
      "&:not(:last-child)": {
         marginBottom: 16,
      },
   },
   scrollable: {
      maxHeight: 550,
      padding: "10px",
      overflow: "hidden",
      overflowY: "auto",
      msOverflowStyle: "none",
      scrollbarWidth: "none",
      "&::-webkit-scrollbar": {
         display: "none",
      },
   },
   dayName: {
      fontSize: 16,
      color: Colors.BackgroundBlue,
      lineHeight: "20px",
      textTransform: "uppercase",
      marginRight: 16,
      maxWidth: 40,
      width: "100%",
   },
   addTime: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      "& img": {},
      "& span": {
         fontSize: "14px",
         color: Colors.TextSecondary,
         lineHeight: "19px",
         marginLeft: 8,
      },
   },
   times: {
      display: "flex",
      alignItems: "center",
      marginBottom: 8,
   },
   moreHoursBtn: {
      fontSize: 14,
      color: Colors.BackgroundBlue,
      lineHeight: "20px",
      cursor: "pointer",
      marginTop: 8,
      display: "inline-block",
   },
   timeInputStyle: {
      border: `1px solid ${Colors.BackgroundBlue}`,
      borderRadius: 8,
      padding: "1px 5px",
      "& .MuiInputBase-root::before": {
         content: "revert!important",
      },
      "& .MuiInputBase-root::after": {
         content: "revert!important",
      },
      "& .Mui-disabled": {
         color: Colors.TextLightGray,
      },
   },
   smallLine: {
      margin: "0 5px",
      color: Colors.BackgroundBlue,
   },
   customCheckbox: {
      color: Colors.BackgroundBlue,
      padding: 0,
      "&.Mui-checked": {
         backgroundColor: "white",
         color: Colors.BackgroundBlue,
      },
      "& .MuiSvgIcon-root": {
         width: 24,
         height: 24,
      },
   },
   notAvailableText: {
      fontSize: 14,
      color: Colors.TextSecondary,
      lineHeight: "20px",
      textTransform: "capitalize",
      paddingLeft: 6,
   },
   infoModalWrapper: {
      width: "645px",
      padding: "32px",
      borderRadius: "8px",
      backgroundColor: "white",
      position: "relative",
   },
}));
