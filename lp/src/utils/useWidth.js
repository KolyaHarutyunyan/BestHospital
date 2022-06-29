import { useCallback, useEffect, useState } from "react";

export const useWidth = () => {
   const [width, setWidth] = useState(window?.innerWidth);

   const onResize = useCallback(() => {
      setWidth(window?.innerWidth);
   }, []);

   useEffect(() => {
      window.addEventListener("resize", onResize);
      return () => {
         window.removeEventListener("resize", onResize);
      };
   }, []);
   return width;
};
