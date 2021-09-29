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
import {deleteClientsAuthorizationServ, editClientsAuthorizationsServ} from "../../../../store/client/client.action";

export const ClientAuthorization = ({info, setAuthActive, setAuthItemIndex, }) => {
    const classes = serviceSingleStyles()
    // const clientsAuthorizations = useSelector(state => state.client.clientsAuthorizations)


    const dispatch = useDispatch()
    const [openClose, setOpenClose] = useState(false)
    const [index, setIndex] = useState(null)
    const [delEdit, setDelEdit] = useState(null)
    const [delEdit2, setDelEdit2] = useState(null)
    const [toggleModal, setToggleModal] = useState(false)
    const [toggleModal2, setToggleModal2] = useState(false)
    const [toggleModal3, setToggleModal3] = useState(false)
    const [authIndex, setAuthIndex] = useState(0)
    const [serviceIndex, setServiceIndex] = useState(null)
    const services = useSelector(state => state.client.clientsAuthorizationsServices)


    const params = useParams()



    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));


    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_CLIENT_AUTHORIZATION'
    const successDelServ = httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_CLIENT_AUTHORIZATION_SERV'


    useEffect(()=>{
        dispatch(clientActions.getClientsAuthorizationsServ(info[authIndex].id))
    },[authIndex])


    useEffect(() => {
        if (success) {
            setToggleModal(!toggleModal)
            dispatch(httpRequestsOnSuccessActions.removeSuccess('DELETE_CLIENT_AUTHORIZATION'))
            dispatch(httpRequestsOnErrorsActions.removeError('GET_CLIENT_AUTHORIZATION'))
        }
    }, [success,])

    useEffect(() => {

        if (successDelServ) {
             setToggleModal3(!toggleModal3)
            dispatch(httpRequestsOnSuccessActions.removeSuccess('DELETE_CLIENT_AUTHORIZATION_SERV'))
            dispatch(httpRequestsOnErrorsActions.removeError('GET_CLIENT_AUTHORIZATION_SERV'))
        }
    }, [successDelServ])

    console.log(httpOnSuccess,'auth eeeej  modal onssssssucessss')

    // useEffect(() => {
    //     dispatch(clientActions.getClientsAuthorizationsServ(info[authIndex].id))
    // }, [])

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
        // {
        //     title: 'Completed Units',
        //     sortable: false
        // },
        // {
        //     title: 'Available Units',
        //     sortable: false
        // },
        // {
        //     title: 'Percent Utilization',
        //     sortable: false
        // },
        {
            title: 'Action',
            sortable: false,
        },
    ];


    let deleteAuthorization = () => {
        dispatch(clientActions.deleteClientsAuthorization(info[authIndex].id, params.id))
        setAuthIndex(0)
    }

    let deleteAuthorizationServ = () => {
        console.log(info[authIndex].id,'auth id')
        dispatch(clientActions.deleteClientsAuthorizationServ(services[serviceIndex].id, info[authIndex].id ))
        // setServiceIndex(0)
    }

    let clientAuthorizationServiceItem = (item, index) => {
        return (
            <TableBodyComponent key={index} handleClick={() => {
                setAuthItemIndex(index)
                setAuthActive(true)

            }}>
                <TableCell><p className={classes.tableName}>{item?.serviceId?.name}</p></TableCell>
                <TableCell>  {item?.modifiers && item?.modifiers.length>0 && item?.modifiers[0]}  </TableCell>
                <TableCell>  {item?.total}  </TableCell>
                {/*<TableCell>  N/A  </TableCell>*/}
                {/*<TableCell>  N/A  </TableCell>*/}
                {/*<TableCell>  N/A  </TableCell>*/}
                <TableCell>
                    <>
                        <img src={Images.edit} alt="edit" className={classes.iconStyle}
                             onClick={(e) => {
                                 e.stopPropagation()
                                  setDelEdit2(true)
                                 setServiceIndex(index)
                                 setToggleModal3(!toggleModal3)

                             }}/>
                        <img src={Images.remove} alt="delete" className={classes.iconDeleteStyle}
                             onClick={(e) => {
                                 e.stopPropagation()
                                 setDelEdit2(false)
                                 setServiceIndex(index)
                                  setToggleModal3(!toggleModal3)
                             }}/>
                    </>
                </TableCell>
            </TableBodyComponent>
        )
    }


    // let errorMessage = success ? 'Successfully Deleted'  : 'Something went wrong'

    return (
        <div className={classes.staffGeneralWrapper}>
            {/*<Toast*/}
            {/*    type={'success'}*/}
            {/*    text={errorMessage}*/}
            {/*    info={success}/>*/}
            <SimpleModal
                handleOpenClose={() => setToggleModal(!toggleModal)}
                openDefault={toggleModal}
                content={delEdit ?
                    <AddAuthorization fundingId={info[authIndex].funderId._id} info={info[authIndex]}
                                      handleClose={() => setToggleModal(!toggleModal)}/>
                    : <DeleteElement
                        loader={httpOnLoad.length > 0}
                         info={`Delete ${info[authIndex].authId}`}
                        handleClose={() => setToggleModal(!toggleModal)}
                        handleDel={deleteAuthorization}
                    />
                }
            />
            <SimpleModal
                handleOpenClose={() => setToggleModal2(!toggleModal2)}
                openDefault={toggleModal2}
                content={
                <AddAuthorizationService   authId={info[authIndex].id} handleClose={() => setToggleModal2(!toggleModal2)}  fundingId={info[authIndex].funderId._id} />
                }

            />
            <SimpleModal
                handleOpenClose={() => setToggleModal3(!toggleModal3)}
                openDefault={toggleModal3}
                content={ delEdit2 ?
                    <AddAuthorizationService  info={services  && services[serviceIndex]} authId={info[authIndex].id} handleClose={() => setToggleModal3(!toggleModal3)} fundingId={info[authIndex].funderId._id} />
                    : <DeleteElement
                        loader={httpOnLoad.length > 0}
                         info={`Delete ${services && services[serviceIndex]?.serviceId?.name}`}
                        handleClose={() => setToggleModal3(!toggleModal3)}
                        handleDel={deleteAuthorizationServ}
                    />
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
                    data={services}
                    items={clientAuthorizationServiceItem}
                    headerTitles={headerTitles}
                    defaultStyle={true}/>
            </div>

        </div>
    )
}