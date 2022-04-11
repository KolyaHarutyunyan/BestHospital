import { SearchAndFilter, SimpleTooltip } from "@eachbase/components";

function isNotString(value = "") {
   return typeof value !== "string";
}

export function getTableHeader(
   tooltipTitle = "",
   theadTitle = "",
   theadType = "",
   theadCustom = true,
   iconsAreLight = false,
   tooltipPlace = "top-start"
) {
   const forbid =
      isNotString(tooltipTitle) ||
      isNotString(theadTitle) ||
      isNotString(theadType) ||
      isNotString(tooltipPlace);

   if (forbid) return "--";

   const tableHeader = theadTitle.endsWith("...")
      ? theadTitle.substring(0, theadType.length - 3)
      : theadTitle;

   const withTooltip = tooltipTitle.length !== tableHeader.length;

   if (withTooltip) {
      return (
         <SimpleTooltip title={tooltipTitle} placement={tooltipPlace}>
            <div>
               <SearchAndFilter
                  title={theadTitle}
                  custom={theadCustom}
                  type={theadType}
                  iconsAreLight={iconsAreLight}
               />
            </div>
         </SimpleTooltip>
      );
   }

   return (
      <div>
         <SearchAndFilter
            title={theadTitle}
            custom={theadCustom}
            type={theadType}
            iconsAreLight={iconsAreLight}
         />
      </div>
   );
}
