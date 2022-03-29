import { isNotEmpty } from "@eachbase/utils";

export const getPhoneErrorText = (phoneNum = "") => {
   if (isNotEmpty(phoneNum.toString())) {
      return phoneNum.toString().trim().length < 10
         ? "At least 10 digits"
         : /[a-zA-Z]/g.test(phoneNum)
         ? "Invalid phone number"
         : "";
   }
};
