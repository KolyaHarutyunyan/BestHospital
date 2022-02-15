import React from "react";
import {scheduleStyle} from "./styles";
import moment from "moment";
import {SlicedText} from "@eachbase/components";

export const Card = ({openModal, info, style}) => {
    const classes = scheduleStyle()
    const border =
        info.eventStatus === 'RENDERED' ? '#6FD231' :
            info.eventStatus === 'CANCELLED' ? '#A3B2BD' :
                info.eventStatus === 'PENDING' ? '#347AF080' :
                    info.eventStatus === 'COMPLETED' ? '#347AF0' :
                        info.eventStatus === 'NOTRENDERED' ? '#6FD23180' : ''

    return (
        <div className={classes.hoverClass}>
            <div
                onClick={() => openModal(info)} style={style ? {
                borderRight: `8px solid ${border}`,
                background: '#EBF2FD80 0% 0% no-repeat padding-box',
            } : {borderRight: `8px solid ${border}`}}
                className={classes.cardItemWrapper}>
                <div className={classes.cardItem}>
                    <p>{`${moment(info?.startDate).format('HH:mm A')} - ${moment(info?.endTime).format('HH:mm A')}`}</p>
                    <p>
                        <SlicedText
                            size={10}
                            type={'name'}
                            data={info && info.staff ? `${info.staff[0].firstName} ${info.staff[0].lastName}` : ''}
                        />
                    </p>
                    <p>
                        <SlicedText
                            size={10}
                            type={'name'}
                            data={info && info.client.length ? `${info.client[0].firstName} ${info.client[0].lastName}` : 'Not set'}
                        />
                    </p>
                    <p style={{width:'55px '}}>

                        {info &&
                           info.type === 'DRIVE' ? 'Drive' :
                           info.type === 'PAID' ? 'Paid' :
                           info.type === 'BREAK' ? 'Break' :
                           info.type === 'SERVICE' ? 'Service' : ''
                        }
                    </p>
                    <p style={{width:'105px'}}>
                        {info.eventStatus &&
                        info.eventStatus === 'RENDERED' ? 'Rendered' :
                            info.eventStatus === 'CANCELLED' ? 'Cancelled' :
                                info.eventStatus === 'PENDING' ? 'Pending' :
                                    info.eventStatus === 'COMPLETED' ? 'Completed' :
                                        info.eventStatus === 'NOTRENDERED' ? 'Not Rendered' : ''

                        }
                    </p>
                </div>
            </div>
        </div>
    )
}