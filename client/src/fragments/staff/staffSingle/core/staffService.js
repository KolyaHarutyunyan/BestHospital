import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
   AddButton,
   Card,
   DeleteElement,
   NoItemText,
   SimpleModal,
   SlicedText,
} from "@eachbase/components";
import {
   Colors,
   ErrorText,
   FindError,
   FindLoad,
   FindSuccess,
   Images,
   isNotEmpty,
} from "@eachbase/utils";
import { SelectInputPlaceholder } from "@eachbase/components";
import {
   adminActions,
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";
import { systemItemStyles } from "@eachbase/fragments/system/core";
import { serviceSingleStyles } from "./styles";
import { getStaffGeneralInfo } from "./constants";

const credentialBtn = {
   maxWidth: "174px",
   width: "100%",
   flex: "0 0 174px",
   padding: 0,
};
export const StaffService = ({ staffGeneral, info, services }) => {
   const classes = systemItemStyles();
   const classes2 = serviceSingleStyles();

   const params = useParams();

   const dispatch = useDispatch();

   const success = FindSuccess("DELETE_STAFF_SERVICE");
   const fail = FindError("CREATE_STAFF_SERVICE");
   const loadDel = FindLoad("DELETE_STAFF_SERVICE");
   const loadCreate = FindLoad("CREATE_STAFF_SERVICE");

   const [inputs, setInputs] = useState({});
   const [error, setError] = useState("");
   const [index, setIndex] = useState(0);
   const [toggleModal, setToggleModal] = useState(false);

   const _isNotClinician = staffGeneral?.clinical === false;
   const servicesInfoText = _isNotClinician
      ? "Services can be added for Clinicians only"
      : "No Services yet";

   useEffect(() => {
      if (!!success.length) {
         setToggleModal(false);
         dispatch(httpRequestsOnSuccessActions.removeSuccess("DELETE_STAFF_SERVICE"));
      }
   }, [success.length]);

   const handleChange = (e) => {
      fail.length &&
         dispatch(httpRequestsOnErrorsActions.removeError("CREATE_STAFF_SERVICE"));
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
   };

   let deleteService = () => {
      dispatch(adminActions.deleteStaffService(params.id, info[index]?._id));
   };

   const handleSubmit = () => {
      if (isNotEmpty(inputs.serviceType)) {
         let serviceID =
            services &&
            services.length > 0 &&
            services.find((item) => item.name === inputs.serviceType).id;

         dispatch(adminActions.createStaffService(params.id, serviceID));
         setIndex(0);
      } else {
         setError(!isNotEmpty(inputs.serviceType) ? "serviceType" : "");
      }
   };

   const generalInfo = getStaffGeneralInfo(staffGeneral);

   const filteredList =
      services &&
      services.length &&
      services.filter(function (array_el) {
         return (
            info &&
            info.filter(function (anotherOne_el) {
               return anotherOne_el._id === array_el.id;
            }).length === 0
         );
      });

   return (
      <div className={classes2.staffGeneralWrapper}>
         <SimpleModal
            handleOpenClose={() => setToggleModal((prevState) => !prevState)}
            openDefault={toggleModal}
            content={
               <DeleteElement
                  loader={!!loadDel.length}
                  info={`${info && info[index]?.name}`}
                  text={`delete Service`}
                  handleClose={() => setToggleModal((prevState) => !prevState)}
                  handleDel={deleteService}
               />
            }
         />
         <Card
            width="49%"
            cardInfo={generalInfo}
            showHeader={true}
            title="General Info"
            color={Colors.BackgroundBlue}
            icon={Images.generalInfoIcon}
         />
         <div className={`${classes.flexContainer} ${classes2.headerSize}`}>
            <span className={classes.title} style={{ marginBottom: 24 }}>
               Services
            </span>
            <div style={{ display: "flex", width: "100%" }}>
               <SelectInputPlaceholder
                  placeholder="Service Type*"
                  style={classes.credentialInputStyle2}
                  name={"serviceType"}
                  handleSelect={handleChange}
                  value={inputs.serviceType}
                  list={filteredList ? filteredList : []}
                  disabled={_isNotClinician}
                  typeError={
                     error === "serviceType"
                        ? ErrorText.selectField
                        : fail && fail.length && fail[0].error === "Service already exist"
                        ? "Service already exist"
                        : ""
                  }
               />
               <AddButton
                  type={"CREATE_STAFF_SERVICE"}
                  loader={!!loadCreate.length}
                  styles={credentialBtn}
                  handleClick={handleSubmit}
                  text="Add Service Type"
                  disabled={_isNotClinician}
               />
            </div>
            <div className={classes.credentialTable}>
               {info && info.length ? (
                  info.map((item, index) => {
                     return (
                        <div className={classes.item} key={index}>
                           <div style={{ display: "flex", alignItems: "center" }}>
                              <SlicedText
                                 type={"responsive"}
                                 size={25}
                                 data={item.name}
                              />
                           </div>
                           <div className={classes.icons}>
                              <img
                                 src={Images.remove}
                                 alt="delete"
                                 onClick={() => {
                                    setToggleModal((prevState) => !prevState);
                                    setIndex(index);
                                 }}
                              />
                           </div>
                        </div>
                     );
                  })
               ) : (
                  <NoItemText text={servicesInfoText} />
               )}
            </div>
         </div>
      </div>
   );
};
