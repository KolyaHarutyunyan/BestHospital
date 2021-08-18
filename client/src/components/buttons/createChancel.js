import {Button} from "@material-ui/core";
import {Colors} from "@eachbase/utils";


export const CreateChancel = ({
                                  create,
                                  chancel,
                                  onCreate,
                                  onClose,
                                  classes,
                                  buttonWidth,
                                  disabled
                              }) => {


    return (
        <div className={classes}
             style={{
                 display: 'flex',
                 justifyContent: 'space-between',
                 alignItems: 'center',
                 width: '100%',

             }}>
            <Button
                style={{
                    textTransform: "capitalize",
                    width: buttonWidth,
                    height: "48px",
                    background: Colors.ThemeGray,
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
                style={{
                    textTransform: "capitalize",
                    width: buttonWidth,
                    height: "48px",
                    background: disabled ? 'rgba(52,122,240,.5)' :  Colors.BackgroundBlue,
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: Colors.TextWhite,
                }}

                onClick={onCreate}
                disabled={disabled}
            >
                {create}
            </Button>
        </div>
    );
};
