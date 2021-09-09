import { TableBody, TableRow } from "@material-ui/core";
import { tableStyle } from "./styles";

export const TableBodyComponent = ({ children, handleClick, index, handleOpenInfo , active }) => {
  const classes = tableStyle();
  return (
    <TableBody className={classes.tableBody} key={index} onClick={handleClick}>
      <TableRow style={active ?  {background : "#EBF2FD "} : {}} onClick={handleOpenInfo} className={  classes.tableRow}>{children}</TableRow>
    </TableBody>
  );
};
