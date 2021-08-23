import { Button } from "@material-ui/core";
import { buttonsStyle } from "./styles";
import {Images} from "@eachbase/utils";

export const AddButton = ({disabled, styles, text, handleClick }) => {
  const classes = buttonsStyle();
  return (

    <Button
        disabled={disabled}
        style={{...styles}}
        className={classes.addButtonStyle}
        onClick={handleClick}>
      <img src={Images.addCircle} alt={'icon'}/>
      {text}
    </Button>
  );
};
