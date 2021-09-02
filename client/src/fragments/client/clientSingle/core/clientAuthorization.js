import React, {useState} from "react";
import { DeleteElement, Notes, SimpleModal, TableBodyComponent} from '@eachbase/components';
import {serviceSingleStyles} from './styles';
import { Images} from "@eachbase/utils";
import {TableCell} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {clientActions} from "@eachbase/store";
import {AddAuthorization, AddEnrollment} from "../../clientModals";

export const ClientAuthorization = ({info, setAuthActive, setAuthItemIndex}) => {
    const classes = serviceSingleStyles()
    // const clientsAuthorizations = useSelector(state => state.client.clientsAuthorizations)


    const dispatch = useDispatch()
    const [openClose, setOpenClose] = useState(false)
    const [index, setIndex] = useState(null)
    const [delEdit, setDelEdit] = useState(null)
    const [toggleModal, setToggleModal] = useState(false)

    const headerTitles = [
        {
            title: 'Auth #',
            sortable: false
        },
        {
            title: 'Funding Source',
            sortable: true
        },
        {
            title: 'Start Date',
            sortable: false
        },
        {
            title: 'End Date',
            sortable: false
        },
        {
            title: 'Status',
            sortable: false
        },
        {
            title: 'Action',
            sortable: false,
        },
    ];




    let deleteAuthorization = () => {
          dispatch(clientActions.deleteClientsAuthorization(info[index].id))
        setOpenClose(!openClose)
    }

    let clientAuthorizationItem = (item, index) => {
        return (
            <TableBodyComponent key={index} handleClick={()=> {
                setAuthItemIndex(index)
                setAuthActive(true)
            } }  >
                <TableCell><p className={classes.tableName}>{item?.authId}</p></TableCell>
                <TableCell>  {item?.funderId?.name}  </TableCell>
                <TableCell>  {item.startDate}  </TableCell>
                <TableCell>  {item.endDate}  </TableCell>
                <TableCell>  {item?.status}  </TableCell>
                <TableCell>
                    <>
                        <img src={Images.edit} alt="edit" className={classes.iconStyle}
                             onClick={(e) => {
                                 e.stopPropagation()
                                 setDelEdit(true)
                                 setToggleModal(!toggleModal)
                                 setIndex(index)

                             }}/>
                        <img src={Images.remove} alt="delete" className={classes.iconDeleteStyle}
                             onClick={(e) => {
                                 e.stopPropagation()
                                 setDelEdit(false)
                                 setToggleModal(!toggleModal)
                                 setIndex(index)
                             }}/>
                    </>
                </TableCell>
            </TableBodyComponent>
        )
    }

    return (
        <div className={classes.staffGeneralWrapper}>
            <SimpleModal
                handleOpenClose={() => setToggleModal(!toggleModal)}
                openDefault={toggleModal}
                content={delEdit ? <AddAuthorization info={info[index]} handleClose={() => setToggleModal(!toggleModal)}/>
                    : <DeleteElement
                        text={'Delete Authorization'}
                        handleClose={() => setToggleModal(!toggleModal)}
                        handleDel={deleteAuthorization}
                    />
                }
                />
            <div className={classes.clearBoth}/>
            <div className={classes.notesWrap}>
                <Notes
                    data={info}
                    items={clientAuthorizationItem}
                    headerTitles={headerTitles}
                    defaultStyle={true}/>
            </div>

        </div>
    )
}