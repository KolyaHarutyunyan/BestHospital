import React from "react";
import { featuresForProductiveMgmt, homeSecondBoxContentTitle } from "../constants";

export const FeaturesForProdMgmt = () => {
   return (
      <div className="home-second-box">
         <h2 className="content-title">{homeSecondBoxContentTitle}</h2>
         <div className="features-list-box">
            <div className="first-list-box">
               {featuresForProductiveMgmt.slice(0, 3).map((feature, index) => (
                  <div key={index} className="feature-card">
                     <img src={feature.featureIcon} alt={feature.featureTitle} />
                     <h5 className="feature-title">{feature.featureTitle}</h5>
                     <p className="feature-description">{feature.featureDescription}</p>
                  </div>
               ))}
            </div>
            <div className="second-list-box">
               {featuresForProductiveMgmt.slice(3, 6).map((feature, index) => (
                  <div key={index} className="feature-card">
                     <img src={feature.featureIcon} alt={feature.featureTitle} />
                     <h5 className="feature-title">{feature.featureTitle}</h5>
                     <p className="feature-description">{feature.featureDescription}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};
