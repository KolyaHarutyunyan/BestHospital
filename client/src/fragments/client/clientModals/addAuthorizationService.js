import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ValidationInput, SelectInput, CreateChancel, ModalHeader, ErrMessage} from "@eachbase/components";
import {createClientStyle,} from "./styles";
import {ErrorText} from "@eachbase/utils";
import {
    clientActions,
    fundingSourceActions,
    httpRequestsOnErrorsActions,
    httpRequestsOnSuccessActions
} from "@eachbase/store";
import {getClientsAuthorizationsServModifiersCheck} from "../../../store/client/client.action";

export const AddAuthorizationService = ({handleClose, info, fundingId, authId}) => {
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

            // dispatch(clientActions.getClientsAuthorizationsServModifiersCheck(data, authId, funderId,))
            dispatch(clientActions.createClientsAuthorizationsServ(data, authId, funderId,))
        } else if (inputs.total && info) {
            dispatch(clientActions.editClientsAuthorizationsServ({
                "total": +inputs.total,
                "fundingServiceId": funderId,
                "authorizationId": authId,
            }, info.id, authId))

        } else {
            setError(
                !inputs.modifiers ? 'modifiers' :
                    !modifiersPost.length ? 'modifiersPost' :
                        !inputs.total ? 'total' :
                            'Input is not field'
            )
        }
    }


    function onModifier(index) {
        error === 'modifiersPost' && setError('')
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
                title={info ? "Edit Authorization Service" : 'Add Authorization Service'}
                text={'To add a new authorization service in the system, please fulfill the below fields.'}
            />
            <div className={classes.createFoundingSourceBody}>
                <div className={classes.clientModalBlock}>
                    <div className={classes.clientModalBox}>
                        <p className={classes.inputInfo}>Service</p>
                        <SelectInput
                            name={"modifiers"}
                            label={"Service Code*"}
                            handleSelect={handleChange}
                            value={inputs.modifiers}
                            list={fSelect}
                            typeError={error === 'modifiers' ? ErrorText.field : ''}
                        />
                        <div className={classes.displayCodeBlock2}>
                            <p className={classes.displayCodeBlockText}>Available Modfiers </p>
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
                        {/*{error === 'modifiersPost' &&  <ErrMessage text={ErrorText.field}/>}*/}
                        <p className={classes.inputInfo}>Availability</p>
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            value={inputs.total === 0 ? '0' : inputs.total}
                            type={"number"}
                            label={"Total Units*"}
                            name='total'
                            typeError={error === 'total' && ErrorText.field}
                        />
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
