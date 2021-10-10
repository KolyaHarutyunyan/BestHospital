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
    width: "55%"
  },

  tableStyle: {
    height: "80vh",
    width: "100%",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 0px 6px #8A8A8A29",
    borderRadius: "8px",
  },

  tableHeadStyle: {
    background: "#E6ECF3 0% 0% no-repeat padding-box",
    borderRadius: "8px 8px 0px 0px",
    padding: "8px 16px 8px 16px",

    "@media (min-width: 1920px)": {
      padding: "16px 32px 16px 32px",
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
      marginLeft:'40px',
      fontSize:'12px',
      color: Colors.TextPrimary,
    },
  },


  tableBodyBottom: {
    borderBottom: `0.5px solid ${Colors.TextLight}`,
    cursor:'pointer',
    "& :hover": {
      background: Backgrounds.tableActiveDark,
    },
  },
  tableBodyBottomActive: {
    borderBottom: `0.5px solid ${Colors.TextLight}`,
    background: Backgrounds.tableActive,
    cursor:'pointer',
  },

  rolePermissionsStyle: {
    marginTop: "8px",
    display: "flex",
    alignItems: "center",
    "& p": {
      fontSize: "18px",
      lineHeight: "24px",
      fontWeight: "bold",
      color: Colors.TextSecondary,
      textTransform: "uppercase",
      marginLeft: "8px",
      "@media (min-width: 1920px)": {
        marginLeft: "16px",
      },
    },
  },

  tablePermissionsBodyStyle: {
    padding: "0 16px 16px 16px",
    "@media (min-width: 1920px)": {
      padding: "0 32px 32px 32px",
    },
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

    padding: "25px 16px 25px 16px",
    "@media (min-width: 1920px)": {
      padding: "33px 32px 25px 32px",
    },
  },

  tablePermissionsBodyContentStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "50px",
    background: "#E6ECF380 0% 0% no-repeat padding-box",
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
    padding:'8px 0 40px 0',

    "@media (min-width: 1920px)": {
      width: "580px",
    },
  },

  addRoleModalWrapperClose:{
    display:"flex",
    justifyContent:"flex-end",
  },

  addRoleModalWrapperContent:{
    padding:'8px 32px 0 32px',

    "@media (min-width: 1920px)": {
      padding:'8px 40px 0 40px',
    },
  },

  input:{
    '& .MuiOutlinedInput-root':{
      height:'56px',
    },
  },

  inputDescription:{
    height:'70px',
    marginTop:'16px',
    width:'100%',
    '& .MuiOutlinedInput-inputMultiline':{
      maxHeight:'60px',
    },
    '& .MuiFormLabel-root':{
      color:'rgba(0, 0, 0, 0.54)',
    },
    '& .MuiOutlinedInput-notchedOutline':{
      borderColor:Colors.ThemeBorder,
    },
    '& .MuiInputLabel-outlined':{
      marginTop:'-3px',
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      transform: 'translate(14px, -2px) scale(0.75)',
    },
    '& .MuiOutlinedInput-root':{
      height:'96px',
      minHeight:'96px',
    },
  },

  maxCharacter:{
    fontSize:'12px',
    color:Colors.TextPrimary,
    margin:'26px 16px 0 16px',
  },

  deleteModal:{
    width:'500px',
    height: "auto",
    background: Backgrounds.whiteModal,
    borderRadius: "8px",
    padding:'8px 0 40px 0',
    display:'flex',
    flexDirection:'column',
    textAlign:'center',
  },

  scroll:{
    height:"calc(80vh - 90px)",
    overflow:'auto',
  },

  noItemPaddings:{
    padding: "25px 16px 25px 16px",
    "@media (min-width: 1920px)": {
      padding: "33px 32px 25px 32px",
    },
  },

}));
