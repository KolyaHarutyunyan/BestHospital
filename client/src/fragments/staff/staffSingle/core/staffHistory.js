import {HistoryCard} from '@eachbase/components';

export const StaffHistory = () => {
    let data = [
        {
            date: '2021-07-28T16:20:30.602Z',
            funderId: '610183a4dcc59c21f0792c35',
            id: '610183cedcc59c21f0792c37',
            time: '8:20 pm',
            title: 'create a new staff',

        },{
            date: '2021-07-28T16:24:00.776Z',
            funderId: '610183a4dcc59c21f0792c35',
            id: '610184a0dcc59c21f0792c3a',
            time: '8:24 pm',
            title: 'update a new system'
        }
    ]
    return(
        <div style={{marginTop: 50}}>
            {data && data.map((item,index)=>{
                return(
                    <HistoryCard key={index} data={item} />
                )
            })}
        </div>
    )
}