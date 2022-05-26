import { TableRow } from "@material-ui/core";
import { tableStyle } from "./styles";

export const TableBodyComponent = ({ children, handleOpenInfo, active, className }) => {
   const classes = tableStyle();
   return (
      <TableRow
         style={active ? { backgroundColor: "#EBF2FD80" } : {}}
         onClick={handleOpenInfo}
         className={`${classes.tableRow} ${className}`}
      >
         {children}
      </TableRow>
   );
};
