import React from "react";
import { CreateChancel } from "@eachbase/components";
import { tableTheadTbodyStyle } from "./styles";
import { FindLoad, FindSuccess } from "@eachbase/utils";

export const AddClaimModalInputs = ({ closeModal }) => {
   const classes = tableTheadTbodyStyle();

   const loader = FindLoad("ADD_CLAIM");
   const success = FindSuccess("ADD_CLAIM");

   function handleSubmit() {}

   return (
      <div>
         addClaimModalInputs
         <CreateChancel
            butnClassName={classes.createOrCancelButnStyle}
            loader={!!loader.length}
            create={"Close"}
            chancel={"Cancel"}
            onCreate={handleSubmit}
            onClose={closeModal}
         />
      </div>
   );
};
