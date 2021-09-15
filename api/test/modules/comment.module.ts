import axios from 'axios';
import { BASE_URL } from '../data';

export class CommentModule {
  static async createComment(comment, staffId) {
    comment.resource = staffId;
    const res = await axios.post(BASE_URL + 'comment', comment);
    return res.data;
  }
  static async editComment(comment, id) {
    const res = await axios.patch(BASE_URL + `comment${id}`, comment);
    return res.data;
  }
}
