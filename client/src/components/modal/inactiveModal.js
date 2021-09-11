import React, {useEffect, useState} from "react";
import {modalsStyle} from "./styles";
import {Colors, ErrorText, useGlobalTextStyles} from "@eachbase/utils";
import {AddModalButton, CloseButton} from "../buttons";
import {ValidationInput, Textarea} from "../inputs";
import {useDispatch, useSelector} from "react-redux";
import {fundingSourceActions, httpRequestsOnErrorsActions, httpRequestsOnSuccessActions} from "../../store";
import {useParams} from "react-router-dom";

export const InactiveModal = ({handleOpenClose, info}) => {
    const classes = modalsStyle()
    const globalText = useGlobalTextStyles()
    const params = useParams()
    const [activeOrInactive, setActiveOrInactive ] = useState(info?.status ===1 ? 'inactivate'  : 'activate')
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState({});
    const dispatch = useDispatch()
    const { httpOnSuccess, httpOnError,httpOnLoad } = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));
    const errorText = httpOnError.length && httpOnError[0].error
    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_ACTIVE_OR_INACTIVE'

    const inactivateButtonStyle = {
        backgroundColor: activeOrInactive ==="activate" ? Colors.BackgroundBlue : Colors.ThemeRed,
    }

    const handleChange = e => setInputs(
        prevState => ({...prevState, [e.target.name]: e.target.value}),
        error === e.target.name && setError(''),
    );


    const handleCreate = () => {
        const data = {
            "date": inputs.date,
            "reason": inputs.reason,
        }
        if (inputs.date && inputs.reason ) {
                dispatch(fundingSourceActions.editActiveOrInactive(params.id, info.path, activeOrInactive, data , info.type))
        } else {
            setError(
                !inputs.date ? 'date' :
                    !inputs.reason ? 'reason' :
                                        'Input is not field'
            )
        }
    }





    useEffect(()=>{
        if (success){
            handleOpenClose()
            dispatch(httpRequestsOnSuccessActions.removeSuccess('EDIT_ACTIVE_OR_INACTIVE'))
        }

    },[success])







    return (
        <div className={classes.inactiveModalBody}>
            <h1 className={`${globalText.modalTitle}`}>Inactivate Name Surname?</h1>
            <div className={classes.positionedButton}>
                <CloseButton handleCLic={handleOpenClose}/>
            </div>
            <p className={classes.inactiveModalInfo}>Name Surname will be notified about the inactivation reason after
                inactivation.</p>
            <ValidationInput
                variant={"outlined"}

                onChange={handleChange}
                 value={inputs.date}
                type={"date"}
                label={"Inactivation Date*"}
                name='date'
                 typeError={error === 'date' && ErrorText.field}
            />
            <Textarea
                value={inputs.reason}
                maxRows={6}
                variant={"outlined"}
                onChange={handleChange}
                label={"Write inactivation reason here..."}
                name='reason'
                 typeError={error === 'reason' && ErrorText.field}
            />
            <AddModalButton
                btnStyles={inactivateButtonStyle}
                text={activeOrInactive}
                handleClick={handleCreate}
                loader={ httpOnLoad.length > 0}
            />
        </div>
    );
}
