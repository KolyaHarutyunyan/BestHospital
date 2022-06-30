import React from "react";

export const LightCard = ({ children }) => {
   return (
      <div className="light-card">
         <div className="light-card-content-container content-container">{children}</div>
      </div>
   );
};
