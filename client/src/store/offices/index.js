import { clearOfficeById, createOffice, getOfficeById, getOffices, editOffice, activateOffice, inactivateOffice } from "./offices.action";

export { officeReducer } from './offices.reducer';
export { watchOffice } from './offices.saga';

export const officeActions = {
  createOffice,
  getOffices,
  getOfficeById,
  clearOfficeById,
  editOffice,

  activateOffice,
  inactivateOffice
}

