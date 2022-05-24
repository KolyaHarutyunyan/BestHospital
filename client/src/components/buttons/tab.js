import React from "react";
import { Paper, Tab, Tabs } from "@material-ui/core";
import { buttonsStyle } from "./styles";
import { Backgrounds } from "@eachbase/utils";

export const ButtonsTab = ({ first, second, getActive, getInactive, viewType }) => {
   const classes = buttonsStyle();

   const [value, setValue] = React.useState(viewType === "calendar" ? 1 : 0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <Paper
         style={{
            width: "255px",
            border: "none",
            background: Backgrounds.whiteModal,
            boxShadow: "0px 0px 6px #8A8A8A29",
            borderRadius: "8px",
            marginRight: "26px",
         }}
         square
      >
         <Tabs
            className={classes.buttonsTab}
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
         >
            <Tab style={{ width: "125=px" }} label={first} onClick={getActive} />
            <Tab style={{ width: "125px" }} label={second} onClick={getInactive} />
         </Tabs>
      </Paper>
   );
};
