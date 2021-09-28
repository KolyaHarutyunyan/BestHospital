import React, {useState} from "react";
import {PayrollSetupStyles} from '../styles';
import {Notes, SimpleModal, SlicedText, TableBodyComponent} from "@eachbase/components";
import {TableCell} from "@material-ui/core";
import {Images} from "@eachbase/utils";
import {PayCodeType} from "./paycodeType";

const headerTitles = [
    {
        title: 'Name',
        sortable: true
    },
    {
        title: 'Code',
        sortable: false
    },
    {
        title: 'Type',
        sortable: true
    },
    {
        title: 'Overtiming Applied',
        sortable: false
    },
    {
        title: 'PTO Accrued',
        sortable: false
    },
    {
        title: 'Action',
        sortable: false
    },
];

export const PayCodeTable = ({globalPayCodes}) => {
    const classes = PayrollSetupStyles()

    const [editModalOpenClose,setEditModalOpenClose] = useState(false)
    const [editedData,setEditedData] = useState({})

    const handleOpenClose = (data) => {
        setEditedData(data)
        setEditModalOpenClose(!editModalOpenClose)
    }

    const notesItem = (item, index) => {
        return (
            <TableBodyComponent key={index}>
                <TableCell>
                    <SlicedText size={30} type={'name'} data={item.name}/>
                </TableCell>
                <TableCell>
                    {item.code}
                </TableCell>
                <TableCell>
                    {item.type}
                </TableCell>
                <TableCell>
                    {item.overtime ? 'Yes' : 'No'}
                </TableCell>
                <TableCell>
                    {item.pto ? 'Yes' : 'No'}
                </TableCell>
                <TableCell>{item.action ? item.action :
                    <div className={classes.icons}>
                        <img src={Images.edit} onClick={() => handleOpenClose({
                            name: item.name,
                            code: item.code,
                            type: item.type,
                            overtime: item.overtime,
                            pto: item.pto,
                            id: item.id
                        })} alt="edit"/>
                    </div>
                }
                </TableCell>
            </TableBodyComponent>
        )
    }

    return (
        <>
            <Notes restHeight='360px' defaultStyle={true} data={globalPayCodes} pagination={false} items={notesItem}
                   headerTitles={headerTitles}/>
            <SimpleModal
                openDefault={editModalOpenClose}
                handleOpenClose={handleOpenClose}
                content={<PayCodeType handleOpenClose={editedData && handleOpenClose} maxWidth='480px' editedData={editedData} handleClose={handleOpenClose}/>}
            />
        </>

    )
}