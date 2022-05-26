import { errMessageStyle } from "./styles";

export const ErrMessage = ({ text }) => {
   const classes = errMessageStyle();

   return <span className={classes.errMessageStyleText}>{text}</span>;
};
