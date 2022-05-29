import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fundingSourceSingleStyles, editButtonStyle } from "./styles";
import { FindLoad, Images } from "@eachbase/utils";
import {
   AddButton,
   AddModalButton,
   SimpleModal,
   AddNotes,
   ValidationInput,
} from "@eachbase/components";
import { FundingSourceServiceAdd } from "./modals";
import { CreateFundingSource } from "../../createFundingSource";
import { fundingSourceActions } from "@eachbase/store";

const filterBtn = {
   width: 93,
   height: 36,
};

export const FundingSourceSingleHeader = ({ activeTab, title }) => {
   const classes = fundingSourceSingleStyles();

   const dispatch = useDispatch();

   const prevData = useSelector((state) => state.fundingSource.fundingSourceItem);

   const [open, setOpen] = useState(false);
   const [searchDate, setSearchDate] = useState("");
   const [isDisabled, setIsDisabled] = useState(false);

   const fsHistoryLoader = !!FindLoad("GET_FUNDING_SOURCE_HISTORIES_BY_ID").length;

   function handleOpenClose() {
      setOpen((prevState) => !prevState);
   }

   function handleChangeFile(e) {
      setIsDisabled(false);
      setSearchDate(e.target.value);
   }

   function handleSubmit() {
      setIsDisabled(true);
      dispatch(
         fundingSourceActions.getFundingSourceHistoriesById(
            "Funder",
            searchDate && new Date(searchDate).toISOString()
         )
      );
   }

   return (
      <div className={classes.fundingSourceSingleHeaderWrapStyles}>
         <div className={classes.fundingSourceSingleHeaderStyles}>
            <img
               src={Images.fundingSourceActive}
               className={classes.foundingIcon}
               alt="founding"
            />
            <p className={classes.title}>{title && title}</p>
         </div>
         <div style={{ display: "flex" }}>
            <SimpleModal
               openDefault={open}
               handleOpenClose={handleOpenClose}
               content={
                  activeTab === 0 ? (
                     <CreateFundingSource handleClose={handleOpenClose} info={prevData} />
                  ) : activeTab === 1 ? (
                     <FundingSourceServiceAdd handleClose={handleOpenClose} />
                  ) : activeTab === 2 ? (
                     <AddNotes model="Funder" handleClose={handleOpenClose} />
                  ) : null
               }
            />
            {activeTab === 0 ? (
               <AddModalButton
                  handleClick={handleOpenClose}
                  text="Edit"
                  btnStyles={editButtonStyle}
               />
            ) : activeTab === 3 ? (
               <>
                  <div className={classes.searchContainer}>
                     <ValidationInput
                        className={classes.dateInput}
                        errorFalse={true}
                        variant={"outlined"}
                        onChange={handleChangeFile}
                        value={searchDate}
                        type={"date"}
                        name="searchDate"
                     />
                     <AddModalButton
                        handleClick={handleSubmit}
                        text="Search"
                        loader={fsHistoryLoader}
                        btnStyles={filterBtn}
                        disabled={isDisabled}
                     />
                  </div>
               </>
            ) : activeTab >= 3 ? (
               <div className={classes.clear} />
            ) : (
               <AddButton
                  text={
                     activeTab === 1 ? "Add Service" : activeTab === 2 ? "Add Note" : ""
                  }
                  handleClick={handleOpenClose}
               />
            )}
         </div>
      </div>
   );
};
