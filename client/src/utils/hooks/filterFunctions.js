import { paginate } from "./paginate";

export const filterByFirstName = (query, data) => {
  return paginate( data.filter((el) => el.firstName.toLowerCase().indexOf(query.toLowerCase()) > -1),10)
};