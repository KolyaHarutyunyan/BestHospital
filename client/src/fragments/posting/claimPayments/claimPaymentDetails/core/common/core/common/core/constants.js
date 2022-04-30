import { getLimitedVal } from "@eachbase/utils";

export function getReceivData(givenData = "", givenWidth) {
   const firstSize = 2561;
   const firstLimit = 14;

   const secondSize = 1680;
   const secondLimit = 10;

   const initialLimit = 23;

   const tableData =
      givenWidth <= secondSize
         ? getLimitedVal(givenData, secondLimit)
         : givenWidth > secondSize && givenWidth <= firstSize
         ? getLimitedVal(givenData, firstLimit)
         : getLimitedVal(givenData, initialLimit);

   return tableData;
}
