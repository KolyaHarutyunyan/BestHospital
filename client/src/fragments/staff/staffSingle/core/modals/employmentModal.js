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
import {editEmployment} from "../../../../../store/admin/admin.action";
import moment from "moment";


export const EmploymentModal = ({handleClose, info}) => {

    const [error, setError] = useState("");
    const [inputs, setInputs] = useState(info ? {...info,
        supervisor : info.supervisor.firstName,
        departmentId : info?.departmentId?.name,
        startDate : moment(info?.date).format('YYYY-MM-DD'),
        endDate : moment(info?.termination?.date).format('YYYY-MM-DD'),
        employmentType : info?.schedule

    } : {});
    const params = useParams()
    const dispatch = useDispatch()
    const departments = useSelector(state => state.system.departments)
    const staffList = useSelector(state => state.admins.adminsList.staff)
    const classes = createClientStyle()


    useEffect(() => {
        dispatch(systemActions.getDepartments())
    }, []);



    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));

    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_EMPLOYMENT'
    const successCreate = httpOnSuccess.length && httpOnSuccess[0].type === 'CREATE_EMPLOYMENT'

    useEffect(() => {
        if (success) {
            handleClose()
            dispatch(httpRequestsOnSuccessActions.removeSuccess('EDIT_EMPLOYMENT'))
            dispatch(httpRequestsOnErrorsActions.removeError('GET_CLIENT_AUTHORIZATION'))
        }
        if (successCreate) {
            handleClose()
            dispatch(httpRequestsOnSuccessActions.removeSuccess('CREATE_EMPLOYMENT'))
            dispatch(httpRequestsOnErrorsActions.removeError('GET_CLIENT_AUTHORIZATION'))
        }
    }, [success, successCreate])




    const handleChange = e => setInputs(
        prevState => ({...prevState, [e.target.name]: e.target.value === 0? '0' : e.target.value}),
        error === e.target.name && setError(''),
    );




    const handleCreate = () => {

        if (inputs.title && inputs.departmentId && inputs.supervisor  && inputs.endDate && inputs.startDate) {
            let depId;
            let supervisorID;
            departments.forEach(item => {
                if (inputs.departmentId === item.name) {
                    depId = item._id
                }
            })
            staffList &&     staffList.forEach(item => {
                if (inputs.supervisor === item.firstName) {
                    supervisorID = item.id
                }
            })

            const data = {
                'title': inputs.title,
                "staffId": params.id,
                "supervisor": supervisorID,
                "departmentId": depId,
                "date": inputs.startDate,
                "schedule": +inputs.employmentType,
                "termination": {
                    // "reason": "string",
                    "date": inputs.endDate
                }
            }

        if (info) {
            console.log(data,'dataaaaaa')
             dispatch(adminActions.editEmployment(data, info.id, params.id))
        } else {
            dispatch(adminActions.createEmployment(data, params.id))
        }
    }

    else {   setError(
                !inputs.title ? 'title' :
                    !inputs.supervisor ? 'supervisor' :
                        !inputs.departmentId ? 'departmentId' :
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
                        <SelectInput
                            name='employmentType'
                            label={"Employment Type*"}
                            handleSelect={handleChange}
                           value={ String(inputs.employmentType) }
                            list={ [{name: 0,} ,{name : 1}]}
                            typeError={error === 'employmentType' && ErrorText.field}
                        />

                        {/*<div style={{display: 'flex', alignItems : "center", marginBottom: 16}}>*/}
                        {/*    <Checkbox color={Colors.ThemeBlue} />*/}
                        {/*    <p style={{color : Colors.TextPrimary, fontSize : 16, marginLeft : 10}}>Currently works in this role</p>*/}
                        {/*</div>*/}
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