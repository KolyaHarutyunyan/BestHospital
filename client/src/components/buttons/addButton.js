import { Button } from "@material-ui/core";
import { buttonsStyle } from "./styles";
import {Colors, Images} from "@eachbase/utils";
import {MinLoader} from "../loader";
import {useSelector} from "react-redux";

export const AddButton = ({loader,disabled, styles, text, handleClick,type }) => {
  const classes = buttonsStyle();

  const {httpOnLoad,}  = useSelector((state) => ({
    httpOnLoad: state.httpOnLoad,
  }));

  const load = httpOnLoad.length && httpOnLoad[0]

  return (

    <Button
        disabled={disabled}
        style={{background: !disabled ? `#347AF0!important` : 'rgba(52,122,240,.5)',...styles}}
        className={classes.addButtonStyle}
        onClick={handleClick}
        // styles={}
    >
      {
        loader !== true && <img src={Images.addCircle} alt={'icon'}/>
      }

      { load === type ?
          <MinLoader margin={'0'} color={Colors.TextWhite}/>
          :
          text
      }
    </Button>
  );
};
