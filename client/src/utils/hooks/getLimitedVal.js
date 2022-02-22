export const getLimitedVal = (val = "", limit = 10) =>
  val.trim().length > limit ? `${val.slice(0, limit)} ...` : val;
