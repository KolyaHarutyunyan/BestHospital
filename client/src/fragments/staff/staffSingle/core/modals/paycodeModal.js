import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";

import {Colors, ErrorText} from "@eachbase/utils";
import {
    clientActions,
    fundingSourceActions,
    httpRequestsOnErrorsActions,
    httpRequestsOnSuccessActions
} from "@eachbase/store";
import {createClientStyle} from "@eachbase/fragments/client";
import {Checkbox} from "@material-ui/core";

export const PaycodeModal = ({handleClose, info, fundingId, authId}) => {
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(info ? {...info, modifiers: info.serviceId.name} : {});
    const [modCheck, setModCheck] = useState([]);
    const dispatch = useDispatch()
    const modifiers = useSelector(state => state.fundingSource.modifiers.modifiers)
    const fSelect = useSelector(state => state.fundingSource.fundingSourceServices)
    const classes = createClientStyle()

    useEffect(() => {
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
        if (e.target.name === 'modifiers') {
            setModCheck([])
            let id = fSelect.find(item => item.name === e.target.value)._id
            dispatch(fundingSourceActions.getFoundingSourceServiceModifiersForClient(id))

        }
        setInputs(
            prevState => ({...prevState, [e.target.name]: e.target.value}),
            error === e.target.name && setError(''),
        )
    };


    const handleCreate = () => {
        let modifiersPost = [];
        modCheck.forEach(item => {
            return modifiers.forEach((item2, index2) => {
                if (item === index2) {
                    modifiersPost.push(item2?._id)
                }
            })
        })
        let funderId;
        fSelect.forEach(item => {
            if (inputs.modifiers === item.name) {
                funderId = item._id
            }
        })

        if (inputs.total && modifiersPost?.length > 0) {
            const data = {
                "total": +inputs.total,
                "modifiers": modifiersPost,
            }

            dispatch(clientActions.createClientsAuthorizationsServ(data, authId, funderId,))
        } else if (inputs.total && info) {
            dispatch(clientActions.editClientsAuthorizationsServ({
                "total": +inputs.total,
                "fundingServiceId": funderId,
                "authorizationId": authId,
            }, info.id, authId))
        } else {
            setError(
                !inputs.total ? 'total' :
                    !inputs.modifiers ? 'modifiers' :
                        'Input is not field'
            )
        }
    }

    function onModifier(index) {
        let arr = new Set([...modCheck])
        if (arr.has(index)) {
            arr.delete(index)
        } else {
            arr.add(index)
        }
        let newArr = []
        arr.forEach(item => {
            newArr.push(item)
        })
        setModCheck(newArr)
    }

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
                            name={"modifiers"}
                            label={"Name"}
                            handleSelect={handleChange}
                            value={inputs.modifiers}
                            list={fSelect}
                            typeError={error === 'modifiers' ? ErrorText.field : ''}
                        />
                        <div className={classes.displayCodeBlock2}>
                            <div className={classes.availableModfiers}>
                                {info ? info?.modifiers && info?.modifiers?.length > 0 && info.modifiers.map((item, index) => {
                                    return (
                                        <div className={classes.availableModfier}
                                             style={{
                                                 background: '#347AF080',
                                                 color: '#fff',
                                                 border: "none",
                                                 cursor: 'default'
                                             }}><p style={{width: 19, height: 20, overflow: 'hidden'}}>{item}</p></div>
                                    )
                                })
                                    : modifiers && modifiers.length > 0 ? modifiers.map((item, index) => {
                                        return (
                                            <p className={classes.availableModfier} onClick={() => onModifier(index)}
                                               style={modCheck.includes(index) ? {
                                                   background: '#347AF0',
                                                   color: '#fff'
                                               } : {}}>
                                                {item.name}</p>
                                        )
                                    }) : <p>N/A</p>}
                            </div>
                        </div>
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            value={inputs.total === 0 ? '0' : inputs.total}
                            type={"number"}
                            label={"Rate*"}
                            name='total'
                            typeError={error === 'total' && ErrorText.field}
                        />
                        <div style={{display: 'flex', alignItems : "center", marginBottom: 16}}>
                            <Checkbox color={Colors.ThemeBlue} />
                            <p style={{color : Colors.TextPrimary, fontSize : 16, marginLeft : 10}}>Active Paycode</p>
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
                                label={"Terminated Date*"}
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
