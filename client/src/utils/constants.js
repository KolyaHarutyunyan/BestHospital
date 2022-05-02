import { getLimitedVal } from "@eachbase/utils";

export const list = [
   { name: "ACTIVE", id: "ACTIVE" },
   { name: "INACTIVE", id: "INACTIVE" },
   { name: "HOLD", id: "HOLD" },
   { name: "TERMINATE", id: "TERMINATE" },
];

export function getDataForTable(givenData = "", isOpen, givenWidth) {
   const firstSize = isOpen ? 1850 : 1730;
   const firstLimit = isOpen ? 18 : 20;

   const secondSize = isOpen ? 1680 : 1640;
   const secondLimit = isOpen ? 12 : 14;

   const thirdSize = isOpen ? 1350 : 1345;
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

export function getGeneratingDataForTable(givenData = "", isOpen, givenWidth) {
   const firstSize = isOpen ? 1850 : 1825;
   const firstLimit = isOpen ? 12 : 14;

   const secondSize = isOpen ? 1450 : 1500;
   const secondLimit = isOpen ? 8 : 10;

   const initialLimit = isOpen ? 16 : 18;

   const tableData =
      givenWidth <= secondSize
         ? getLimitedVal(givenData, secondLimit)
         : givenWidth > secondSize && givenWidth <= firstSize
         ? getLimitedVal(givenData, firstLimit)
         : getLimitedVal(givenData, initialLimit);

   return tableData;
}

export function getModalDataForTable(givenData = "", givenWidth) {
   const firstSize = 1940;
   const firstLimit = 16;

   const secondSize = 1640;
   const secondLimit = 14;

   const thirdSize = 1345;
   const thirdLimit = 10;

   const initialLimit = 23;

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
