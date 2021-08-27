import React, {useEffect, useState} from "react";
import {TableCell} from "@material-ui/core";
import {Notes, TableBodyComponent, AddButton, ValidationInput} from "@eachbase/components";
import {Images} from "@eachbase/utils";
import {systemItemStyles} from './styles'

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

export const ServiceType = ({removeItem, openModal}) => {

    const classes = systemItemStyles()

    const [inputs, setInputs] = useState({});
    const [error,setError] = useState('');

    const notesItem = (item, index) => {
        return (
            <TableBodyComponent key={index}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell>
                    {item.action}
                </TableCell>
            </TableBodyComponent>
        )
    }

    const editService = (modalType) => {
        openModal(modalType)
    }

    const data = [
        {
            date: 'Function Behavioral Analysis',
            name: 'FBA',
            subject: 'ABA',
            action:
                <div className={classes.icons}>
                    <img src={Images.edit} onClick={() => editService('editService')} alt="edit"/>
                    <img src={Images.remove} alt="delete" onClick={() => removeItem('service')}/>
                </div>,
        }
    ]
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


    const isDisabled = inputs.serviceName && inputs.displayName && inputs.category


    return (
        <>
            <div className={classes.flexContainer}>
                <ValidationInput
                    style={classes.systemInputStyles}
                    onChange={handleChange}
                    value={inputs.serviceName}
                    variant={"outlined"}
                    name={"serviceName"}
                    type={"text"}
                    placeholder={'Service Name*'}
                />
                <ValidationInput
                    style={classes.systemInputStyles}
                    onChange={handleChange}
                    value={inputs.displayName}
                    variant={"outlined"}
                    name={"displayName"}
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
                    disabled={!isDisabled}
                    handleClick={() => alert('Add Service Type')}
                    text='Add Service Type'
                />
            </div>
            <p className={classes.title}>Service Type</p>
            <Notes defaultStyle={true} data={data} pagination={true} items={notesItem} headerTitles={headerTitles}/>
        </>

    )
}