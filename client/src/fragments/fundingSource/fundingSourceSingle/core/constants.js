export function getHeaderTitlesForService() {
   return [
      {
         title: "Service",
         sortable: true,
      },
      {
         title: "CPT Code",
         sortable: false,
      },
      {
         title: "Unit Size",
         sortable: false,
      },
      {
         title: "Min Unit",
         sortable: false,
      },
      {
         title: "Max Unit",
         sortable: false,
      },
      {
         title: "Action",
         sortable: false,
      },
   ];
}

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

export function getModifierTypes() {
   return [0, 1];
}
