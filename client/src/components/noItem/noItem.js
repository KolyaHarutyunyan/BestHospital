import React from "react";
import { useGlobalStyles } from "@eachbase/utils";

export const NoItemText = ({ text }) => {
   const globalStyle = useGlobalStyles();
   return <p className={globalStyle.noData}>{text}</p>;
};
