import React from "react";
import { InView } from "react-intersection-observer";

export const ScrollWrapper = ({ className, children, onChange, ...props }) => {
  return (
    <InView  
      {...props} 
      className={`scroll-wrapper ${className}`} 
      onChange={onChange}>
        {children}
    </InView>
  );
};
