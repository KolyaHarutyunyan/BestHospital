export function getHeaderTitlesForModifier() {
   return [
      {
         title: "Modifier",
         sortable: false,
      },
      {
         title: "Credential",
         sortable: false,
      },
      {
         title: "Charge Rate",
         sortable: false,
      },
      {
         title: "Type",
         sortable: false,
      },
      {
         title: "Action",
         sortable: false,
      },
   ];
}

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

export function getModifierTypes() {
   return [0, 1];
}
