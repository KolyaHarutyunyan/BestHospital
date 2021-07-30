import { useSelector } from "react-redux";

export const RoleHooks = ( elementPermission ) => {



  const { permissions } = useSelector((state) => ({
     permissions: state.auth.permissions,
   }));

    const userPermission = [
    {id : 40 },
    {id : 3 },
    {id : 9 }
  ]
  // permissions ? permissions : localStorage.getItem('permissions')

   for(let i of userPermission){

     if(i.id === elementPermission){
       return true
     }

   }
}