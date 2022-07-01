import React from "react";

export const Card = ({ cardBackgroundColor, cardClassName, showGradient, children }) => {
   const cardContentClassName = `card ${cardClassName} ${
      showGradient ? "gradient-card" : ""
   }`;

   return (
      <div
         style={{ backgroundColor: cardBackgroundColor }}
         className={cardContentClassName}
      >
         <div className="card-content-container content-container">{children}</div>
      </div>
   );
};
