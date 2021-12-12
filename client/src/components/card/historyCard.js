import {cardStyle} from "./style";
import moment from 'moment';

export const HistoryCard = ({key, data}) => {
    let correctDate = moment(data._id).format('dddd, MMMM DD, YYYY')
    const classes = cardStyle()

    return (
        <div className={classes.historyCardStyle} key={key}>
            <p className={classes.historyCardDateStyle}>{correctDate}</p>
            {data && data.data &&
               data.data.map((i,j) =>(
                   <div key={j} className={classes.historyCardBoxStyle}>
                       <p className={classes.historyCardBoxTimeStyle}>{i.time}</p>
                       <p>{i.title}</p>
                   </div>
               ))

            }
        </div>
    )
}