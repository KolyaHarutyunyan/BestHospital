import React, {useEffect, useState} from "react";
import {Card, DeleteElement, Notes, SimpleModal, TableBodyComponent} from '@eachbase/components';
import {serviceSingleStyles} from './styles';
import {Colors, Images} from "@eachbase/utils";
import {TableCell} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {clientActions} from "@eachbase/store";
import {AddAuthorization, AddEnrollment} from "../../clientModals";
import {AuthHeader} from "@eachbase/components/headers/auth/authHeader";
import {AddAuthorizationService} from "../../clientModals/addAuthorizationService";

export const ClientAuthorization = ({info, setAuthActive, setAuthItemIndex, data}) => {
    const classes = serviceSingleStyles()
    // const clientsAuthorizations = useSelector(state => state.client.clientsAuthorizations)


    console.log(info,'infooo')

    const dispatch = useDispatch()
    const [openClose, setOpenClose] = useState(false)
    const [index, setIndex] = useState(null)
    const [delEdit, setDelEdit] = useState(null)
    const [toggleModal, setToggleModal] = useState(false)
    const [toggleModal2, setToggleModal2] = useState(false)
    const [authIndex, setAuthIndex] = useState(0)


useEffect(()=>{
    dispatch(clientActions.getClientsAuthorizationsServ(info[0].id))
},[])

    const headerTitles = [
        {
            title: 'Service Code',
            sortable: false
        },
        {
            title: 'Modifiers',
            sortable: false
        },
        {
            title: 'Total Units',
            sortable: false
        },
        {
            title: 'Completed Units',
            sortable: false
        },
        {
            title: 'Available Units',
            sortable: false
        },
        {
            title: 'Percent Utilization',
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
            <TableBodyComponent key={index} handleClick={() => {
                setAuthItemIndex(index)
                setAuthActive(true)
            }}>
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
                content={delEdit ?
                    <AddAuthorization info={info[index]} handleClose={() => setToggleModal(!toggleModal)}/>
                    : <DeleteElement
                        text={'Delete Authorization'}
                        handleClose={() => setToggleModal(!toggleModal)}
                        handleDel={deleteAuthorization}
                    />
                }
            />
            <SimpleModal
                handleOpenClose={() => setToggleModal2(!toggleModal2)}
                openDefault={toggleModal2}
                content={<AddAuthorizationService fundingId={info[0].funderId._id}  handleClose={() => setToggleModal(!toggleModal2)}/>

                }
            />
            <Card
                width='234px'
                cardInfo={info}
                showHeader={true}
                hideHeaderLine={false}
                title='Authentications'
                color={Colors.ThemeRed}
                icon={Images.authIconGen}
                auth={true}
            />
            <div className={classes.clearBoth}/>
            <div className={classes.notesWrap}>
                <AuthHeader/>
                <div className={classes.authorizationServices}>
                <p className={classes.authorizationServicesTitle}>Authorization Services</p>
                    <div className={classes.authorizationServicesRight}>
                        <img src={Images.addHours} alt="" className={classes.iconStyle} onClick={()=>setToggleModal2(!toggleModal2)} />
                        <p className={classes.authorizationServicesText}>Add Authorization Service</p>
                    </div>
                </div>
                <Notes
                    data={info}
                    items={clientAuthorizationItem}
                    headerTitles={headerTitles}
                    defaultStyle={true}/>
            </div>

        </div>
    )
}