import React from "react";

export const Card = ({ cardBackgroundColor, cardClassName, children }) => {
   return (
      <div
         style={{ backgroundColor: cardBackgroundColor }}
         className={`card ${cardClassName}`}
      >
         <div className="card-content-container content-container">{children}</div>
      </div>
   );
};
