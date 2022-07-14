import React from "react";
import { Images } from "assets";
import { knowledgeBaseSubtitle, knowledgeBaseTitle } from "../constants";

export const KnowledgeBase = ({ className }) => {
   return (
      <div className={`knowledge-base ${className}`}>
         <div className="knowledge-base-title-subtitle-box">
            <h3 className="knowledge-base-title">{knowledgeBaseTitle}</h3>
            <p className="knowledge-base-subtitle">{knowledgeBaseSubtitle}</p>
         </div>
         <img
            src={Images.Knowledge}
            alt="knowledge-icon"
            className="knowledge-base-icon"
         />
      </div>
   );
};
