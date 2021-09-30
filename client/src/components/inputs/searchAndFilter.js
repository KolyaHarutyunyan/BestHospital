import React from "react";
import TextField from "@material-ui/core/TextField";
import { inputsStyle } from "./styles";
import { Images } from "@eachbase/utils";

export const SearchAndFilter = ({
  title,
  type,
  custom,
  handleClick,

}) => {
  const classes = inputsStyle();
  return (
    <div className={classes.searchInputWrapper}>
      <div className={classes.searchInputTitle}>
        <p>{title}</p>
        {custom !== false && (
          <img onClick={handleClick} src={type ?  Images.bluePhone  : Images.aToZ} alt={"filter icon"} />
        )}
      </div>

      {/*<div*/}
      {/*  className={*/}
      {/*    title === "Action" ? classes.actionStyle : classes.searchInput*/}
      {/*  }*/}
      {/*>*/}
      {/*  <TextField*/}
      {/*    name={name}*/}
      {/*    // type={ type }*/}
      {/*    type="search"*/}
      {/*    id="standard-basic"*/}
      {/*    disabled={title === "Action"}*/}
      {/*    onChange={handleSearch}*/}
      {/*    // onFocus={ () => setValidEmail (false) }*/}
      {/*    // onBlur={ (e) => chechValid (e) }*/}
      {/*    fullWidth*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
};
