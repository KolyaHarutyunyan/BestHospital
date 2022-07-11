import { makeStyles } from "@material-ui/core/styles";
import { Backgrounds, Colors } from "@eachbase/utils";

export const managementFragments = makeStyles(() => ({
   managementFragmentsStyle: {
      width: "100%",
      display: "flex",
      marginTop: "24px",
   },

   managementFragmentsRole: {
      width: "45%",
      marginRight: "16px",
   },

   managementFragmentsPermissions: {
      width: "55%",
   },

   tableStyle: {
      height: "calc(80vh - 95px)",
      width: "100%",
   },

   tableRoleStyle: {
      height: "100%",
      width: "99%",
      margin: "4px 4px 0 4px",
      background: Backgrounds.whiteModal,
      boxShadow: "0px 0px 6px #8A8A8A3D",
      borderRadius: "8px",
   },

   tableHeadStyle: {
      height: "51px",
      background: "#EBF2FD 0% 0% no-repeat padding-box",
      boxShadow: "0px 2px 6px #347AF033",
      borderRadius: "8px",
      padding: "8px 16px 8px 16px",
      margin: "0 4px 4px 4px",
      "@media (min-width: 1920px)": {
         padding: "16px 32px 16px 32px",
      },
   },

   tableRoleHeadStyle: {
      height: "51px",
      background: "#EBF2FD 0% 0% no-repeat padding-box",
      boxShadow: "0px 2px 6px #347AF033",
      borderRadius: "8px",
      padding: "8px 16px 8px 16px",
      margin: "0 4px 4px 4px",
      "@media (min-width: 1920px)": {
         padding: "8px 32px 8px 32px",
      },
   },

   tableBodyStyle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "50px",
      padding: "8px 10px 8px 16px",

      "@media (min-width: 1920px)": {
         padding: "16px 26px 16px 32px",
      },

      "& div:first-of-type": {
         display: "flex",
         alignItems: "center",
      },

      "& img": {
         width: "24px",
         height: "24px",
         marginRight: "4px",
         "@media (min-width: 1920px)": {
            marginRight: "8px",
         },
      },
      "& p": {
         fontSIze: "14px",
         lineHeight: "22px",
         fontWeight: "600",
         color: Colors.TextSecondary,
      },

      "& span": {
         marginLeft: "40px",
         fontSize: "12px",
         color: Colors.TextPrimary,
      },
   },

   tableBodyBottom: {
      cursor: "pointer",
      background: Backgrounds.whiteModal,
      borderRadius: "8px",
      boxShadow: "0px 0px 6px #8A8A8A3D",
      "& :hover": {
         background: "#EBF2FD80 0% 0% no-repeat padding-box",
      },
   },

   tableBodyBottomActive: {
      boxShadow: "0px 0px 6px #8A8A8A3D",
      background: "#EBF2FD80 0% 0% no-repeat padding-box",
      borderRadius: "8px",
      cursor: "pointer",
   },

   rolePermissionsStyle: {
      display: "flex",
      alignItems: "center",
      "& p": {
         fontSize: "14px",
         lineHeight: "19px",
         fontWeight: "bold",
         color: Colors.BackgroundBlue,
         textTransform: "uppercase",
         marginLeft: "8px",
         "@media (min-width: 1920px)": {
            marginLeft: "16px",
         },
      },
   },

   permissionIcon: {
      height: "40px",
      width: "40px",
      background: Colors.ThemeMangoOrange,
      borderRadius: "24px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& img": {
         border: "1px solid white",
         borderRadius: "24px",
         padding: "4px",
      },
   },

   tablePermissionsBodyStyle: {
      padding: "0 32px 32px",
      "@media (max-width: 1280px)": { padding: "0 16px 16px" },
   },

   roleNameStyle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& span": {
         fontSize: "16px",
         lineHeight: "22px",
         fontWeight: "bold",
         color: Colors.TextSecondary,
         textTransform: "uppercase",
      },

      padding: "33px 32px 25px 32px",
      "@media (max-width: 1280px)": {
         padding: "25px 16px",
      },
   },

   tablePermissionsBodyContentStyle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "50px",
      background: "#EBF2FD 0% 0% no-repeat padding-box",
      padding: "8px 16px 8px 16px",
      marginBottom: "8px",

      "@media (min-width: 1920px)": {
         padding: "16px 32px 16px 32px",
      },

      "& div:first-of-type": {
         display: "flex",
         alignItems: "center",
      },

      "& img": {
         width: "18px",
         height: "18px",
      },
      "& p": {
         fontSize: "14px",
         lineHeight: "19px",
         color: Colors.TextPrimary,
         marginLeft: "8px",
      },
   },

   addRoleModalWrapper: {
      width: "500px",
      height: "auto",
      background: Backgrounds.whiteModal,
      borderRadius: "8px",
      padding: "8px 0 40px 0",

      "@media (min-width: 1920px)": {
         width: "580px",
      },
   },

   addRoleModalWrapperClose: {
      display: "flex",
      justifyContent: "flex-end",
   },

   addRoleModalWrapperContent: {
      padding: "8px 32px 0 32px",

      "@media (min-width: 1920px)": {
         padding: "8px 40px 0 40px",
      },
   },

   input: {
      "& label": {
         color: "#4B5C6880 !important",
      },
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

   scroll: {
      height: "calc(80vh - 90px)",
      overflow: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
   },

   scrollPermission: {
      height: "100%",
      overflow: "auto",
   },

   noItemPaddings: {
      padding: "25px 16px 25px 16px",
      "@media (min-width: 1920px)": {
         padding: "33px 32px 25px 32px",
      },
   },
}));
