import {useEffect} from "react";
import {httpRequestsOnSuccessActions, httpRequestsOnErrorsActions} from "@eachbase/store";
import {useDispatch} from "react-redux";
export const ErrorSuccess =({success, fail, text, info})=>{
const dispatch = useDispatch()

    useEffect(() => {
        if(success.length) {
            setTimeout(() => dispatch(httpRequestsOnSuccessActions.removeSuccess(type[0].type)), 3000);
        }else if(fail){
            setTimeout(() => dispatch(httpRequestsOnErrorsActions.removeError(type[0].type)), 3000);
        }
    }, []);



    return(
        <div style={{width:'300px',height:'300px',background:'red'}}>

            { text }
        </div>
    )
}