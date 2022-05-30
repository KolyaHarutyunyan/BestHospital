export const ErrorText = {
   field: "Input is not field",
   globalError: "Inputs are not field",
   emailValid: "Not valid email",
   passwordValid: "Not valid password",
   selectField: "One of the options must be selected",
   dateError: "End Date must be greater than Start Date",
   timeError: "End Time must be greater than Start Time",
   startDateError: "Start Date cannot be chosen for the future, if you currently work!",
   overlappingError: (value = "") => `${value} cannot overlap, please change the date!`,
};
