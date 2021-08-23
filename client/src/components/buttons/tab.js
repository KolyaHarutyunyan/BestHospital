import React from "react";
import { Paper, Tab, Tabs } from "@material-ui/core";
import { buttonsStyle } from "./styles";

export const ButtonsTab = ({ first, second,getActive,getInactive  }) => {
  const classes = buttonsStyle();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      style={{
        width: "212px",
        border:'none',
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        boxShadow: '0px 0px 6px #8A8A8A29',
        borderRadius: '8px',
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
        <Tab style={{ width: "100px" }} label={first} onClick={getActive}/>
        <Tab style={{ width: "100px" }} label={second} onClick={getInactive}/>
      </Tabs>
    </Paper>
  );
};
