import React from "react";
import { Button } from "components";
import { Images } from "assets";

export const SimpleModal = ({ modalClassName, modalOpen, closeModal, children }) => {
   const [open, setOpen] = React.useState(false);

   function handleClose() {
      if (closeModal) {
         closeModal();
      } else {
         setOpen(false);
      }
   }

   const _modalIsOpen = modalOpen ? modalOpen : open;

   if (!_modalIsOpen) return;

   return (
      <div className={`modal-overlay ${modalClassName}`} onClick={handleClose}>
         <div className="modal-popup" onClick={(event) => event.stopPropagation()}>
            <Button
               buttonType={"button"}
               buttonClassName={"modal-close-button"}
               onClickButton={closeModal}
            >
               <img src={Images.CloseIcon} alt="closer" />
            </Button>
            <div className="modal-content">{children}</div>
         </div>
      </div>
   );
};
