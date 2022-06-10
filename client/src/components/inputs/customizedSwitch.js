import React, { useState } from "react";
import { styled, Switch } from "@material-ui/core";

export const CustomizedSwitch = ({
   checked,
   handleClick,
   disabled = false,
   bgColor,
   checkedBgColor,
}) => {
   const AntSwitch = styled(Switch)(({ theme }) => ({
      width: 32,
      height: 16,
      padding: 0,
      display: "flex",
      "&:active": {
         "& .MuiSwitch-thumb": { width: 15 },
         "& .MuiSwitch-switchBase.Mui-checked": { transform: "translateX(16px)" },
      },
      "& .MuiSwitch-switchBase": {
         padding: 2,
         "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
               opacity: 1,
               backgroundColor:
                  theme.palette.mode === "dark"
                     ? `${bgColor || "#177ddc"}`
                     : `${checkedBgColor || "#1890ff"}`,
            },
         },
      },
      "& .MuiSwitch-thumb": {
         boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
         width: 12,
         height: 12,
         borderRadius: 6,
         transition: theme.transitions.create(["width"], { duration: 200 }),
      },
      "& .MuiSwitch-track": {
         borderRadius: 16 / 2,
         opacity: 1,
         backgroundColor:
            theme.palette.mode === "dark"
               ? `${checkedBgColor || "rgba(255,255,255,.35)"}`
               : `${bgColor || "rgba(0,0,0,.25)"}`,
         boxSizing: "border-box",
      },
   }));

   const [switchBool, setSwitchBool] = useState(false);

   const handleChange = () => {
      if (handleClick) {
         handleClick();
      } else {
         setSwitchBool((prevState) => !prevState);
      }
   };

   return (
      <AntSwitch
         inputProps={{ "aria-label": "ant design" }}
         checked={checked || switchBool}
         onClick={handleChange}
         disabled={disabled}
      />
   );
};
