import React from "react";
import { loginFragments } from "./style";
import { Images } from "@eachbase/utils";

export const LoginHeader = () => {
  const classes = loginFragments();
  return (
    <div className={classes.LoginHead}>
      <div>
        <p>Wellness Daisy</p>
      </div>

      <div className={classes.LoginHeadPhoneNumber}>
        <a href={`tel:(818) 847-7331`}>
          <img src={Images.phone} alt={"Phone"} />
          <span>(818) 847-7331</span>
        </a>
      </div>
    </div>
  );
};
