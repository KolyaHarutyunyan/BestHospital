import {HistoryCard} from '@eachbase/components';
import {useSelector} from "react-redux";

export const StaffHistory = ({data}) => {

    const {httpOnError} = useSelector((state) => ({
            httpOnError: state.httpOnError
        })
    )

    let errorMessage = httpOnError.length && httpOnError.filter(param => param.error === 'History with this id was not found')

    return(
        <div style={{marginTop: 50}}>
            {
                errorMessage ? <p>sdfdslf</p> : data && data.map((item,index)=>{
                    return(
                        <HistoryCard key={index} data={item} />
                    )
                })
            }
        </div>
    )
}