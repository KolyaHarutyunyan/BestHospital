import { errMessageStyle } from "./styles";

export const ErrMessage = ({ text, style, type }) => {
  const classes = errMessageStyle();

  return (
    <div
      style={{ ...style }}
      className={classes.errMessageLeftPosition}
      // className={ type ? classes.errMessageLeftPosition :  classes.errMessageCenterPosition }
    >
      <span className={classes.errMessageStyleText}>{text}</span>
    </div>
  );
};
