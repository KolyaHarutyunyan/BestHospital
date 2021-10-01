import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ValidationInput, SelectInput, CreateChancel, ModalHeader} from "@eachbase/components";
import {Colors, ErrorText} from "@eachbase/utils";
import {
    adminActions,
    clientActions,
    // fundingSourceActions,
    httpRequestsOnErrorsActions,
    httpRequestsOnSuccessActions, systemActions
} from "@eachbase/store";
import {Checkbox} from "@material-ui/core";
import {createClientStyle} from "@eachbase/fragments/client";
import {getDepartments} from "../../../../../store/system/system.action";


export const EmploymentModal = ({handleClose, info}) => {

    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(info ? {...info, departmentId: info.departmentId.name, status : String(info.status)} : {});

    const params = useParams()
    const dispatch = useDispatch()
    const departments = useSelector(state => state.system.departments)
    const staffList = useSelector(state => state.admins.adminsList.staff)
    const classes = createClientStyle()


    useEffect(() => {
        dispatch(systemActions.getDepartments())
    }, []);


    console.log(staffList,'fsesesesesese')

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




    const handleChange = e => setInputs(
        prevState => ({...prevState, [e.target.name]: e.target.value === 0? '0' : e.target.value}),
        error === e.target.name && setError(''),
    );

    const handleCreate = () => {

        // if (inputs.authId && inputs.departmentId && inputs.startDate && inputs.endDate && inputs.location && inputs.status ) {
            let depId;
            let supervisorID;
        departments.forEach(item => {
                if (inputs.departmentId === item.name) {
                    depId = item._id
                }
            })
        staffList.forEach(item => {
            if (inputs.supervisor === item.firstName) {
                supervisorID = item.id
            }
        })

        console.log(supervisorID,'iiiididididididdi')
            const data = {
                "staffId": params.id ,
                "departmentId":depId,
                "supervisor": supervisorID,
                "date": "2021-09-30T13:11:42.109Z",
                "schedule": 0,
                "termination": {
                    // "reason": "string",
                    "date": "2021-09-30T13:11:42.109Z"
                }
            }
        console.log(data,'datataaaaasdasdasdasd')
            if (info) {
                // dispatch(clientActions.editClientsAuthorizations(data, info.id, params.id))
            } else {

                dispatch(adminActions.createEmployment(data))
            }
        // } else {
        //     setError(
        //         !inputs.authId ? 'authId' :
        //             !inputs.departmentId ? 'departmentId' :
        //                 !inputs.startDate ? 'startDate' :
        //                     !inputs.endDate ? 'endDate' :
        //                         !inputs.location ? 'location' :
        //                             !inputs.status ? 'status' :
        //                                 'Input is not field'
        //     )
        // }
    }

    return (
        <div className={classes.createFoundingSource}>
            <ModalHeader
                handleClose={handleClose}
                title={info ? "Edit Employment" : 'Add a New Employment'}
                text={'Please fulfill the below fields to add an employment.'}
            />
            <div className={classes.createFoundingSourceBody}>
                <div className={classes.clientModalBlock}>
                    <div className={classes.clientModalBox}>
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            value={inputs.title}
                            type={"text"}
                            label={"Title*"}
                            name='title'
                            typeError={error === 'title' && ErrorText.field}
                        />
                        <SelectInput
                            name={"supervisor"}
                            label={"Supervisor*"}
                            handleSelect={handleChange}
                            value={inputs.supervisor}
                            list={staffList ? staffList : []}
                            typeError={error === 'supervisor' ? ErrorText.field : ''}
                        />
                        <SelectInput
                            name={"departmentId"}
                            label={"Department*"}
                            handleSelect={handleChange}
                            value={inputs.departmentId}
                            list={departments ? departments : []}
                            typeError={error === 'departmentId' ? ErrorText.field : ''}
                        />
                        <ValidationInput
                            variant={"outlined"}
                            onChange={handleChange}
                            value={inputs.employmentType}
                            type={"text"}
                            label={"Employment Type*"}
                            name='employmentType'
                            typeError={error === 'employmentType' && ErrorText.field}
                        />
                        <div style={{display: 'flex', alignItems : "center", marginBottom: 16}}>
                            <Checkbox color={Colors.ThemeBlue} />
                            <p style={{color : Colors.TextPrimary, fontSize : 16, marginLeft : 10}}>Currently works in this role</p>
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
