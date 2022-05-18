import { getLimitedVal } from "@eachbase/utils";

export function getBillWithScrollData(givenData = "", isOpen, givenWidth) {
   const firstSize = isOpen ? 2310 : 2465;
   const firstLimit = isOpen ? 7 : 10;

   const secondSize = isOpen ? 1925 : 1940;
   const secondLimit = isOpen ? 5 : 8;

   const thirdSize = isOpen ? 1570 : 1565;
   const thirdLimit = isOpen ? 4 : 6;

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
