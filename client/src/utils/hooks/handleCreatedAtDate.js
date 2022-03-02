export const handleCreatedAtDate = (date = "", sliceSize = 10, joinBy = ".") =>
  date.slice(0, sliceSize).split("-").reverse().join(joinBy);
