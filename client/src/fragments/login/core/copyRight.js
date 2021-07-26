import React from "react";
import { loginFragments } from "./style";

export const CopyRight = ({}) => {
  const classes = loginFragments();
  return (
    <p className={classes.CopyRight}>
        Copyright © 2021 Wellness Daisy. All Rights Reserved.
    </p>
  );
};
