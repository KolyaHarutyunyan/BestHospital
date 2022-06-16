export const getAuthStatusDisplay = (givenInfo) => {
   const _today = new Date().getTime();
   const _endDate = new Date(givenInfo?.endDate).getTime();

   const _authIsInactive = _today > _endDate;

   return _authIsInactive ? "INACTIVE" : "ACTIVE";
};
