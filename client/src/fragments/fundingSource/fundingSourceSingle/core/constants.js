import { ErrorText } from "@eachbase/utils";

export function getHeaderTitlesForNote() {
   return [
      {
         title: "Date",
         sortable: true,
      },
      {
         title: "Creator Name",
         sortable: true,
      },
      {
         title: "Subject",
         sortable: false,
      },
      {
         title: "Action",
         sortable: false,
      },
   ];
}

export const getModifierNameErrorText = (error, backError) => {
   if (error === "name") {
      return ErrorText.field;
   } else if (backError?.length && backError[0]?.error === "Modifier already exists") {
      return ErrorText.existenceError("Modifier with this name");
   }
};
