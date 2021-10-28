import {useSelector} from "react-redux";

export const FindLoad =(status) =>{
    const {httpOnLoad} = useSelector((state) => ({
        httpOnLoad: state.httpOnLoad
    }));
    return httpOnLoad && httpOnLoad.length && httpOnLoad.filter((i) => i === status)

}