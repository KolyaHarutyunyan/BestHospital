import React from "react";

export const GradientCard = ({ children }) => {
   return (
      <div className="gradient-card">
         <div className="gradient-card-content-container content-container">
            {children}
         </div>
      </div>
   );
};
