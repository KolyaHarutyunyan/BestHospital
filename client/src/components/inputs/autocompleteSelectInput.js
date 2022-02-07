import React from "react";
import { Checkbox, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { inputsStyle } from "./styles";
import { transformPermission } from "@eachbase/utils";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const CheckboxesTags = ({
   label,
   permissionsList,
   placeholder,
   handleChange,
   styles,
   typeError,
}) => {
   const classes = inputsStyle();

   return (
      <Autocomplete
         className={classes.autocompleteStyle}
         multiple
         style={styles}
         id="checkboxes-tags-demo"
         options={permissionsList}
         disableCloseOnSelect
         onChange={(event, value) => handleChange(value)}
         getOptionLabel={(option) => option.title}
         renderOption={(option, { selected }) => (
            <div className={classes.optionsStyle}>
               <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
               {transformPermission(option.title)}
            </div>
         )}
         renderInput={(params) => (
            <TextField
               {...params}
               error={typeError}
               variant="outlined"
               label={label}
               placeholder={placeholder}
            />
         )}
      />
   );
};
