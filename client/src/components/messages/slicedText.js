import {HtmlTooltip} from "./HtmlTool";
import React from "react";
import {errMessageStyle} from "./styles";

export const SlicedText = ({data, size, type, fontSize}) => {
    const globalText = errMessageStyle()

    const classType = type === 'name' ? globalText.nameEllipsis :
                       type === 'address' ? globalText.addressEllipsis :
                        type === 'email' ? globalText.emailEllipsis :
                         type === 'desc' ? globalText.desc :
                          type === 'responsive' ? globalText.responsive : ''
    return (
        <>
            {data && data.length > size ?
                <HtmlTooltip
                    title={<p>{data}</p>}
                    placement="top-end"
                >

                    {type === 'desc' ?
                        <span style={fontSize ? {fontSize:fontSize} : {}} className={classType}>
                            {data && `${data.slice(0, size)}...`}
                        </span>
                        :
                        <span className={classType}>
                            {data && `${data.slice(0, size)}...`}
                        </span>
                    }
                </HtmlTooltip>
                :
                type === 'desc' ?
                    <span style={fontSize ? {fontSize:fontSize} : {}}>{data}</span>
                    :
                <span className={classType}>{data}</span>
            }

        </>
    )
}
