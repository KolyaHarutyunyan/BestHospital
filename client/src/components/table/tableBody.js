import { TableRow } from "@material-ui/core";
import { tableStyle } from "./styles";
import { Colors } from "@eachbase/utils";

export const TableBodyComponent = ({
   children,
   handleOpenInfo,
   active,
   className,
}) => {
   const classes = tableStyle();
   return (
      <TableRow
         style={active ? { backgroundColor: Colors.BackgroundWater } : {}}
         onClick={handleOpenInfo}
         className={`${classes.tableRow} ${className}`}
      >
         {children}
      </TableRow>
   );
};
