import React from "react";
import { sectionStyle } from "./styles";
import { Circle } from "../screens";
import { useGlobalText } from "@eachbase/utils";

export const CircleAndTitle =({back,number,title})=>{

    const classes = sectionStyle()
    const globalStyle = useGlobalText();
    return(
        <div className={classes.circleAndTitleWrapper} style={{display:'flex', alignItems:'center',marginTop:'16px'}}>
            <Circle number={number} back={back}/>
            <p className={globalStyle.title}>{title}</p>
        </div>
    )
}