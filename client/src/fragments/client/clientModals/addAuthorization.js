import React, {useEffect, useState} from "react";
import {ValidationInput, SelectInput, CreateChancel, ModalHeader, Toast} from "@eachbase/components";
import {createClientStyle,} from "./styles";
import {ErrorText} from "@eachbase/utils";
import {useDispatch, useSelector} from "react-redux";
import {
    clientActions,
    fundingSourceActions,
    httpRequestsOnErrorsActions,
    httpRequestsOnSuccessActions
} from "@eachbase/store";
import {useParams} from "react-router-dom";


export const AddAuthorization = ({handleClose, info}) => {
    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(info ? {...info, funding: info.funderId.name, status : String(info.status)} : {});
    const params = useParams()
    const dispatch = useDispatch()
    const fSelect = useSelector(state => state?.fundingSource?.fSelect?.funders)
    const classes = createClientStyle()



    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));


    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_CLIENT_AUTHORIZATION'
    const successCreate = httpOnSuccess.length && httpOnSuccess[0].type === 'CREATE_CLIENT_AUTHORIZATION'



    useEffect(() => {
        if (success) {
            handleClose()
            dispatch(httpRequestsOnSuccessActions.removeSuccess('EDIT_CLIENT_AUTHORIZATION'))
            dispatch(httpRequestsOnErrorsActions.removeError('GET_CLIENT_AUTHORIZATION'))
        }
        if (successCreate) {
            handleClose()
            dispatch(httpRequestsOnSuccessActions.removeSuccess('CREATE_CLIENT_AUTHORIZATION'))
            dispatch(httpRequestsOnErrorsActions.removeError('GET_CLIENT_AUTHORIZATION'))
        }
    }, [success, successCreate])

    useEffect(() => {
        dispatch(fundingSourceActions.getFundingSource())
    }, []);


    const handleChange = e => setInputs(
        prevState => ({...prevState, [e.target.name]: e.target.value === 0? '0' : e.target.value}),
        error === e.target.name && setError(''),
    );

    const handleCreate = () => {
        if (inputs.authId && inputs.funding && inputs.startDate && inputs.endDate && inputs.location && inputs.status ) {
            let funderId;
            fSelect.forEach(item => {
                if (inputs.funding === item.name) {
                    funderId = item.id
                }
            })
            const data = {
                "authId": inputs.authId,
                "startDate": inputs.startDate,
                "endDate": inputs.endDate,
                "location": inputs.location,
                "status": +inputs.status
            }
            if (info) {
                dispatch(clientActions.editClientsAuthorizations(data, info.id, params.id))
            } else {
                dispatch(clientActions.createClientsAuthorizations(data, params.id, funderId))
            }
            // handleClose()
        } else {
            setError(
                !inputs.authId ? 'authId' :
                    !inputs.funding ? 'funding' :
                        !inputs.startDate ? 'startDate' :
                            !inputs.endDate ? 'endDate' :
                                !inputs.location ? 'location' :
                                    !inputs.status ? 'status' :
                                        'Input is not field'
            )
        }
    }

    const list = [
        {name: '0'},
        {name: 1}
    ]
    //
    // const successEdit = httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_CLIENT_AUTHORIZATION'
    // let errorMessage = successCreate ? 'Successfully added' : successEdit ? 'Successfully edited' : 'Something went wrong'


    console.log(httpOnSuccess,'auth   modal onssssssucessss')

    return (
        <div className={classes.createFoundingSource}>
            {/*<Toast*/}
            {/*    type={'success'}*/}
            {/*    text={errorMessage}*/}
            {/*    info={successCreate || successEdit}/>*/}
            <ModalHeader
                handleClose={handleClose}
                title={info ? "Edit Authorization" : 'Add Authorization'}
                text={'Please fulfill the below fields to add an authorization.'}
            />
            <div className={classes.createFoundingSourceBody}>
                <div className={classes.clientModalBlock}>
                    <div className={classes.clientModalBox}>
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            value={inputs.authId}
                            type={"text"}
                            label={"Auth#*"}
                            name='authId'
                            typeError={error === 'authId' && ErrorText.field}
                        />
                        <SelectInput
                            name={"funding"}
                            label={"Funding Source*"}
                            handleSelect={handleChange}
                            value={inputs.funding}
                            list={fSelect ? fSelect : []}
                            typeError={error === 'funding' ? ErrorText.field : ''}
                        />

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
                        <SelectInput
                            name={"status"}
                            label={"Status*"}
                            handleSelect={handleChange}
                            value={String(inputs.status)}
                            list={list}
                            typeError={error === 'status' ? ErrorText.field : ''}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            value={inputs.location}
                            type={"text"}
                            label={"Service Location*"}
                            name='location'
                            typeError={error === 'location' && ErrorText.field}
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
