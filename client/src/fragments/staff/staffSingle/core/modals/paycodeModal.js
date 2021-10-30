import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";
import {Checkbox} from "@material-ui/core";
import {Colors, ErrorText} from "@eachbase/utils";
import {adminActions, httpRequestsOnErrorsActions, httpRequestsOnSuccessActions} from "@eachbase/store";
import {payrollActions} from "@eachbase/store/payroll";
import {createClientStyle} from "@eachbase/fragments/client";
import {staffModalsStyle} from "./styles";
import moment from "moment";



export const PaycodeModal = ({handleClose, info,employmentId}) => {
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(info ? {
        "employmentId": info.employmentId,
        "payCodeTypeId": info?.payCodeTypeId?._id,
         "rate": +info?.rate,
         "active": info?.active,
         "startDate": moment(info.startDate).format('YYYY-MM-DD'),
         "endDate":  moment(info.startDate).format('YYYY-MM-DD')
    }
    : {});
    const [checked, setChecked] = useState(info ? info.active : true);
    const [payCode, setPayCode] = useState(null);
    const dispatch = useDispatch()
    const classes = createClientStyle()
    const classes_v2 = staffModalsStyle()
    const globalPayCodes = useSelector(state => state.payroll.PayCodes)

    useEffect(() => {
        dispatch(payrollActions.getPayCodeGlobal())
    }, []);

    const {httpOnSuccess, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnLoad: state.httpOnLoad,
    }));

    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'CREATE_PAY_CODE'
    const successEdit = httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_PAY_CODE'

    useEffect(() => {
        if (success) {
            handleClose()
            dispatch(httpRequestsOnSuccessActions.removeSuccess('CREATE_PAY_CODE'))
            dispatch(httpRequestsOnErrorsActions.removeError('GET_CLIENT_AUTHORIZATION'))
        }
    }, [success])

    useEffect(() => {
        if (successEdit) {
            handleClose()
            dispatch(httpRequestsOnSuccessActions.removeSuccess('EDIT_PAY_CODE'))
            dispatch(httpRequestsOnErrorsActions.removeError('GET_CLIENT_AUTHORIZATION'))
        }
    }, [successEdit])

    useEffect(()=>{
        if (info){
            setPayCode(globalPayCodes.find(item => item.name === info.payCodeTypeId.name))
        }
    },[])


    const handleChange = e => {
        if (e.target.name === 'payCodeTypeId') {
            setPayCode(globalPayCodes.find(item => item.name === e.target.value))
        }
        setInputs(
            prevState => ({...prevState, [e.target.name]: e.target.value}),
            error === e.target.name && setError(''),
        )
    };

    let onCheck  = (e)=>{
        setChecked(e.target.checked)
       
    }

    const handleCreate = () => {
        if (inputs.rate && inputs.payCodeTypeId && inputs.startDate && checked ? "Present" : inputs.endDate ) {
            const data = {
                "employmentId": employmentId,
                "payCodeTypeId": payCode?.id,
                "rate": +inputs.rate,
                "active": checked,
                "startDate": inputs.startDate,
                "endDate":  inputs.endDate ? inputs.endDate : undefined,
                'name' : inputs.payCodeTypeId
            }
            if (!info){
                dispatch(adminActions.createPayCode(data, employmentId))
            }else {
                dispatch(adminActions.editPayCode(data, employmentId, info.id))
            }
        }
         else {
            setError(
                !inputs.payCodeTypeId ? 'payCodeTypeId' :
                    !inputs.rate ? 'rate' :
                        !inputs.startDate ? 'startDate' :
                            !inputs.endDate ? 'endDate' :
                                'Input is not field'
            )
        }
    }

    return (
        <div className={classes.createFoundingSource}>
            <ModalHeader
                handleClose={handleClose}
                title={info ? "Edit Time" : 'Add a New Paycode'}
                text={!info && 'Please fulfill the below fields to add a paycode.'}
            />
            <div className={classes.createFoundingSourceBody}>
                <div className={classes.clientModalBlock}>
                    <div className={classes.clientModalBox}>
                        <SelectInput
                            name={"payCodeTypeId"}
                            label={"Name"}
                            handleSelect={handleChange}
                            value={info ? info?.payCodeTypeId?.name : inputs.payCodeTypeId}
                            list={globalPayCodes}
                            typeError={error === 'payCodeTypeId' ? ErrorText.field : ''}
                        />
                        <div className={classes.displayCodeBlock}>
                            <div className={classes_v2.paycodeBox} >
                                <p className={classes_v2.paycodeBoxTitle}>Code:</p>
                                <p className={classes_v2.paycodeBoxText}> {payCode?.code ? payCode.code : ' N/A'} </p>
                            </div>
                            <div className={classes_v2.paycodeBox} style={{marginBottom : 0}}>
                                <p className={classes_v2.paycodeBoxTitle}>Type:</p>
                                <p className={classes_v2.paycodeBoxText}>{payCode?.type ? payCode.type : 'N/A'}</p>
                            </div>
                        </div>
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            value={inputs.rate}
                            type={"number"}
                            label={"Rate*"}
                            name='rate'
                            typeError={error === 'rate' && ErrorText.field}
                        />
                        <div className={classes_v2.paycodeBox}>
                            <Checkbox  style={{color:Colors.BackgroundBlue}} defaultChecked={checked} onClick={onCheck} color={Colors.ThemeBlue} />
                            <p className={classes_v2.activePaycode}>Active Paycode</p>
                        </div>
                        <div style={{display: 'flex'}}>
                            <ValidationInput
                                variant={"outlined"}
                                onChange={handleChange}
                                value={inputs.startDate}
                                type={"date"}
                                label={"Start Date*"}
                                name='startDate'
                                typeError={error === 'startDate' && ErrorText.field}
                            />
                            <div style={{width: 16}}/>
                            <ValidationInput
                                variant={"outlined"}
                                disabled={checked ?  true : false}
                                onChange={handleChange}
                                value={checked ? 'Present' : inputs.endDate}
                                type={checked ? 'text' :"date"}
                                label={"End Date*"}
                                name='endDate'
                                typeError={error === 'endDate' && ErrorText.field}
                            />
                        </div>
                    </div>
                </div>
                <div className={classes.clientModalBlock}>
                    <CreateChancel
                        loader={httpOnLoad.length > 0}
                        create={info ? "Save" : 'Add'}
                        chancel={"Cancel"}
                        onCreate={handleCreate}
                        onClose={handleClose}
                        buttonWidth='224px'
                    />
                </div>
            </div>
        </div>
    );
};
