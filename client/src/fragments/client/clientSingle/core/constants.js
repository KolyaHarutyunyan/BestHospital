import { ActiveInactiveStatusReverse, makeCapitalize } from "@eachbase/utils";
import moment from "moment";

export const contactHeaderTitles = [
   {
      title: "First Name",
      sortable: true,
   },
   {
      title: "Last Name",
      sortable: true,
   },
   {
      title: "Relationship",
      sortable: false,
   },
   {
      title: "Address",
      sortable: true,
   },
   {
      title: "Phone Number",
      sortable: false,
   },
   {
      title: "Action",
      sortable: false,
   },
];

export function getGeneralInfo(info) {
   return [
      { title: "First Name", value: makeCapitalize(info?.firstName) },
      { title: "Middle Name", value: makeCapitalize(info?.middleName) },
      { title: "Last Name", value: makeCapitalize(info?.lastName) },
      { title: "Code", value: info?.code },
      {
         title: { first: "Status", second: "Reason" },
         value: {
            first: ActiveInactiveStatusReverse(info?.status),
            second: info?.termination?.reason,
         },
      },
   ].filter((item) => !!item.value);
}

export function getOtherDetails(info) {
   return [
      { title: "Gender", value: info?.gender },
      {
         title: "Date of Birth",
         value: info?.birthday && moment(info?.birthday).format("DD/MM/YYYY"),
      },
      {
         title: "Age",
         value:
            info?.birthday &&
            new Date().getFullYear() - new Date(info.birthday).getFullYear(),
      },
      { title: "Ethnicity", value: info?.ethnicity },
      { title: "Language", value: info?.language },
      { title: "Family Language", value: info?.familyLanguage },
   ].filter((item) => !!item.value);
}
