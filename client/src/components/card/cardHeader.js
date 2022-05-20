import { cardStyle } from "./style";

export const CardHeader = ({ color, title, icon, hideHeaderLine }) => {
   const classes = cardStyle();

   return (
      <div className={classes.cardHeader}>
         <div
            className={classes.cardIcon}
            style={{ backgroundColor: color ? color : "gray" }}
         >
            <img src={icon} alt="g" />
         </div>
         <span className={classes.cardTitle}>{title}</span>
         {hideHeaderLine && (
            <span
               className={classes.topLine}
               style={{ backgroundColor: color ? color : "gray" }}
            />
         )}
      </div>
   );
};
