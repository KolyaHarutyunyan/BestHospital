import { errMessageStyle } from "./styles";

export const ErrMessage = ({ text, style }) => {
  const classes = errMessageStyle();

  return (
    <div
      style={{ ...style }}
      className={classes.errMessageLeftPosition}
    >
      <span className={classes.errMessageStyleText}>{text}</span>
    </div>
  );
};
