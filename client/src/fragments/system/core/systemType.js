import {Notes, TableBodyComponent} from "@eachbase/components";
import {TableCell} from "@material-ui/core";
import React from "react";
import {Images} from "../../../utils";

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

export const SystemType = ({openModal}) => {

    const notesItem = (item, index) => {
        return (
            <TableBodyComponent key={index} handleClick={() =>openModal('infoModal')}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell>
                    {item.action}
                </TableCell>
            </TableBodyComponent>
        )
    }

    const removeItem = () =>{
        alert('remove item')
    }

    const editService = (modalType) =>{
        openModal(modalType)
    }

    const data = [
        {
            date: 'Function Behavioral Analysis',
            name: 'FBA',
            subject: 'ABA',
            action:
                <>
                    <img src={Images.edit} style={{cursor: 'pointer'}} onClick={(e) => {
                        e.stopPropagation();
                        editService('edit')
                    }
                    } alt="edit"/>
                    <img src={Images.remove} alt="delete" style={{cursor: 'pointer',marginLeft: 16}} onClick={(e) => {
                        e.stopPropagation();
                        removeItem()
                    }}/>
                </>,
        }
    ]



    return (
        <Notes defaultStyle={true} data={data} pagination={true} items={notesItem} headerTitles={headerTitles}/>
    )
}