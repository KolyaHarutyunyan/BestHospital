import React, { useState } from "react";
import { Card, SimpleModal } from "@eachbase/components";
import { serviceSingleStyles } from "./styles";
import { Colors, Images } from "@eachbase/utils";
import { AddEnrollment } from "../../clientModals";
import { getGeneralInfo } from "./constants";
import { ClientEnrollmentTable } from "./common";

export const ClientEnrollment = ({ data, info }) => {
   const classes = serviceSingleStyles();

   const [toggleModal, setToggleModal] = useState(false);

   const generalInfo = getGeneralInfo(data);

   return (
      <div className={classes.staffGeneralWrapper}>
         <SimpleModal
            handleOpenClose={() => setToggleModal((prevState) => !prevState)}
            openDefault={toggleModal}
            content={<AddEnrollment handleClose={() => setToggleModal(false)} />}
         />
         <Card
            width="32.5%"
            cardInfo={generalInfo}
            showHeader={true}
            title="General Info"
            color={Colors.BackgroundBlue}
            icon={Images.generalInfoIcon}
         />
         <div className={classes.notesWrap}>
            <ClientEnrollmentTable enrollments={info} />
         </div>
      </div>
   );
};
