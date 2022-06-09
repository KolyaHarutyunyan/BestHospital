import { ErrorText } from "@eachbase/utils";

export const getRoleNameErrorText = (error, backError) => {
   if (error === "role") {
      return ErrorText.field;
   } else if (
      backError?.length &&
      backError[0]?.error === "A role with this title already exists"
   ) {
      return ErrorText.existenceError("A role with this title");
   } else {
      return "";
   }
};
