import {useSelector} from "react-redux";



export const FindSuccess =(status) =>{
    const {httpOnSuccess} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess
    }));
   return httpOnSuccess && httpOnSuccess.length && httpOnSuccess.filter((i) => i.type === status)

}