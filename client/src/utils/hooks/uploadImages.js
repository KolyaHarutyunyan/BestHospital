import axios from "axios";

export const ImgUploader = async (imgPush, many) => {
   const formData = new FormData();

   const endpoint =
      many === true
         ? `/files/uploadMany?includeThumbnail=true`
         : `/files/upload?includeThumbnail=true`;

   imgPush.length && imgPush.map((i) => formData.append("files", i));

   return await axios.post(endpoint, formData, { auth: true }).then((res) => {
      return res.data;
   });
};
