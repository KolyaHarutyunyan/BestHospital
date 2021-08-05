import {cardStyle} from "./style";
import moment from 'moment'


export const HistoryCard = ({data}) => {

    let correctDate = moment(data.date).format('dddd, MMMM DD, YYYY')
    const classes = cardStyle()

    return (
        <div className={classes.historyCardStyle}>
            <p className={classes.historyCardDateStyle}>{correctDate}</p>
            <div className={classes.historyCardBoxStyle}>
                <p className={classes.historyCardBoxTimeStyle}>{data.time}</p>
                <p>{data.title}</p>
            </div>
        </div>
    )
}