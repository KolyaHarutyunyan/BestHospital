import { Button } from "@material-ui/core";
import { Colors } from "@eachbase/utils";
import { MinLoader } from "../loader";

export const CreateChancel = ({
   create,
   chancel,
   onCreate,
   onClose,
   classes,
   buttonWidth,
   disabled,
   loader,
   butnClassName,
   createButnMargin,
}) => {
   return (
      <div
         className={classes}
         style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
         }}
      >
         <Button
            className={`${butnClassName} cancel`}
            style={{
               textTransform: "capitalize",
               width: buttonWidth,
               height: "48px",
               backgroundColor: Colors.BackgroundWater,
               borderRadius: "8px",
               fontSize: "16px",
               fontWeight: "600",
               color: Colors.TextPrimary,
            }}
            onClick={onClose}
         >
            {chancel}
         </Button>
         <Button
            className={`${butnClassName} create`}
            style={{
               textTransform: "capitalize",
               width: buttonWidth,
               height: "48px",
               backgroundColor: disabled ? "rgba(52,122,240,.5)" : Colors.BackgroundBlue,
               borderRadius: "8px",
               fontSize: "16px",
               fontWeight: "600",
               color: Colors.TextWhite,
               marginLeft: createButnMargin || "0px",
            }}
            onClick={onCreate}
            disabled={disabled}
         >
            {loader ? <MinLoader margin={"0"} color={Colors.TextWhite} /> : create}
         </Button>
      </div>
   );
};
