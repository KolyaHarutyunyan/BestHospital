import React from 'react';
import { Checkbox,TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { inputsStyle } from "./styles";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const  CheckboxesTags =({label,permissionsList,placeholder,handleChange,styles,typeError}) => {
  const classes = inputsStyle();
  return (
    <Autocomplete
      multiple
      style={{...styles}}
      id="checkboxes-tags-demo"
      options={permissionsList}
      disableCloseOnSelect
      onChange={(event, value) => handleChange(value)}
      getOptionLabel={(option) => option.title}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </React.Fragment>
      )}
      // style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          error={typeError}
          // inputProps={{ style : {height:'68px'}}}
          className={classes.inputTextFieldAutoHeight}
          variant="outlined"
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  );
}