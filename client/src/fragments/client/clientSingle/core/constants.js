export const headerTitles = [
   {
      title: "Service Code",
      sortable: false,
   },
   {
      title: "Modifiers",
      sortable: false,
   },
   {
      title: "Total Units",
      sortable: false,
   },
   {
      title: "Completed Units",
      sortable: false,
   },
   {
      title: "Available Units",
      sortable: false,
   },
   {
      title: "Percent Utilization",
      sortable: false,
   },
   {
      title: "Action",
      sortable: false,
   },
];

export const clientEnrollmentHeaderTitles = [
   { title: "Primary", sortable: false },
   { title: "Funding Source", sortable: true },
   { title: "Client ID", sortable: false },
   { title: "Start Date", sortable: true },
   { title: "Terminated...", sortable: true },
   { title: "Action", sortable: false },
];

export function getGeneralInfo(info) {
   return [
      { title: "First Name", value: info?.firstName },
      { title: "Middle Name", value: info?.middleName },
      { title: "Last Name", value: info?.lastName },
      { title: "Code", value: info?.code },
   ].filter((item) => !!item.value);
}
