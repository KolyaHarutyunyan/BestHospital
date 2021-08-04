import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Backdrop } from "@material-ui/core";
import { AddButton } from "../buttons";


const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
  },
}));

export const SimpleModal = ({status, openDefault, handleOpenClose, content, backdropCustom, addButton }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenOrClose = () => {
    if (handleOpenClose) {
      handleOpenClose()
    } else {
      setOpen(false);
    }
  };

  const body = (
    <div>
      {content}
    </div>
  );

  return (
    <div>
      {addButton &&
        <AddButton text={addButton} handleClick={handleOpenOrClose} />
      }

      <Modal
        open={openDefault}
        onClose={handleOpenOrClose}
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={backdropCustom === true ? 'my-profile' : ''}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}

      >
        {body}
      </Modal>
    </div>
  );
}
