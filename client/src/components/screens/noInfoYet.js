import React from "react";
import { screensStyle } from "./styles";
import { useGlobalTextStyles } from "@eachbase/utils";

export const NoInfoYet =({text})=>{
  const classes =screensStyle()
  const globalClasses =useGlobalTextStyles()
  return(
  <div className={classes.selectRole}><p className={globalClasses.modalTitle}>Select Role</p></div>
  )
}