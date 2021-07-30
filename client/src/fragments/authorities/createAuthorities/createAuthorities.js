import React from "react";
import { createAuthoritiesStyle, CreateAuthoritiesInputs } from "./core";
import { CreateWrapper } from "@eachbase/components";
import { Images, useGlobalStyles, useGlobalText } from "@eachbase/utils";

export const CreateAuthorities = ({ }) => {

  const globalStyle = useGlobalStyles();
  return (
    <div>
      <CreateWrapper
        head={
              <div className={globalStyle.createOfficeTableHead}>
                <img src={Images.authorityBlueFill} alt={"authorityBlueFill"} />
                <p>{'MC AUTHORITY NAME'}</p>
              </div>
        }
        body={
          <CreateAuthoritiesInputs/>
        }
        parentLink={'/authorities'}
        parent={'MC Authorities'}
        child={'Add MC Authority'}
      />
    </div>
  );
};
