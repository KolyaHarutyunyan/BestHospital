import {scheduleStyle} from "./styles";


export const Card =({borderType, openModal}) =>{
    const classes = scheduleStyle()
    const border = borderType === 'Rendered' ? '#6FD231' :  borderType === 'Cancelled' ? '#A3B2BD' : borderType === 'Pending' ? '#347AF080' : borderType === 'Completed' ? '#347AF0' :  borderType === 'Not Rend...' ? '#6FD23180' : ''
    return(
        <div onClick={openModal} style={{borderRight:`8px solid ${border}`}} className={classes.cardItemWrapper}>
        <div  className={classes.cardItem}>
            <p>09:00 AM - 11:00 AM</p>
            <p>Alice Joh...</p>
            <p>John Smith</p>
            <p>Service A...</p>
            <p>Rendered</p>
        </div>
        </div>
    )
}