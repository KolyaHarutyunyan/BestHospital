import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ValidationInput, SelectInput, CreateChancel, ModalHeader, Textarea} from "@eachbase/components";
import {Checkbox} from "@material-ui/core";
import {Colors, ErrorText} from "@eachbase/utils";
import {adminActions, httpRequestsOnErrorsActions, httpRequestsOnSuccessActions} from "@eachbase/store";
import {payrollActions} from "@eachbase/store/payroll";
import {createClientStyle} from "@eachbase/fragments/client";
import {staffModalsStyle} from "./styles";
import {useParams} from "react-router-dom";
import moment from "moment";

export const TimesheetModal = ({handleClose, info, allPaycodes}) => {

    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(info ? {...info,
        startDate :  moment(info.startDate).format('YYYY-MM-DD') ,
        endDate :  moment(info.endDate).format('YYYY-MM-DD'),
        payCode : allPaycodes.find(item=> item?.payCodeTypeId.name === info.payCode.payCodeTypeId.name ).payCodeTypeId.name
    }
        : {});
    const [checked, setChecked] = useState(true);
    const [payCode, setPayCode] = useState(null);
    const [newallPaycodes, setnewallPaycodes] = useState([]);
    const dispatch = useDispatch()
    const classes = createClientStyle()
    const classes_v2 = staffModalsStyle()
    const globalPayCodes = useSelector(state => state.payroll.PayCodes)





const params = useParams()

    useEffect(() => {
        dispatch(payrollActions.getPayCodeGlobal())
    }, []);

    useEffect(()=>{
        setnewallPaycodes(allPaycodes.map(item=>{
            return {
                id : item.id,
                name : item.payCodeTypeId.name
            }
        }))
    },[])



    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));

    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'CREATE_PAY_CODE'

    useEffect(() => {
        if (success) {
            handleClose()
            dispatch(httpRequestsOnSuccessActions.removeSuccess('CREATE_PAY_CODE'))
            dispatch(httpRequestsOnErrorsActions.removeError('GET_CLIENT_AUTHORIZATION'))
        }
    }, [success])


    const handleChange = e => {
        if (e.target.name === 'payCode') {
            setPayCode(allPaycodes.find(item => item.payCodeTypeId.name === e.target.value))

            // setPayCode(allPaycodes.find(item => item.name === e.target.value))

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
        if (inputs.description && inputs.hours && inputs.startDate && checked ? "Present" : inputs.endDate ) {
            const data = {
                "staffId": params.id,
                "payCode":  payCode.id,
                "description": inputs.description,
                "hours": inputs.hours,
                "startDate": inputs.startDate,
                "endDate": inputs.endDate ? inputs.endDate : undefined
            }
            if (info){
                dispatch(adminActions.createTimesheet(data))
            }else {
                dispatch(adminActions.createTimesheet(data))
            }
        }
        else {
            setError(
                !inputs.payCode ? 'payCode' :
                    !inputs.hours ? 'hours' :
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
                title={info ? "Add a New Timesheet" : 'Add a New Timesheet'}
                text={!info && 'Please fulfill the below fields to add a timesheet.'}
            />
            <div className={classes.createFoundingSourceBody}>
                <div className={classes.clientModalBlock}>
                    <div className={classes.clientModalBox}>
                        <SelectInput
                            name={"payCode"}
                            label={"Paycode*"}
                            handleSelect={handleChange}
                            value={inputs.payCode}
                            list={newallPaycodes}
                            typeError={error === 'payCode' ? ErrorText.field : ''}
                        />
                        <div className={classes.displayCodeBlock}>
                            <div className={classes_v2.paycodeBox} >
                                <p className={classes_v2.paycodeBoxTitle}>Rate:</p>
                                <p className={classes_v2.paycodeBoxText}> {payCode?.code ? payCode.code : ' N/A'} </p>
                            </div>
                            <div className={classes_v2.paycodeBox} style={{marginBottom : 0}}>
                                <p className={classes_v2.paycodeBoxTitle}>Type:</p>
                                <p className={classes_v2.paycodeBoxText}>{payCode?.type ? payCode.type : 'N/A'}</p>
                            </div>
                        </div>
                        <Textarea
                            label={"Description"}
                            name='description'
                            typeError={error === 'description' && ErrorText.field}
                            value={inputs.description}
                            variant={"outlined"}
                            onChange={handleChange}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            value={inputs.hours}
                            type={"number"}
                            label={"Hours*"}
                            name='hours'
                            typeError={error === 'hours' && ErrorText.field}
                        />
                        <div className={classes_v2.paycodeBox}>
                            <Checkbox defaultChecked={true} onClick={onCheck} color={Colors.ThemeBlue} />
                            <p className={classes_v2.activePaycode}>Active Paycode</p>
                        </div>
                        <div style={{display: 'flex'}}>
                            <ValidationInput
                                variant={"outlined"}
                                onChange={handleChange}
                                value={ inputs.startDate }
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
