import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
   AddButton,
   Card,
   DeleteElement,
   NoItemText,
   SelectInput,
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
import { adminActions, httpRequestsOnErrorsActions, httpRequestsOnSuccessActions } from "@eachbase/store";
import { systemItemStyles } from "@eachbase/fragments/system/core";
import { serviceSingleStyles } from "./styles";

const credentialBtn = {
   maxWidth: "174px",
   width: "100%",
   flex: "0 0 174px",
   padding: 0,
};
export const StaffService = ({ staffGeneral, info, services }) => {
   const params = useParams();
   const dispatch = useDispatch();
   const classes = systemItemStyles();
   const classes2 = serviceSingleStyles();
   const [inputs, setInputs] = useState({ serviceType: "" });
   const [error, setError] = useState("");
   const [index, setIndex] = useState(0);
   const [toggleModal, setToggleModal] = useState(false);

   const success = FindSuccess("DELETE_STAFF_SERVICE");
   const fail = FindError("CREATE_STAFF_SERVICE");
   const loadDel = FindLoad("DELETE_STAFF_SERVICE");
   const loadCreate = FindLoad("CREATE_STAFF_SERVICE");

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

   const generalInfo = [
      { title: "First Name", value: staffGeneral?.firstName },
      { title: "Middle Name", value: staffGeneral?.middleName },
      { title: "Last Name", value: staffGeneral?.lastName },
      { title: "Primary Email", value: staffGeneral?.email },
      { title: "Secondary Email", value: staffGeneral?.secondaryEmail },
      { title: "Primary Phone Number", value: staffGeneral?.phone },
      { title: "Secondary Phone Number", value: staffGeneral?.secondaryPhone },
   ];

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
         <div
            className={`${classes.flexContainer} ${classes.headerSize}`}
            style={{
               marginLeft: 24,
               borderRadius: "8px",
               boxShadow: "0px 0px 6px #8A8A8A3D",
               padding: 24,
               width: "100%",
               flexDirection: "column",
            }}
         >
            <span className={classes.title} style={{ marginBottom: 24 }}>
               Services
            </span>
            <div style={{ display: "flex", width: "100%" }}>
               <SelectInputPlaceholder
                  placeholder="Service Type"
                  style={classes.credentialInputStyle2}
                  name={"serviceType"}
                  handleSelect={handleChange}
                  value={inputs.serviceType}
                  list={filteredList ? filteredList : []}
                  typeError={
                     error === "serviceType"
                        ? ErrorText.field
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
               />
            </div>
            {services && services.length ? (
               <></>
            ) : (
               <span className={classes.noTypeYet}>No services found</span>
            )}
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
                  <NoItemText text="No Services Yet" />
               )}
            </div>
         </div>
      </div>
   );
};
