import { ActiveInactiveStatusReverse, makeCapitalize, manageType } from "@eachbase/utils";

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

export function getFundingSourceGeneralInfo(info) {
   return [
      { title: "Name", value: makeCapitalize(info?.name) },
      { title: "Email Address", value: info?.email },
      { title: "Phone Number", value: info?.phoneNumber },
      { title: "Status", value: ActiveInactiveStatusReverse(info?.status) },
   ].filter((item) => !!item.value);
}

export function getFundingSourceContactInfo(info) {
   return [
      { title: "Type", value: manageType(info?.type) },
      { title: "Contact Person", value: info?.contact },
      { title: "Website", value: info?.website },
   ].filter((item) => !!item.value);
}

export function getFundingSourceAddressInfo(info) {
   return [
      { title: "Street Address", value: info?.address?.street },
      { title: "Country", value: info?.address?.country },
      { title: "City", value: info?.address?.city },
      { title: "State", value: info?.address?.state },
      { title: "Zip Code", value: info?.address?.zip },
   ].filter((item) => !!item.value);
}
