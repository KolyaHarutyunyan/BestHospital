import { Button } from "@material-ui/core";
import { buttonsStyle } from "./styles";
import {Colors, Images} from "@eachbase/utils";
import {MinLoader} from "../loader";

export const AddButton = ({loader,disabled, styles, text, handleClick }) => {
  const classes = buttonsStyle();
  return (

    <Button
        disabled={disabled}
        style={{background: !disabled ? `#347AF0` : 'rgba(52,122,240,.5)',...styles}}
        className={classes.addButtonStyle}
        onClick={handleClick}
        // styles={}
    >
      {
        loader !== true && <img src={Images.addCircle} alt={'icon'}/>
      }

      { loader === true ?
          <MinLoader margin={'0'} color={Colors.TextWhite}/>
          :
          text
      }
    </Button>
  );
};
