import { HistoryCard } from "@eachbase/components/card";
import { Loader, NoItemText } from "@eachbase/components";
import React from "react";
import { FindLoad, useGlobalStyles } from "@eachbase/utils";

export const FundingSourceSingleHistories = ({ data }) => {
   const classes = useGlobalStyles();

   const loader = FindLoad("GET_FUNDING_SOURCE_HISTORIES_BY_ID");

   return (
      <div>
         {!data?.length ? (
            <NoItemText text="There is no history in this date" />
         ) : !!loader.length ? (
            <Loader />
         ) : (
            <div className={classes.globalHistory}>
               {data &&
                  data.map((item, index) => {
                     return (
                        <div key={index}>
                           <HistoryCard data={item} />
                        </div>
                     );
                  })}
            </div>
         )}
      </div>
   );
};
