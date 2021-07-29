// import React, {useState} from "react";
// import { CreateFundingSource } from "./core";
// import { CreateWrapper } from "@eachbase/components";
// import { Images, useGlobalStyles } from "@eachbase/utils";
//
// export const CreateStaffTable = ({ }) => {
//   const globalStyle = useGlobalStyles();
//   const [name, setName] = useState('')
//   return (
//     <div>
//       <CreateWrapper
//         head={
//               <div className={globalStyle.createOfficeTableHead}>
//                 <img src={Images.officeFillBold} alt={"Office"} />
//                 <p>{name ? name : 'OFFICE NAME'}</p>
//               </div>
//         }
//         body={
//           <CreateFundingSource
//             handleChangeName ={setName}
//           />
//         }
//         parentLink={'/fundingSource'}
//         parent={'Office'}
//         child={'Create Office'}
//       />
//     </div>
//   );
// };