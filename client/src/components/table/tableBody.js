import { TableBody, TableRow } from "@material-ui/core";
import { tableStyle } from "./styles";

export const TableBodyComponent = ({ children, handleClick, key, handleOpenInfo }) => {
  const classes = tableStyle();
  return (
    <TableBody className={classes.tableBody} key={key} onClick={handleClick}>
      <TableRow onClick={handleOpenInfo} className={classes.tableRow}>{children}</TableRow>
    </TableBody>
  );
};
