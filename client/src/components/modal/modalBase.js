import React from "react";
import Modal from "@material-ui/core/Modal";
import { Backdrop } from "@material-ui/core";
import { AddButton } from "../buttons";

export const SimpleModal = ({
   openDefault,
   handleOpenClose,
   content,
   backdropCustom,
   addButton,
}) => {
   const [open, setOpen] = React.useState(false);

   console.log(openDefault, "render count");
   const handleOpenOrClose = () => {
      if (handleOpenClose) {
         handleOpenClose();
         console.log(1);
      } else {
         setOpen(true);
         console.log(0);
      }
   };

   const body = <div>{content}</div>;

   return (
      <div>
         {addButton && <AddButton text={addButton} handleClick={handleOpenOrClose} />}

         <Modal
            open={openDefault ? openDefault : open}
            onClose={handleOpenOrClose}
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            className={backdropCustom === true ? "my-profile" : ""}
            style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
            }}
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
};
