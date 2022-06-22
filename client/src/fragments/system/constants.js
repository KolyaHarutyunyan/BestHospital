export const tabsLabels = [
   {
      label: "Service Types",
   },
   {
      label: "Credentials",
   },
   {
      label: "Departments",
   },
   {
      label: "Job Titles",
   },
   {
      label: "Payroll Setup",
   },
   {
      label: "Place of Service",
   },
];

export const credentialBtn = {
   maxWidth: "174px",
   width: "100%",
   flex: "0 0 174px",
   padding: 0,
};

export const credentialsList = [
   { name: "Degree" },
   { name: "Clearance" },
   { name: "Licence" },
];

export const checkType = (type) => {
   switch (type) {
      case "Degree":
         return 0;
      case "Clearance":
         return 1;
      case "Licence":
         return 2;

      default:
         return;
   }
};

export const convertType = (index) => {
   switch (index) {
      case 0:
         return "Degree";
      case 1:
         return "Clearance";
      case 2:
         return "Licence";

      default:
         return;
   }
};
