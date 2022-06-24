export const getSkipCount = (pageNumber = 0, limitNumber = 0) => {
   return pageNumber <= 1 ? 0 : (pageNumber - 1) * limitNumber;
};
