import { TableRow } from "@material-ui/core";
import { tableStyle } from "./styles";

export const TableBodyComponent = ({ children, handleOpenInfo , active }) => {
  const classes = tableStyle();
  return (
      <TableRow style={active ?  {background : "#EBF2FD "} : {}} onClick={handleOpenInfo} className={classes.tableRow}>{children}</TableRow>
  );
};
