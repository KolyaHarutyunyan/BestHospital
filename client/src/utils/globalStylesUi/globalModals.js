import { makeStyles } from "@material-ui/core";
import {Backgrounds} from "./globalColors";

export const globalModals = makeStyles({
    smallModalWrapper:{
        width: "500px",
        height: "auto",
        background: Backgrounds.whiteModal,
        borderRadius: "8px",
        padding:'8px 0 40px 0',

        "@media (min-width: 1920px)": {
            width: "582px",
        }
    },

    smallModalClose:{
        display:"flex",
        justifyContent:"flex-end",
    },

    modalWrapperContent:{
        padding:'8px 32px 0 32px',

        "@media (min-width: 1920px)": {
            padding:'8px 40px 0 40px',
        }
    },

})