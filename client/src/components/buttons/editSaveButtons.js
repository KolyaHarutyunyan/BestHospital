import { useState } from "react"
import { buttonsStyle } from "./styles"
import { EditButton } from './editButton'
import { Button } from "@material-ui/core"

export const EditSaveButtons =({ handleSaveInfo, handleSetEdit, handleChancel })=>{
    const [edit, setEdit] = useState(false)
    const classes = buttonsStyle();
   
    const handleSave =() =>{
        setEdit(false)
        handleSaveInfo()
       
    }

    const handleEdit = ()=>{
      setEdit(true)
      handleSetEdit()
    }

    const cancel =()=>{
      setEdit(false)
      handleChancel()
    }

    return(
     <div>
       
        {edit  === false ? 
           <EditButton handleClick={ handleEdit } />
           :
           <div  className={classes.buttonsWrapper}>
             <Button 
                className={classes.cancelButton}
                onClick={ cancel }
              >
                  Cancel
              </Button>
             <Button 
                className={classes.saveButton}
                onClick={ handleSave } 
             >
                 Save
                 </Button>
           </div>
           }
     </div>
  )
}