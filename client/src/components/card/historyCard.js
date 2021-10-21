import {cardStyle} from "./style";
import moment from 'moment';

export const HistoryCard = ({key, data}) => {
    console.log(data,'datatatata');
    let correctDate = moment(data.createdDate).format('dddd, MMMM DD, YYYY')
    const classes = cardStyle()

    return (
        <div className={classes.historyCardStyle} key={key}>
            <p className={classes.historyCardDateStyle}>{correctDate}</p>
            <div className={classes.historyCardBoxStyle}>
                <p className={classes.historyCardBoxTimeStyle}>{data.time}</p>
                <p>{data.title}</p>
            </div>
        </div>
    )
}