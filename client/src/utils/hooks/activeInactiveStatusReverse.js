export const ActiveInactiveStatusReverse = (status) => {
   return status === "ACTIVE"
      ? "Active"
      : status === "INACTIVE"
      ? "Inactive"
      : status === "HOLD"
      ? "On Hold"
      : status === "TERMINATE"
      ? "Terminated"
      : "";
};
