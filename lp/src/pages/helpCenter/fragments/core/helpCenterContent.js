import React from "react";

export const HelpCenterContent = ({ info }) => {
   return (
      <div className="help-center-content">
         {info.rows.map((row, index) => (
            <div
               key={index}
               className={`content-row ${row.subtitle ? "subcontent" : ""}`}
            >
               {row.subtitle && <p className="content-subtitle">{row.subtitle}</p>}
               <div className="content-title-box">
                  {row.icon && <img src={row.icon} alt={row.title} />}
                  <h6 className="content-title">{row.title}</h6>
               </div>
               <p className="content-text">{row.text}</p>
               {row.description && (
                  <div className="content-description">
                     <div className="description-screen">
                        <img src={row.description.image} alt={`${row.title}-screen`} />
                     </div>
                     <div className="description-details">
                        <h6 className="details-title">{row.description.details.title}</h6>
                        <div className="description-screen">
                           <img src={row.description.image} alt={`${row.title}-screen`} />
                        </div>
                        <ol className="details-list">
                           {row.description.details.detailList.map((detail, index) => (
                              <li key={index}>{detail}</li>
                           ))}
                        </ol>
                     </div>
                  </div>
               )}
            </div>
         ))}
      </div>
   );
};
