import {AddButton, NoItemText, SlicedText, Toast, ValidationInput} from "@eachbase/components";
import {Images} from "@eachbase/utils";
import {systemItemStyles} from "./styles";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {httpRequestsOnErrorsActions, httpRequestsOnSuccessActions, systemActions} from "../../../store";


const credentialBtn = {
    maxWidth: '174px',
    width: '100%',
    flex: '0 0 174px',
    padding: 0
}

export const JobTitles = ({globalJobs,removeItem, openModal}) => {
    const dispatch = useDispatch()
    const classes = systemItemStyles()

    const [inputs, setInputs] = useState({})
    const [error, setError] = useState('')

    const handleChange = e =>{
        setInputs(
            prevState => (
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            ));
        error === e.target.name && setError('')
    }

    const handleSubmit = () => {
        let data = {
            name: inputs.name,
        }
        if (inputs.name) {
            dispatch(systemActions.createJobGlobal(data));
        } else {
            setError(
                !inputs.name ? 'name' :
                    'Input is not filled'
            )
        }
    }

    const editJob = (modalType,modalId) => {
        openModal(modalType,modalId)
    }

    const isDisabled = inputs.name

    const {httpOnLoad } = useSelector((state) => ({
        httpOnLoad: state.httpOnLoad,
    }));
    const loader = httpOnLoad.length && httpOnLoad[0] === 'CREATE_JOB_GLOBAL'

    useEffect(()=>{
        if(loader) {
            dispatch(httpRequestsOnSuccessActions.removeSuccess('CREATE_JOB_GLOBAL'))
            setInputs({
                name: '',
            })
        }
    },[loader])

    return (
        <>
            <div className={`${classes.flexContainer} ${classes.headerSize}`}>
                <ValidationInput
                    style={classes.credentialInputStyle}
                    onChange={handleChange}
                    value={inputs.name}
                    variant={"outlined"}
                    name={"name"}
                    type={"text"}
                    placeholder={'Job Titles*'}
                />
                <AddButton
                    type={'CREATE_JOB_GLOBAL'}
                    disabled={!isDisabled}
                    styles={credentialBtn}
                    loader={ loader }
                    handleClick={handleSubmit} text='Add Job Title'/>
            </div>
            <p className={classes.title}>Job Titles</p>
            <div className={classes.credentialTable}>
                {
                    globalJobs && globalJobs.length ? globalJobs.map((jobItem, index) => {
                        return (
                            <div className={classes.item} key={index}>
                                <p>
                                    <SlicedText type={'responsive'} size={25} data= {jobItem.name}/>
                                </p>
                                <div className={classes.icons}>
                                    <img src={Images.edit}
                                         onClick={() => editJob('editJobTitles',{
                                             jobTitle: jobItem.name,
                                             jobId: jobItem._id
                                         })} alt="edit"/>
                                    <img src={Images.remove} alt="delete" onClick={() => removeItem({
                                        id: jobItem._id,
                                        name:jobItem.name,
                                        type: 'editJobTitles'
                                    })}/>
                                </div>
                            </div>
                        )
                    }) : <NoItemText text='No Items Yet' />
                }
            </div>
        </>
    )
}