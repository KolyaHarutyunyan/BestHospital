import React from "react";

export const DarkCard = ({ children }) => {
   return (
      <div className="dark-card">
         <div className="dark-card-content-container content-container">{children}</div>
      </div>
   );
};
