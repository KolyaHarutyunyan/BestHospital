import { getLimitedVal } from "@eachbase/utils";

export function getClaimData(givenData = "", isOpen, givenWidth) {
   const firstSize = isOpen ? 2310 : 2180;
   const firstLimit = isOpen ? 14 : 16;

   const secondSize = isOpen ? 1870 : 1820;
   const secondLimit = isOpen ? 10 : 14;

   const thirdSize = isOpen ? 1350 : 1440;
   const thirdLimit = isOpen ? 8 : 10;

   const initialLimit = isOpen ? 21 : 23;

   const tableData =
      givenWidth <= thirdSize
         ? getLimitedVal(givenData, thirdLimit)
         : givenWidth > thirdSize && givenWidth <= secondSize
         ? getLimitedVal(givenData, secondLimit)
         : givenWidth > secondSize && givenWidth <= firstSize
         ? getLimitedVal(givenData, firstLimit)
         : getLimitedVal(givenData, initialLimit);

   return tableData;
}
