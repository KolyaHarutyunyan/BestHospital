import { Button } from "@material-ui/core";
import { buttonsStyle } from "./styles";
import {Images} from "@eachbase/utils";

export const AddButton = ({disabled, styles, text, handleClick }) => {
  const classes = buttonsStyle();
  return (

    <Button
        disabled={disabled}
        style={{background: !disabled ? `#347AF0` : 'rgba(52,122,240,.5)',...styles}}
        className={classes.addButtonStyle}
        onClick={handleClick}
        // styles={}
    >
      <img src={Images.addCircle} alt={'icon'}/>
      {text}
    </Button>
  );
};
