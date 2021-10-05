import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";

import {Colors, ErrorText} from "@eachbase/utils";
import {
    adminActions,
    clientActions,
    fundingSourceActions,
    httpRequestsOnErrorsActions,
    httpRequestsOnSuccessActions
} from "@eachbase/store";
import {createClientStyle} from "@eachbase/fragments/client";
import {Checkbox} from "@material-ui/core";
import {payrollActions} from "../../../../../store/payroll";
import {createPayCode} from "../../../../../store/admin/admin.action";

export const PaycodeModal = ({handleClose, info, fundingId, employmentId, authId}) => {
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(info ? {...info, modifiers: info.serviceId.name} : {});
    const [modCheck, setModCheck] = useState([]);
    const [payCode, setPayCode] = useState(null);
    const dispatch = useDispatch()
    const modifiers = useSelector(state => state.fundingSource.modifiers.modifiers)
    const fSelect = useSelector(state => state.fundingSource.fundingSourceServices)
    const classes = createClientStyle()
    const globalPayCodes = useSelector(state => state.payroll.PayCodes)

    console.log(payCode,'pay iddd11111')

    useEffect(() => {
        dispatch(payrollActions.getPayCodeGlobal())
        dispatch(fundingSourceActions.getFoundingSourceServiceById(fundingId))
        let funderId;
        fSelect.forEach(item => {
            if (inputs.modifiers === item.name) {
                funderId = item._id
            }
        })
    }, []);

    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));

    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_CLIENT_AUTHORIZATION_SERV'
    const successCreate = httpOnSuccess.length && httpOnSuccess[0].type === 'CREATE_CLIENT_AUTHORIZATION_SERV'

    useEffect(() => {
        if (success) {
            handleClose()
            dispatch(httpRequestsOnSuccessActions.removeSuccess('EDIT_CLIENT_AUTHORIZATION_SERV'))
            dispatch(httpRequestsOnErrorsActions.removeError('GET_CLIENT_AUTHORIZATION'))
        }
        if (successCreate) {
            handleClose()
            dispatch(httpRequestsOnSuccessActions.removeSuccess('CREATE_CLIENT_AUTHORIZATION_SERV'))
            dispatch(httpRequestsOnErrorsActions.removeError('GET_CLIENT_AUTHORIZATION'))
        }
    }, [success, successCreate])


    const handleChange = e => {
        if (e.target.name === 'payCodeTypeId') {
            setModCheck([])
            setPayCode(globalPayCodes.find(item => item.name === e.target.value))
            let id = fSelect.find(item => item.name === e.target.value)?._id
            dispatch(fundingSourceActions.getFoundingSourceServiceModifiersForClient(id))

        }
        setInputs(
            prevState => ({...prevState, [e.target.name]: e.target.value}),
            error === e.target.name && setError(''),
        )
    };

    console.log(payCode, 'paycode')

    const handleCreate = () => {
        // let modifiersPost = [];
        // modCheck.forEach(item => {
        //     return modifiers.forEach((item2, index2) => {
        //         if (item === index2) {
        //             modifiersPost.push(item2?._id)
        //         }
        //     })
        // })
        // let funderId;
        // fSelect.forEach(item => {
        //     if (inputs.modifiers === item.name) {
        //         funderId = item._id
        //     }
        // })

        if (inputs.rate && inputs.payCodeTypeId && inputs.startDate && inputs.endDate) {
            const data = {
                "employmentId": employmentId,
                "payCodeTypeId": payCode.id,
                "rate": 0,
                "active": true,
                "startDate": inputs.startDate,
                "endDate": inputs.endDate
            }
            console.log(data,'dataaaaaaaaa')
            dispatch(adminActions.createPayCode(data))
        } else if (inputs.total && info) {
            dispatch(clientActions.editClientsAuthorizationsServ({
                "total": +inputs.total,
                "fundingServiceId": funderId,
                "authorizationId": authId,
            }, info.id, authId))
        } else {
            setError(
                !inputs.payCodeTypeId ? 'payCodeTypeId' :
                    !inputs.rate ? 'rate' :
                        !inputs.startDate ? 'startDate' :
                            !inputs.endDate ? 'endDate' :
                                'Input is not field'
            )
        }
    }

    // function onModifier(index) {
    //     let arr = new Set([...modCheck])
    //     if (arr.has(index)) {
    //         arr.delete(index)
    //     } else {
    //         arr.add(index)
    //     }
    //     let newArr = []
    //     arr.forEach(item => {
    //         newArr.push(item)
    //     })
    //     setModCheck(newArr)
    // }

    return (
        <div className={classes.createFoundingSource}>
            <ModalHeader
                handleClose={handleClose}
                title={info ? "Sick Time" : 'Add a New Paycode'}
                text={!info && 'Please fulfill the below fields to add a paycode.'}
            />
            <div className={classes.createFoundingSourceBody}>
                <div className={classes.clientModalBlock}>
                    <div className={classes.clientModalBox}>
                        <SelectInput
                            name={"payCodeTypeId"}
                            label={"Name"}
                            handleSelect={handleChange}
                            value={inputs.modifiers}
                            list={globalPayCodes}
                            typeError={error === 'payCodeTypeId' ? ErrorText.field : ''}
                        />
                        <div className={classes.displayCodeBlock}>
                            <div style={{display: "flex", marginBottom: 16, alignItems: 'center'}}>
                                <p style={{
                                    color: Colors.TextPrimary,
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    marginRight: 8
                                }}>Code:</p>
                                <p style={{
                                    color: '#4B5C68B3',
                                    fontSize: 14,
                                }}> {payCode?.code ? payCode.code : 'N/A'} </p>
                            </div>
                            <div style={{display: "flex", marginBottom: 16, alignItems: 'center'}}>
                                <p style={{
                                    color: Colors.TextPrimary,
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    marginRight: 8
                                }}>Type:</p>
                                <p style={{
                                    color: '#4B5C68B3',
                                    fontSize: 14,
                                }}>{payCode?.type ? payCode.type : 'N/A'}</p>
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
                        <div style={{display: 'flex', alignItems: "center", marginBottom: 16}}>
                            <Checkbox color={Colors.ThemeBlue} checked={true}/>
                            <p style={{color: Colors.TextPrimary, fontSize: 16, marginLeft: 10}}>Active Paycode</p>
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
                                onChange={handleChange}
                                value={inputs.endDate}
                                type={"date"}
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
