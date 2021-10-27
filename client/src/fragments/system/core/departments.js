import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AddButton, NoItemText, SlicedText, ValidationInput} from "@eachbase/components";
import {Images} from "@eachbase/utils";
import {systemItemStyles} from "./styles";
import {httpRequestsOnSuccessActions, systemActions} from "@eachbase/store";

const credentialBtn = {
    maxWidth: '174px',
    width: '100%',
    flex: '0 0 174px',
    padding: 0
}

export const Departments = ({globalDepartments, removeItem, openModal}) => {
    const dispatch = useDispatch()
    const classes = systemItemStyles()

    const [inputs, setInputs] = useState({})
    const [error, setError] = useState('')

    const handleChange = e => {
        setInputs(
            prevState => (
                {
                    ...prevState,
                    [e.target.name]: e.target.value
                }
            ));
        error === e.target.name && setError('')
    }

    const editDepartment = (modalType, modalId) => {
        openModal(modalType, modalId)
    }

    const handleSubmit = () => {
        let data = {
            name: inputs.name,
        }
        if (inputs.name) {
            dispatch(systemActions.createDepartmentGlobal(data));
        } else {
            setError(
                !inputs.name ? 'name' :
                    'Input is not filled'
            )
        }
    }

    const isDisabled = inputs.name

    const {httpOnLoad} = useSelector((state) => ({
        httpOnLoad: state.httpOnLoad,
    }));

    const loader = httpOnLoad.length && httpOnLoad[0] === 'CREATE_DEPARTMENT_GLOBAL'

    useEffect(() => {
        if (loader) {
            dispatch(httpRequestsOnSuccessActions.removeSuccess('CREATE_DEPARTMENT_GLOBAL'))
            setInputs({
                name: '',
            })
        }
    }, [loader])

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
                    placeholder={'Name*'}
                />
                <AddButton
                    type={'CREATE_DEPARTMENT_GLOBAL'}
                    loader={loader}
                    disabled={!isDisabled}
                    styles={credentialBtn}
                    handleClick={handleSubmit} text='Add Department'/>
            </div>
            <p className={classes.title}>Departments</p>
            <div className={classes.credentialTable}>
                {
                    globalDepartments && globalDepartments.length ? globalDepartments.map((departmentItem, index) => {
                        console.log(departmentItem,'modalInformation, modalInformation modalInformation');
                        return (
                            <div className={classes.item} key={index}>
                                <p>
                                    <span>
                                        <SlicedText type={'responsive'} size={25} data={departmentItem.name}/>
                                    </span>
                                    {departmentItem.type}</p>
                                <div className={classes.icons}>
                                    <img src={Images.edit}
                                         onClick={() => editDepartment('editDepartment', {
                                             departmentName: departmentItem.name,
                                             departmentID: departmentItem.id
                                         })
                                         } alt="edit"/>
                                    <img src={Images.remove} alt="delete"
                                         onClick={() => removeItem({
                                             id: departmentItem.id,
                                             name: departmentItem.name,
                                             type: 'editDepartment'
                                         })}/>
                                </div>
                            </div>
                        )
                    }) : <NoItemText text='No Items Yet'/>
                }
            </div>
        </>
    )
}