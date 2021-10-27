import { Button } from "@material-ui/core";
import { buttonsStyle } from "./styles";
import {Colors, Images} from "@eachbase/utils";
import {MinLoader} from "../loader";
import {useSelector} from "react-redux";

export const AddButton = ({loader,disabled, styles, text, handleClick,type, Icon }) => {
  const classes = buttonsStyle();

  const {httpOnLoad,}  = useSelector((state) => ({
    httpOnLoad: state.httpOnLoad,
  }));

  const load = httpOnLoad.length && httpOnLoad[0]

  return (

    <Button
        disabled={disabled}
        style={{background: !disabled ? `#347AF0` : 'rgba(52,122,240,.5)',...styles}}
        className={classes.addButtonStyle}
        onClick={handleClick}
    >
      {
        Icon !== false &&  loader !== true && <img src={Images.addCircle} alt={'icon'}/>
      }

      { load === type ?
          <MinLoader margin={'0'} color={Colors.TextWhite}/>
          :
          text
      }
    </Button>
  );
};
