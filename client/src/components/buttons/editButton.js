import { Button } from "@material-ui/core"
import { buttonsStyle } from "./styles"

export const EditButton = ({handleClick}) =>{
    const classes = buttonsStyle();
    return(
        <Button 
         className={classes.editButtonStyle}
         onClick={handleClick}
        >
            Edit
        </Button>
    )
}