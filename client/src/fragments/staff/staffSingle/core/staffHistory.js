import { HistoryCard, Loader, NoItemText } from "@eachbase/components";
import { useSelector } from "react-redux";
import React from "react";
import { FindLoad, useGlobalStyles } from "@eachbase/utils";

export const StaffHistory = ({ data = [] }) => {
   const classes = useGlobalStyles();
   const { httpOnError } = useSelector((state) => ({
      httpOnError: state.httpOnError,
   }));

   const loader = FindLoad("GET_FUNDING_SOURCE_HISTORIES_BY_ID");

   let errorMessage =
      httpOnError.length &&
      httpOnError.filter(
         (param) => param.error === "History with this id was not found"
      );

   if (!!loader.length) return <Loader circleSize={70} />;

   if (errorMessage || !data.length)
      return <NoItemText text="There is no history in this date" />;

   return (
      <div>
         <div className={classes.globalHistory}>
            {data.map((item, index) => {
               return (
                  <div key={index}>
                     <HistoryCard data={item} />
                  </div>
               );
            })}
         </div>
      </div>
   );
};
