import { makeStyles } from "@material-ui/core/styles";
import {Backgrounds, Colors, Shadow} from "@eachbase/utils";

export const managementFragments = makeStyles(() => ({
  managementFragmentsStyle: {
    width: "100%",
    display: "flex",
    marginTop: "24px"
  },
  managementFragmentsRole: {
    width: "45%",
    marginRight: "16px",
  },

  paginate:{
    marginTop:'20px'
  },
  managementFragmentsPermissions: {
    width: "55%",
  },

  tableStyle: {
    height: "600px",
    width: "100%",
  },
tableStyleRole: {
    width: "100%",
    background: Backgrounds.whiteModal,
  },

  tableHeadStyle: {
    background: Backgrounds.headerLightBlue,
    borderRadius: "8px",
    padding: "16px 32px 16px 32px",
    border:'none',
    height:'51px',

  },

  tableHeadRoleStyle: {
    background: Backgrounds.headerLightBlue,
    borderRadius: "8px",
    padding: "8px 32px 8px 32px",
    border:'none',
    height:'51px',

  },

  tableBodyStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "50px",
    padding: "8px 10px 8px 16px",

    "@media (min-width: 1920px)": {
      padding: "16px 26px 16px 32px"
    },

    "& div:first-of-type": {
      display: "flex",
      alignItems: "center"
    },

    "& img": {
      width: "24px",
      height: "24px",
      marginRight: "4px",
      "@media (min-width: 1920px)": {
        marginRight: "8px"
      }
    },
    "& p": {
      fontSIze: "14px",
      lineHeight: "22px",
      fontWeight: "600",
      color: Colors.TextSecondary
    },

    "& span": {
       marginLeft:'40px',
       fontSize:'12px',
      color: Colors.TextPrimary,
    }
  },

  tableBodyBottom: {
    borderRadius:'8px',
    marginTop:'4px',
    background:Backgrounds.whiteModal,
    boxShadow:Shadow.changeShadow,
    cursor:'pointer',
    "& :hover": {
      background: Backgrounds.grayHover,
    },
  },
  tableBodyBottomActive: {
    borderRadius:'8px',
    marginTop:'4px',
    boxShadow:Shadow.changeShadow,
    border:'1px solid #A3B2BD80',
    background: Backgrounds.grayHover,
    cursor:'pointer',
    "& :hover": {}
  },

  rolePermissionsStyle: {
    // marginTop: "8px",
    display: "flex",
    alignItems: "center",
    "& p": {
      fontSize: "18px",
      // lineHeight: "24px",
      fontWeight: "bold",
      color: Colors.TextSecondary,
      textTransform: "uppercase",
      marginLeft: "8px",
      "@media (min-width: 1920px)": {
        marginLeft: "16px"
      }
    }
  },

  tablePermissionsBodyStyle: {
    padding: "0 16px 16px 16px",
    "@media (min-width: 1920px)": {
      padding: "0 32px 32px 32px"
    }
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
      textTransform: "uppercase"
    },
    padding: "25px 16px 25px 16px",
    "@media (min-width: 1920px)": {
      padding: "33px 32px 25px 32px"
    }
  },
  rolePermissionStyle:{
    background: Backgrounds.whiteModal,
    height:'630px',
    borderRadius:'8px',
    boxShadow:Shadow.changeShadow,
    marginTop:'8px',
  },
  tablePermissionsBodyContentStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "50px",
    background: Backgrounds.lightBlue,
    padding: "8px 16px 8px 16px",
    marginBottom: "8px",
    border:'none',

    "@media (min-width: 1920px)": {
      padding: "16px 32px 16px 32px"
    },

    "& div:first-of-type": {
      display: "flex",
      alignItems: "center"
    },

    "& img": {
      width: "18px",
      height: "18px"
    },
    "& p": {
      fontSize: "14px",
      lineHeight: "19px",
      color: Colors.TextPrimary,
      marginLeft: "8px"
    }
  },

  addRoleModalWrapper: {
    width: "500px",
    height: "auto",
    background: Backgrounds.whiteModal,
    borderRadius: "8px",
    padding:'8px 0 40px 0',

    "@media (min-width: 1920px)": {
      width: "580px",
    }


  },

  addRoleModalWrapperClose:{
    display:"flex",
    justifyContent:"flex-end",
  },

  addRoleModalWrapperContent:{
    padding:'8px 32px 0 32px',

    "@media (min-width: 1920px)": {
      padding:'8px 40px 0 40px',
    }
  },

  input:{
    marginBottom:'6px',
  },

  inputDescription:{
    height:'70px',
    marginTop:'16px',
    '& .MuiOutlinedInput-notchedOutline':{
      borderColor:Colors.BackgroundBlue
    },
  },

  inputShrink:{
      '& .MuiOutlinedInput-root':{
        // height:'56px'
      },

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

  }

}));
