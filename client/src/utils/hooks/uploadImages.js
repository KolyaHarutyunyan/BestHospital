// import axios from "axios";
// import { useState } from "react";
// ​
// export const ImgUploader = async (imgPush, many) =>{
//     const formData = new FormData();
//     const endpoint =
//         many === true ? `/files/uploadMany?includeThumbnail=true` : `/files/upload?includeThumbnail=true`;
//     imgPush.length && imgPush.map((i) => formData.append('files', i));
//     return await axios.post(endpoint, formData, { auth: true })
//                 .then((res) => {return res.data;})
// }

// const [imagePuh, setImgPush] = useState([])

// const handleFileChange = (e) => {
//    for (let item of e) {
//        if (item && item.size > 2097152) {
//            setError(true);
//        } else {
//            setError('');
//            setImgPush( [...imgPush, new File([item], `img1`] ));
//        }
//    }
// };

// const upload = await ImgUploader(imgPush).then(res => res)
