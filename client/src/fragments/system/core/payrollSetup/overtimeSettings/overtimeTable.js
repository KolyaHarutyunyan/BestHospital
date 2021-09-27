import React, {useState} from "react";
import {PayrollSetupStyles} from '../styles';
import {Notes, SimpleModal, SlicedText, TableBodyComponent} from "@eachbase/components";
import {TableCell} from "@material-ui/core";
import {Images} from "@eachbase/utils";
import {OvertimeSettings} from "./overtimeSettings";

const headerTitles = [
    {
        title: 'Name',
        sortable: true
    },
    {
        title: 'Type',
        sortable: false
    },
    {
        title: 'Threshold',
        sortable: true
    },
    {
        title: 'Multiplier',
        sortable: false
    },
    {
        title: 'Action',
        sortable: false
    },
];

export const OvertimeTable = ({globalOvertimeSettings}) => {
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
                    {item.type}
                </TableCell>
                <TableCell>
                    {item.threshold}
                </TableCell>
                <TableCell>
                    {item.multiplier}
                </TableCell>
                <TableCell>{item.action ? item.action :
                    <div className={classes.icons}>
                        <img src={Images.edit} onClick={() => handleOpenClose({
                            name: item.name,
                            type: item.type,
                            multiplier: item.multiplier,
                            threshold: item.threshold,
                            id: item.id
                        })} alt="edit"/>
                        <img src={Images.remove} alt="delete"
                             onClick={() => alert('delete')}/>
                    </div>
                }
                </TableCell>
            </TableBodyComponent>
        )
    }

    return (
        <>
            <Notes restHeight='360px' defaultStyle={true} data={globalOvertimeSettings} pagination={false} items={notesItem}
                   headerTitles={headerTitles}/>
            <SimpleModal
                openDefault={editModalOpenClose}
                handleOpenClose={handleOpenClose}
                content={<OvertimeSettings handleOpenClose={editedData && handleOpenClose} maxWidth='480px' editedData={editedData} handleClose={handleOpenClose}/>}
            />
        </>

    )
}