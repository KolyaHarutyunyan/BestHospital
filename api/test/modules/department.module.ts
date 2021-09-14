import axios from 'axios';
import { BASE_URL } from '../data';

export class DepartmentModule {
  static async createDepartment(department) {
      const res = await axios.post(BASE_URL + 'department', department);
      return res.data;
  }
  static async editDepartment(department, id) {
      const res = await axios.patch(BASE_URL + `department${id}`, department);
      return res.data;
  }
}
