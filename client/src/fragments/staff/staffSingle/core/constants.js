import {
   ActiveInactiveStatusReverse,
   hooksForTable,
   makeCapitalize,
} from "@eachbase/utils";

export const staffTabsLabels = [
   { label: "General" },
   { label: "Employment" },
   { label: "Timesheet" },
   { label: "Credentials & Clearances" },
   { label: "Access" },
   { label: "Availability" },
   { label: "Services" },
   { label: "Notes" },
   { label: "History" },
];

export const staffHeaderTitles = [
   { title: "Date", sortable: true },
   { title: "Creator Name", sortable: true },
   { title: "Subject", sortable: false },
   { title: "Action", sortable: false },
];

export function getStaffGeneralInfo(info) {
   return [
      { title: "First Name", value: makeCapitalize(info?.firstName) },
      { title: "Middle Name", value: makeCapitalize(info?.middleName) },
      { title: "Last Name", value: makeCapitalize(info?.lastName) },
      { title: "Primary Email", value: info?.email },
      { title: "Secondary Email", value: info?.secondaryEmail },
      { title: "Primary Phone Number", value: info?.phone },
      { title: "Secondary Phone Number", value: info?.secondaryPhone },
      { title: "Status", value: ActiveInactiveStatusReverse(info?.status) },
   ].filter((item) => !!item.value);
}

export function getStaffAddressInfo(info) {
   return [
      { title: "Street Address", value: info?.address?.street },
      { title: "Country", value: info?.address?.country },
      { title: "City", value: info?.address?.city },
      { title: "State", value: info?.address?.state },
      { title: "Zip Code", value: info?.address?.zip },
   ].filter((item) => !!item.value);
}

export function getStaffOtherDetails(info) {
   return [
      { title: "Driver License", value: info?.license?.driverLicense },
      { title: "Issuing State", value: info?.license?.state },
      {
         title: "Expiration Date",
         value: hooksForTable.handleCreatedAtDate(info?.license?.expireDate),
      },
      { title: "Residency Status", value: makeCapitalize(info?.residency) },
      { title: "SSN Number", value: info?.ssn },
      { title: "Gender", value: info?.gender },
      {
         title: "Date of Birth",
         value: hooksForTable.handleCreatedAtDate(info?.birthday),
      },
   ].filter((item) => !!item.value);
}
