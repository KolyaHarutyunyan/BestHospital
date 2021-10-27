import {useSelector} from "react-redux";

export const FindLoad =(status) =>{
    const {httpOnLoad} = useSelector((state) => ({
        httpOnLoad: state.httpOnLoad
    }));
    console.log(httpOnLoad,'asdasdasd')
    return httpOnLoad && httpOnLoad.length && httpOnLoad.filter((i) => i === status)

}