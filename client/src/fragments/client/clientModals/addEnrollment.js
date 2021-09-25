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
} from '@eachbase/store';
import {useParams} from "react-router-dom";
import moment from "moment";


export const AddEnrollment = ({handleClose, info}) => {
    // value: data?.birthday && moment(data?.birthday).format('DD MM YYYY')

    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(info ? {...info,
        funding: info.funderId.name ,
        startDate : info?.startDate && moment(info?.startDate).format('YYYY-MM-DD'),
        terminationDate : info?.terminationDate && moment(info?.terminationDate).format('YYYY-MM-DD') } : {});
    const classes = createClientStyle()
    const params = useParams()
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(fundingSourceActions.getFundingSource())
    }, []);
    let fSelect = useSelector(state => state.fundingSource.fSelect.funders)


    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));


    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_CLIENT_ENROLLMENT'
    const successCreate = httpOnSuccess.length && httpOnSuccess[0].type === 'CREATE_CLIENT_ENROLLMENT'


    useEffect(() => {
        if (success) {
            handleClose()
            dispatch(httpRequestsOnSuccessActions.removeSuccess('EDIT_CLIENT_ENROLLMENT'))
            dispatch(httpRequestsOnErrorsActions.removeError('GET_CLIENT_ENROLLMENT'))
        }
        if (successCreate) {
            handleClose()
            dispatch(httpRequestsOnSuccessActions.removeSuccess('CREATE_CLIENT_ENROLLMENT'))
            dispatch(httpRequestsOnErrorsActions.removeError('GET_CLIENT_ENROLLMENT'))
        }
    }, [success, successCreate])

    const handleChange = e => setInputs(
        prevState => ({...prevState, [e.target.name]: e.target.value}),
        error === e.target.name && setError(''),
    );

    const handleCreate = () => {
        if (inputs.funding && inputs.startDate && inputs.terminationDate) {
            let funderId;
            fSelect.forEach(item => {
                if (inputs.funding === item.name) {
                    funderId = item.id
                }
            })
            const data = {
                "primary": true,
                "startDate": inputs.startDate,
                "terminationDate": inputs.terminationDate
            }
            if (info) {
                dispatch(clientActions.editClientEnrollment(data, params.id, funderId, info.id))
            } else {
                dispatch(clientActions.createClientEnrollment(data, params.id, funderId))
            }
            // handleClose()
        } else {
            setError(
                !inputs.funding ? 'funding' :
                    !inputs.startDate ? 'startDate' :
                        !inputs.terminationDate ? 'terminationDate' :
                            'Input is not field'
            )
        }


    }


    const successEdit = httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_CLIENT_ENROLLMENT'
    let errorMessage = successCreate ? 'Successfully added' : successEdit ? 'Successfully edited' : 'Something went wrong'
    return (
        <div className={classes.createFoundingSource}>
            <Toast
                type={'success'}
                text={errorMessage}
                info={successCreate || successEdit}/>
            <ModalHeader
                handleClose={handleClose}
                title={info ? 'Edit an Enrollment' : 'Add an Enrollment'}
                text={'To add a new enrollment in the system, please fulfill the below fields.'}
            />
            <div className={classes.createFoundingSourceBody}>
                <div className={classes.clientModalBlock}>
                    <div className={classes.clientModalBox}>
                        <SelectInput
                            language={null}
                            name={"funding"}
                            label={"Funding Source*"}
                            handleSelect={handleChange}
                            value={inputs?.funding}
                            list={fSelect ? fSelect : []}
                            typeError={error === 'funding' ? ErrorText.field : ''}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            value={inputs.startDate}
                            type={"date"}
                            label={"Start Date*"}
                            name='startDate'
                            typeError={error === 'startDate' && ErrorText.field}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            value={inputs.terminationDate}
                            type={"date"}
                            label={"Terminated Date*"}
                            name='terminationDate'
                            typeError={error === 'terminationDate' && ErrorText.field}
                        />
                    </div>
                </div>
                <div className={classes.clientModalBlock}>
                    <CreateChancel
                        loader={httpOnLoad.length > 0}
                        create={info ? "Save" : "Add"}
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
