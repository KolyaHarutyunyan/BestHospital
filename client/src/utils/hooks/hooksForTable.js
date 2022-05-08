import { SearchAndFilter, SimpleTooltip } from "@eachbase/components";
import moment from "moment";
import { getLimitedVal } from ".";

function isNotString(value = "") {
   return typeof value !== "string";
}

export const hooksForTable = {
   addSignToValueFromStart: (value = "", sign = "$") => `${sign} ${value}`,

   getFullName: (first = "", last = "", callback) => {
      if (typeof first !== "string" || typeof last !== "string") return;

      const fullName =
         !!first && !!last
            ? callback(`${first} ${last}`)
            : !!first
            ? callback(first)
            : !!last
            ? callback(last)
            : "--- ---";

      return fullName;
   },

   getTableHeader: (
      tooltipTitle = "",
      theadTitle = "",
      theadType = "",
      theadCustom = true,
      iconsAreLight = false,
      tooltipPlace = "top-start"
   ) => {
      const forbid =
         isNotString(tooltipTitle) ||
         isNotString(theadTitle) ||
         isNotString(theadType) ||
         isNotString(tooltipPlace);

      if (forbid) return "--";

      const tableHeader = theadTitle.endsWith("...")
         ? theadTitle.substring(0, theadTitle.length - 3)
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
   },

   getTextDependsOnWidth: (innerWidth, givenSize, text = "", limit = 5) => {
      const forbid =
         typeof innerWidth !== "number" ||
         typeof givenSize !== "number" ||
         typeof text !== "string" ||
         typeof limit !== "number";

      if (forbid) return text;

      return innerWidth < givenSize ? getLimitedVal(text, limit) : text;
   },

   getValueByFixedNumber: (value = 0, number = 2) =>
      typeof value === "number" ? value.toFixed(number) : value,

   handleCreatedAtDate: (date) => moment(date).format("DD/MM/YYYY"),

   resetRadius: (corner = "") => {
      if (typeof corner !== "string") return corner;

      switch (corner) {
         case "left":
            return {
               borderTopLeftRadius: 0,
               borderBottomLeftRadius: 0,
            };
         case "right":
            return {
               borderTopRightRadius: 0,
               borderBottomRightRadius: 0,
            };

         default:
            return { borderRadius: 0 };
      }
   },

   showDashIfEmpty: (value = "") => {
      if (value.toString().trim().length === 0) {
         return <div style={{ marginLeft: "5%" }}>{"---"}</div>;
      }

      return value;
   },
};
