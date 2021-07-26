import { screensStyle } from "./styles";

export const TableNumbers = ({ color, number }) => {
  const classes = screensStyle();
  return (
    <div className={classes.numbersWrapper}>
      <div className={classes.numberStyle} style={{ background: color }}>
        {number}
      </div>
      <div className={classes.dashedLine} />
    </div>
  );
};
