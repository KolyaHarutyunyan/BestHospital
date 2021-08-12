import React from "react";
import {TableBodyComponent} from "@eachbase/components";
import {TableCell} from "@material-ui/core";
import {Images, useGlobalStyles} from "@eachbase/utils";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {clientActions} from "@eachbase/store/client";

export const ClientTableBody = ({data, setEditClient, handleClose, setIndex, index}) => {
    const globalClasses = useGlobalStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const handleOpenOfficeInfo = (id) => {
        history.push(`/client/${id}`)
    }
    console.log(data,'eeeee');
    return (
        <TableBodyComponent handleOpenInfo={() => handleOpenOfficeInfo(data.id)} key={index}>

            <TableCell>
                <div className={globalClasses.InfoAndImage}>
                    <img src={Images.clients} alt={"client"}/>
                    <p>{data?.firstName} {data?.lastName}</p>
                </div>
            </TableCell>
            <TableCell> {data?.code} </TableCell>
            <TableCell>{data?.gender}</TableCell>
            <TableCell>{data?.birthday}</TableCell>
            <TableCell>{data?.status} </TableCell>
            {/*<TableCell>{data?.enrollment}</TableCell>*/}
            <TableCell>
                <>
                    <img src={Images.edit} alt="edit" style={{cursor: 'pointer'}} onClick={(e) => {
                        e.stopPropagation()
                        setIndex(index)
                        setEditClient(data.id)
                        handleClose()
                    }}/>
                    <img src={Images.remove} alt="delete" style={{marginLeft: 16, cursor: 'pointer'}}
                         onClick={(e) => {
                             e.stopPropagation()
                             dispatch(clientActions.deleteClient(data.id))
                         }
                         }/>
                </>
            </TableCell>
        </TableBodyComponent>
    )
}
