import React, {useEffect, useState} from "react";
import {TableCell} from "@material-ui/core";
import {Notes, TableBodyComponent, AddButton, ValidationInput, Toast} from "@eachbase/components";
import {Images} from "@eachbase/utils";
import {systemItemStyles} from './styles'
import {useDispatch, useSelector} from "react-redux";
import {httpRequestsOnErrorsActions, httpRequestsOnSuccessActions, systemActions} from "@eachbase/store";

const credentialBtn = {
    maxWidth: '174px',
    width: '100%',
    flex: '0 0 174px',
    padding: 0
}

const headerTitles = [
    {
        title: 'Name',
        sortable: true
    },
    {
        title: 'Display Code',
        sortable: false
    },
    {
        title: 'Category',
        sortable: false
    },
    {
        title: 'Action',
        sortable: false
    },
];

export const ServiceType = ({globalServices, removeItem, openModal}) => {

    const [inputs, setInputs] = useState({});
    const [error, setError] = useState('');

    const isDisabled = inputs.name && inputs.displayCode && inputs.category
    const classes = systemItemStyles()

    const dispatch = useDispatch()

    const notesItem = (item, index) => {
        return (
            <TableBodyComponent key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.displayCode}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.action ? item.action :
                    <div className={classes.icons}>
                        <img src={Images.edit} onClick={() => editService('editService',{id:item.id,name:item.name,category: item.category,displayCode: item.displayCode})} alt="edit"/>
                        <img src={Images.remove} alt="delete" onClick={() => removeItem({id: item.id,name: item.name,type: 'editService'})}/>
                    </div>
                }
                </TableCell>
            </TableBodyComponent>
        )
    }

    const editService = (modalType,modalInformation) => {
        openModal(modalType,modalInformation)
    }

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

    const handleSubmit = () =>{
        let serviceData = {
            name: inputs.name,
            displayCode: inputs.displayCode,
            category: inputs.category
        }
        if (inputs.name && inputs.displayCode && inputs.category) {
            dispatch(systemActions.createServiceGlobal(serviceData))
        }else {
           alert('error')
        }
    }

    const {httpOnError, httpOnLoad, httpOnSuccess } = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnLoad: state.httpOnLoad,
        httpOnError: state.httpOnError
    }));

    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'CREATE_SERVICE_GLOBAL'

    const errorText = httpOnError.length && httpOnError[0].type === 'CREATE_SERVICE_GLOBAL'

    useEffect(()=>{
        if(success) {
            dispatch(httpRequestsOnSuccessActions.removeSuccess('CREATE_SERVICE_GLOBAL'))
            setInputs({
                name: '',
                displayCode: '',
                category: ''
            })
        }else if(errorText){
            dispatch(httpRequestsOnErrorsActions.removeError('CREATE_SERVICE_GLOBAL'))
        }
    },[success])

    let errorMessage = success ? 'success' : 'error'

    return (
        <>
            <div className={classes.flexContainer}>
                <ValidationInput
                    style={classes.systemInputStyles}
                    onChange={handleChange}
                    value={inputs.name}
                    variant={"outlined"}
                    name={"name"}
                    type={"text"}
                    placeholder={'Service Name*'}
                />
                <ValidationInput
                    style={classes.systemInputStyles}
                    onChange={handleChange}
                    value={inputs.displayCode}
                    variant={"outlined"}
                    name={"displayCode"}
                    type={"text"}
                    placeholder={'Display Code*'}
                />
                <ValidationInput
                    style={classes.systemInputStyles}
                    onChange={handleChange}
                    value={inputs.category}
                    variant={"outlined"}
                    name={"category"}
                    type={"text"}
                    placeholder={'Category'}
                />
                <AddButton
                    styles={credentialBtn}
                    loader={!!httpOnLoad.length}
                    disabled={!isDisabled}
                    handleClick={handleSubmit}
                    text='Add Service Type'
                />
            </div>
            <p className={classes.title}>Service Type</p>

            <Notes defaultStyle={true} data={globalServices} pagination={false} items={notesItem}
                   headerTitles={headerTitles}/>
            <Toast
                type={success ? 'success' : errorText ? 'error' : '' }
                text={errorMessage}
                info={success ? success : errorText ? errorText : ''}/>
        </>
    )
}