import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { Colors } from "@eachbase/utils";
import { withStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  select: {
    border: `1px solid ${Colors.darkGray}`,
    height: 48,
    marginTop: "0!important",
    paddingLeft: 16,
    borderRadius: 4,
    "& .MuiSelect-select.MuiSelect-select": {
      backgroundColor: "white",
      color: Colors.TextSecondary,
    },
  },
  label: {
    fontSize: 16,
    top: -9,
    left: 16,
    backgroundColor: "white",
    zIndex: 1,
  },
  icon: {
    fill: Colors.ThemeBlue,
    width: 30,
    height: 30,
    top: "calc(50% - 16px)",
  },
  cssLabel: {
    color: "#d3d3d3",
    "&.Mui-focused": {
      color: Colors.ThemeBlue,
    },
  },
  listItemText: {
    color: Colors.TextSecondary,
  },
}));

const CustomColorCheckbox = withStyles({
  root: {
    color: Colors.ThemeBlue,
    "&$checked": {
      color: Colors.BackgroundBlue,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function SelectInputWidthTags({ permissionsList, checkedItems }) {
  const classes = useStyles();
  const [personName, setPersonName] = React.useState([]);

  useEffect(() => {
    checkedItems(personName);
  }, [personName]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.label} id="demo-mutiple-checkbox-label">
          Add Role
        </InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          inputProps={{
            classes: {
              icon: classes.icon,
              root: classes.cssLabel,
            },
          }}
          className={classes.select}
          disableUnderline={true}
        >
          {permissionsList &&
            permissionsList.map((name) => (
              <MenuItem key={name} value={name}>
                <CustomColorCheckbox checked={personName.indexOf(name) > -1} />
                <ListItemText className={classes.listItemText} primary={name} />
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
