import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   DeleteElement,
   NoItemText,
   Notes,
   SimpleModal,
   TableBodyComponent,
} from "@eachbase/components";
import { FundingSourceSinglePTModifiers } from "./fundingSourceSinglePTModifiers";
import { FindSuccess, Images } from "@eachbase/utils";
import { TableBody, TableCell } from "@material-ui/core";
import { fundingSourceSingleStyles } from "./styles";
import { FundingSourceServiceAdd } from "./modals";
import {
   fundingSourceActions,
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";

export const FundingSourceSingleServices = ({ data }) => {
   const [toggleModal, setToggleModal] = useState(false);
   const [index, setIndex] = useState(null);
   const [delEdit, setDelEdit] = useState(null);
   const [serviceIndex, setServiceIndex] = useState(0);
   const [accept, setAccept] = useState(false);
   const classes = fundingSourceSingleStyles();
   const dispatch = useDispatch();
   const modifiers = useSelector((state) => state.fundingSource?.modifiers.modifiers);
   const globalCredentials = useSelector((state) => state.system.credentials);

   // const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
   //     httpOnSuccess: state.httpOnSuccess,
   //     httpOnError: state.httpOnError,
   //     httpOnLoad: state.httpOnLoad,
   // }));

   const [modif, setModif] = useState("");

   // useEffect(() =>{
   //     setModif(data[serviceIndex].modifiers)
   // },[data])

   // useEffect(() =>{
   //     if(edited.length) {
   //         setModif(data[index].modifiers)
   //     }
   // },[edited])

   // const success = httpOnSuccess.length && httpOnSuccess[0].type === 'GET_FUNDING_SOURCE_SERVICE_MODIFIERS'

   // useEffect(() => {
   //     if (success) {
   //         dispatch(httpRequestsOnSuccessActions.removeSuccess('GET_FUNDING_SOURCE_SERVICE_MODIFIERS'))
   //         if (accept) {
   //             setToggleModal(!toggleModal)
   //             setAccept(false)
   //         }
   //     }
   // }, [success])
   //
   // useEffect(() => {
   //     if (httpOnError.length && httpOnError[0].error === 'Modifier was not found') {
   //         dispatch(httpRequestsOnSuccessActions.removeSuccess('GET_FUNDING_SOURCE_SERVICE_MODIFIERS'))
   //         dispatch(httpRequestsOnErrorsActions.removeError('GET_FUNDING_SOURCE_SERVICE_MODIFIERS'))
   //         if (accept) {
   //             setToggleModal(!toggleModal)
   //             setAccept(false)
   //         }
   //     }
   //
   // }, [httpOnError])

   const headerTitles = [
      {
         title: "Service",
         sortable: true,
      },
      {
         title: "CPT Code",
         sortable: false,
      },
      {
         title: "Unit Size",
         sortable: false,
      },
      {
         title: "Min Unit",
         sortable: false,
      },
      {
         title: "Max Unit",
         sortable: false,
      },
      {
         title: "Action",
         sortable: false,
      },
   ];

   let onEdit = (index) => {
      setIndex(index);
      setDelEdit("edit");
      setAccept(true);
      setToggleModal(!toggleModal);
      setModif(data[index]);
      // dispatch(fundingSourceActions.getFoundingSourceServiceModifiers(data[serviceIndex]._id))
   };

   let onRow = (item, index) => {
      setServiceIndex(index);
      setModif(item.modifiers);
      // dispatch(fundingSourceActions.getFoundingSourceServiceModifiers(id))
   };

   // useEffect(() => {
   //     if (data) {
   //         dispatch(fundingSourceActions.getFoundingSourceServiceModifiers(data[serviceIndex]._id))
   //     }
   // }, [])

   let deleteService = () => {
      dispatch(fundingSourceActions.deleteFoundingSourceServiceById(data[serviceIndex]._id));
   };

   let serviceItem = (item, index) => {
      return (
         <TableBodyComponent
            active={index === serviceIndex}
            key={index}
            handleOpenInfo={() => onRow(item, index)}
         >
            <TableCell>
               <p className={classes.tableTitle}>{item.name}</p>
            </TableCell>
            <TableCell> {item.cptCode} </TableCell>
            <TableCell> {item.size} </TableCell>
            <TableCell> {item.min} </TableCell>
            <TableCell> {item.max} </TableCell>
            <TableCell>
               <>
                  <img
                     src={Images.edit}
                     alt="edit"
                     className={classes.iconCursor}
                     onClick={() => onEdit(index)}
                  />
                  {/*<img src={Images.remove} alt="delete" className={classes.iconCursordelete}*/}
                  {/*     onClick={(e) => {*/}
                  {/*         e.stopPropagation()*/}
                  {/*         setIndex(index)*/}
                  {/*         setDelEdit('del')*/}
                  {/*         setToggleModal(!toggleModal)*/}
                  {/*     }}/>*/}
               </>
            </TableCell>
         </TableBodyComponent>
      );
   };

   return (
      <div className={classes.fundindService}>
         <SimpleModal
            openDefault={toggleModal}
            handleOpenClose={() => setToggleModal(!toggleModal)}
            content={
               delEdit === "del" ? (
                  <DeleteElement
                     handleDel={deleteService}
                     info={index !== null ? data[index].name : ""}
                     text={"Delete Service"}
                     handleClose={() => setToggleModal(!toggleModal)}
                  />
               ) : (
                  <FundingSourceServiceAdd
                     modifiersID={modif}
                     info={data ? data[index] : {}}
                     handleClose={() => setToggleModal(!toggleModal)}
                  />
               )
            }
         />
         <div className={classes.fundindServiceItems}>
            <Notes
               restHeight={"360px"}
               data={data}
               items={serviceItem}
               headerTitles={headerTitles}
               defaultStyle={true}
            />
         </div>
         <FundingSourceSinglePTModifiers
            globalCredentials={globalCredentials}
            data={data ? data[serviceIndex].modifiers : ""}
            title={data && data[serviceIndex]?.name}
         />
      </div>
   );
};
