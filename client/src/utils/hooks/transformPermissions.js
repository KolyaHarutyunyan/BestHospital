export const transformPermission = (permission = "") => {
   return permission === "SUPER_ADMIN"
      ? "Super Admin"
      : permission === "STAFF"
      ? "Staff"
      : permission === "USER"
      ? "User"
      : permission === "CLIENT"
      ? "Client"
      : permission;
};
