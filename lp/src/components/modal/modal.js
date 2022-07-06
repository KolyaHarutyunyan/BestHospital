import React, { Fragment } from "react";
import { Modal } from "@mui/material";
import { Backdrop } from "@mui/material";

export const SimpleModal = ({
   openDefault,
   closeModal,
   content,
   backdropCustom,
   disableScrollLock,
}) => {
   const [open, setOpen] = React.useState(false);

   function handleClose() {
      if (closeModal) {
         closeModal();
      } else {
         setOpen(false);
      }
   }

   return (
      <Modal
         disableScrollLock={disableScrollLock}
         open={openDefault ? openDefault : open}
         onClose={handleClose}
         aria-labelledby="spring-modal-title"
         aria-describedby="spring-modal-description"
         className={backdropCustom ? backdropCustom : ""}
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
         <Fragment>{content}</Fragment>
      </Modal>
   );
};
