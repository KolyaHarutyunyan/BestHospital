import { isNotEmpty } from "@eachbase/utils";

export const checkWebsite = (website = "") => {
   if (!isNotEmpty(website)) return;

   const HTTP_KEYWORD = "http://";

   return website.startsWith(HTTP_KEYWORD) ? website : `${HTTP_KEYWORD}${website}`;
};
