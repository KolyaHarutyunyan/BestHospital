import React from "react";

export const Card = ({ cardBackgroundColor, cardClassName, cardStyle, children }) => {
   return (
      <div
         style={{ backgroundColor: cardBackgroundColor, ...cardStyle }}
         className={`card ${cardClassName}`}
      >
         <div className="card-content-container content-container">{children}</div>
      </div>
   );
};
