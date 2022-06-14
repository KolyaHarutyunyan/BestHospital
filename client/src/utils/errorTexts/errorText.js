export const ErrorText = {
   field: "Input is not field",
   globalError: "Inputs are not field",
   emailValid: "Not valid email",
   passwordValid: "Not valid password",
   selectField: "One of the options must be selected",
   dateError: "End Date must be greater than Start Date",
   timeError: "End Time must be greater than Start Time",
   startDateError: "Start Date cannot be in the future, if you currently work!",
   overlappingError: (value = "") => `${value} cannot overlap, please change the date!`,
   phoneError: "Phone number must be a valid phone number",
   emailError: "User already exists",
   equalityError: (min, max) => `${min} must be smaller than ${max}`,
   websiteError: "Invalid Website",
   existenceError: (value = "") => `${value} already exists`,
   enrollmentError: "Can not be two active Enrollment with the same Funding Source",
   availableModifierError: "Please select some modifier",
   authServiceDefaultError: "Can not be two authorization service without the modifiers",
};
