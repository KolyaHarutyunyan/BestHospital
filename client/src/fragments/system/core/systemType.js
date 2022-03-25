import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { TableCell } from "@material-ui/core";
import {
   Notes,
   TableBodyComponent,
   AddButton,
   ValidationInput,
   SlicedText,
   NoItemText,
} from "@eachbase/components";
import { FindLoad, FindSuccess, Images, isNotEmpty } from "@eachbase/utils";
import { systemItemStyles } from "./styles";
import { httpRequestsOnSuccessActions, systemActions } from "@eachbase/store";

const credentialBtn = {
   maxWidth: "174px",
   width: "100%",
   flex: "0 0 174px",
   padding: 0,
};

const headerTitles = [
   {
      title: "Name",
      sortable: true,
   },
   {
      title: "Display Code",
      sortable: false,
   },
   {
      title: "Category",
      sortable: false,
   },
   {
      title: "Action",
      sortable: false,
   },
];

export const ServiceType = ({ globalServices, removeItem, openModal }) => {
   const [inputs, setInputs] = useState({});
   const [error, setError] = useState("");

   const serviceDataIsValid =
      isNotEmpty(inputs.name) &&
      isNotEmpty(inputs.displayCode) &&
      isNotEmpty(inputs.category);

   const isDisabled = serviceDataIsValid;

   const classes = systemItemStyles();

   const dispatch = useDispatch();

   const notesItem = (item, index) => {
      return (
         <TableBodyComponent key={index}>
            <TableCell>
               <SlicedText size={30} type={"name"} data={item.name} />
            </TableCell>
            <TableCell>
               <SlicedText size={25} type={"email"} data={item.displayCode} />
            </TableCell>
            <TableCell>
               <SlicedText size={25} type={"email"} data={item.category} />
            </TableCell>
            <TableCell>
               {item.action ? (
                  item.action
               ) : (
                  <div className={classes.icons}>
                     <img
                        src={Images.edit}
                        onClick={() =>
                           editService("editService", {
                              id: item.id,
                              name: item.name,
                              category: item.category,
                              displayCode: item.displayCode,
                           })
                        }
                        alt="edit"
                     />
                     <img
                        src={Images.remove}
                        alt="delete"
                        onClick={() =>
                           removeItem({
                              id: item.id,
                              name: item.name,
                              type: "editService",
                           })
                        }
                     />
                  </div>
               )}
            </TableCell>
         </TableBodyComponent>
      );
   };

   const editService = (modalType, modalInformation) => {
      openModal(modalType, modalInformation);
   };

   const handleChange = (e) => {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
   };

   const handleSubmit = () => {
      if (serviceDataIsValid) {
         const serviceData = {
            name: inputs.name,
            displayCode: inputs.displayCode,
            category: inputs.category,
         };

         dispatch(systemActions.createServiceGlobal(serviceData));
      } else {
         const serviceDataErrorText = !isNotEmpty(inputs.name)
            ? "name"
            : !isNotEmpty(inputs.displayCode)
            ? "displayCode"
            : !isNotEmpty(inputs.category)
            ? "category"
            : "";

         setError(serviceDataErrorText);
      }
   };

   const loader = FindLoad("CREATE_SERVICE_GLOBAL");
   const success = FindSuccess("CREATE_SERVICE_GLOBAL");

   useEffect(() => {
      if (!!success.length) {
         setInputs({
            name: "",
            displayCode: "",
            category: "",
         });
         dispatch(
            httpRequestsOnSuccessActions.removeSuccess("CREATE_SERVICE_GLOBAL")
         );
      }
   }, [success]);

   return (
      <>
         <div className={classes.flexContainer}>
            <ValidationInput
               style={classes.systemInputStyles}
               onChange={handleChange}
               value={inputs.name}
               variant={"outlined"}
               name={"name"}
               type={"text"}
               placeholder={"Service Name*"}
            />
            <ValidationInput
               style={classes.systemInputStyles}
               onChange={handleChange}
               value={inputs.displayCode}
               variant={"outlined"}
               name={"displayCode"}
               type={"text"}
               placeholder={"Display Code*"}
            />
            <ValidationInput
               style={classes.systemInputStyles}
               onChange={handleChange}
               value={inputs.category}
               variant={"outlined"}
               name={"category"}
               type={"text"}
               placeholder={"Category*"}
            />
            <AddButton
               loader={!!loader.length}
               type={"CREATE_SERVICE_GLOBAL"}
               styles={credentialBtn}
               disabled={!isDisabled}
               handleClick={handleSubmit}
               text="Add Service Type"
            />
         </div>
         <p className={classes.title}>Service Type</p>
         {globalServices.length ? (
            <Notes
               defaultStyle={true}
               data={globalServices}
               pagination={false}
               items={notesItem}
               headerTitles={headerTitles}
            />
         ) : (
            <NoItemText text="No Items Yet" />
         )}
      </>
   );
};
