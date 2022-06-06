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
