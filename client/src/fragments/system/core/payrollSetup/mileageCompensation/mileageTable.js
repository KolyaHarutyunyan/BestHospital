import React, {useState} from "react";
import {PayrollSetupStyles} from '../styles';
import {DeleteElement, Notes, SimpleModal, SlicedText, TableBodyComponent} from "@eachbase/components";
import {TableCell} from "@material-ui/core";
import {Images} from "@eachbase/utils";
import { MileageCompensation } from "./mileageCompensation";

const headerTitles = [
    {
        title: 'Mileage Compensation',
        sortable: false
    },
    {
        title: 'Start Date',
        sortable: false
    },
    {
        title: 'End Date',
        sortable: true
    },
    {
        title: 'Action',
        sortable: false
    },
];

export const MileageTable = () => {
    const classes = PayrollSetupStyles()

    const [editModalOpenClose, setEditModalOpenClose] = useState(false)
    const [editedData, setEditedData] = useState({})
    const [deletedInfo, setDeletedInfo] = useState({})

    const [open, setOpen] = useState(false)

    const handleOpenClose = (data) => {
        setEditedData(data)
        setEditModalOpenClose(!editModalOpenClose)
    }

    const handleOpenCloseDelete = (data) => {
        setDeletedInfo(data)
        setOpen(!open)
    }

    const handleDeleteItem = () => {
        setOpen(false)
    }

    const notesItem = (item, index) => {
        return (
            <TableBodyComponent key={index}>
                <TableCell>
                    <SlicedText size={30} type={'name'} data={item.name}/>
                </TableCell>
                <TableCell>
                    {item.startDate}
                </TableCell>
                <TableCell>
                    {item.endDate}
                </TableCell>
                <TableCell>{item.action ? item.action :
                    <div className={classes.icons}>
                        <img src={Images.edit} onClick={() => handleOpenClose({
                            name: item.name,
                        })} alt="edit"/>
                        <img src={Images.remove} alt="delete"
                             onClick={() => handleOpenCloseDelete({id: item.id, name: item.name})}/>
                    </div>
                }
                </TableCell>
            </TableBodyComponent>
        )
    }

    const data = [{
        name: 'Name',
        startDate: '10/10/10',
        endDate: '11/11/11'
    }]

    return (
        <>
            <Notes restHeight='360px' defaultStyle={true} data={data} pagination={false}
                   items={notesItem}
                   headerTitles={headerTitles}/>
            <SimpleModal
                openDefault={editModalOpenClose}
                handleOpenClose={handleOpenClose}
                content={<MileageCompensation handleOpenClose={editedData && handleOpenClose} maxWidth='480px'
                                           editedData={editedData} handleClose={handleOpenClose}/>}
            />
            <SimpleModal
                openDefault={open}
                handleOpenClose={handleOpenCloseDelete}
                content={<DeleteElement
                    info={deletedInfo.name}
                    text='some information'
                    handleDel={handleDeleteItem}
                    handleClose={handleOpenCloseDelete}
                />
                }
            />
        </>

    )
}