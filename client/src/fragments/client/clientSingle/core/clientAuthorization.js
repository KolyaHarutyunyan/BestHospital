import React, {useEffect, useState} from "react";
import {Card, DeleteElement, Notes, SimpleModal, TableBodyComponent, Toast} from '@eachbase/components';
import {serviceSingleStyles} from './styles';
import {Colors, Images} from "@eachbase/utils";
import {TableCell} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {clientActions, httpRequestsOnErrorsActions, httpRequestsOnSuccessActions} from "@eachbase/store";
import {AddAuthorization, AddEnrollment} from "../../clientModals";
import {AuthHeader} from "@eachbase/components/headers/auth/authHeader";
import {AddAuthorizationService} from "../../clientModals/addAuthorizationService";
import {useParams} from "react-router-dom";

export const ClientAuthorization = ({info, setAuthActive, setAuthItemIndex, data}) => {
    const classes = serviceSingleStyles()
    // const clientsAuthorizations = useSelector(state => state.client.clientsAuthorizations)


    const dispatch = useDispatch()
    const [openClose, setOpenClose] = useState(false)
    const [index, setIndex] = useState(null)
    const [delEdit, setDelEdit] = useState(null)
    const [toggleModal, setToggleModal] = useState(false)
    const [toggleModal2, setToggleModal2] = useState(false)
    const [authIndex, setAuthIndex] = useState(0)
    const params = useParams()

    console.log(info,'iiinfooooooo')

    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));


    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_CLIENT_AUTHORIZATION'


    useEffect(() => {
        if (success) {
            setToggleModal2(!toggleModal2)
            dispatch(httpRequestsOnSuccessActions.removeSuccess('DELETE_CLIENT_AUTHORIZATION'))
            dispatch(httpRequestsOnErrorsActions.removeError('GET_CLIENT_AUTHORIZATION'))
        }

    }, [success])



    useEffect(() => {
        dispatch(clientActions.getClientsAuthorizationsServ(info[authIndex].id))
    }, [])

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
        dispatch(clientActions.deleteClientsAuthorization(info[authIndex].id, params.id))
    }

    let clientAuthorizationServiceItem = (item, index) => {
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
                                 // setDelEdit(true)
                                 // setToggleModal(!toggleModal)
                                 // setIndex(index)

                             }}/>
                        <img src={Images.remove} alt="delete" className={classes.iconDeleteStyle}
                             onClick={(e) => {
                                 e.stopPropagation()
                                 // setDelEdit(false)
                                 // setToggleModal(!toggleModal)
                                 // setIndex(index)
                             }}/>
                    </>
                </TableCell>
            </TableBodyComponent>
        )
    }


    let errorMessage = success ? 'Successfully Deleted'  : 'Something went wrong'

    return (
        <div className={classes.staffGeneralWrapper}>
            <Toast
                type={'success'}
                text={errorMessage}
                info={success}/>
            <SimpleModal
                handleOpenClose={() => setToggleModal(!toggleModal)}
                openDefault={toggleModal}
                content={delEdit ?
                    <AddAuthorization fundingId={info[authIndex].funderId._id} info={info[authIndex]}
                                      handleClose={() => setToggleModal(!toggleModal)}/>
                    : <DeleteElement
                        info={`Delete ${info[authIndex].authId}`}
                        handleClose={() => setToggleModal(!toggleModal)}
                        handleDel={alert}
                    />
                }
            />
            <SimpleModal
                handleOpenClose={() => setToggleModal2(!toggleModal2)}
                openDefault={toggleModal2}
                content={
                <AddAuthorizationService handleClose={() => setToggleModal2(!toggleModal2)} fundingId={info[authIndex].funderId._id} />
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
                active={authIndex}
                click={setAuthIndex}
            />
            <div className={classes.clearBoth}/>
            <div className={classes.notesWrap}>
                <AuthHeader setDelEdit={setDelEdit} info={info[authIndex]}  setToggleModal={setToggleModal} toggleModal={toggleModal}/>
                <div className={classes.authorizationServices}>
                    <p className={classes.authorizationServicesTitle}>Authorization Services</p>
                    <div className={classes.authorizationServicesRight}>
                        <img src={Images.addHours} alt="" className={classes.iconStyle}
                             onClick={() => setToggleModal2(!toggleModal2)}/>
                        <p onClick={() => setToggleModal2(!toggleModal2)} className={classes.authorizationServicesText}>Add Authorization Service</p>
                    </div>
                </div>
                <Notes
                    data={info}
                    items={clientAuthorizationServiceItem}
                    headerTitles={headerTitles}
                    defaultStyle={true}/>
            </div>

        </div>
    )
}