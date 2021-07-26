import {screensStyle} from "./styles";

export const Circle = ({back, number}) => {
    const classes = screensStyle()
    return (
        <div
            style={{background: back}}
            className={classes.circleStyle}
        >
            {number}
        </div>
    )
}