import axios from 'axios';
import { BASE_URL } from '../data';

export class StaffModule {
  static async createStaff(staff) {
    const res = await axios.post(BASE_URL + 'staff', staff);
    return res.data;
  }
  static async editStaff(staff, id) {
    const res = await axios.patch(BASE_URL + `staff/${id}`, staff);
    return res.data;
  }
}
