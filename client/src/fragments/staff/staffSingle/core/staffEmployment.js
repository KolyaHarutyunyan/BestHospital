import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {TableCell} from "@material-ui/core";
import {Card, DeleteElement, Notes, SimpleModal, TableBodyComponent} from '@eachbase/components';
import {EmploymentModal, PaycodeModal} from "./modals";
import {AuthHeader} from "@eachbase/components/headers/auth/authHeader";
import {Colors, Images} from "@eachbase/utils";
import {adminActions, clientActions, httpRequestsOnErrorsActions, httpRequestsOnSuccessActions} from "@eachbase/store";
import {serviceSingleStyles} from "@eachbase/fragments/client/clientSingle/core";


export const StaffEmployment = ({setAuthActive,  info}) => {
    const classes = serviceSingleStyles()
    const dispatch = useDispatch()
    const [delEdit, setDelEdit] = useState(null)
    const [delEdit2, setDelEdit2] = useState(null)
    const [toggleModal, setToggleModal] = useState(false)
    const [toggleModal2, setToggleModal2] = useState(false)
    const [toggleModal3, setToggleModal3] = useState(false)
    const [authIndex, setAuthIndex] = useState(0)
    const [paycodeIndex, setPaycodeIndex] = useState(0)
    const [serviceIndex, setServiceIndex] = useState(null)
    const services = useSelector(state => state.client.clientsAuthorizationsServices)
    const payCodes = useSelector(state => state.admins.payCodes)
    const params = useParams()

    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));

    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_CLIENT_AUTHORIZATION'
    const successDelServ = httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_CLIENT_AUTHORIZATION_SERV'


    useEffect(() => {
        dispatch(adminActions.getPayCode(info[authIndex]?.id))
    }, [authIndex])

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

    const headerTitles = [
        {
            title: 'Name',
            sortable: false
        },
        {
            title: 'Code',
            sortable: false
        },
        {
            title: 'Type',
            sortable: false
        },
        {
            title: 'Rate',
            sortable: false,
        },
        {
            title: 'Start Date',
            sortable: true,
        },
        {
            title: 'End Date',
            sortable: true,
        },
        {
            title: 'Status',
            sortable: false,
        },
    ];
    let deleteAuthorization = () => {
        dispatch(clientActions.deleteClientsAuthorization(info[authIndex].id, params.id))
        // setAuthIndex(0)
    }

    let payCodeItem = (item, index) => {
        return (
            <TableBodyComponent key={index} handleOpenInfo={() => {
                setPaycodeIndex(index)
                setToggleModal3(!toggleModal3)

            }}>
                <TableCell><p className={classes.tableName}>{item.payCodeTypeId.name}</p></TableCell>
                <TableCell>  {item.payCodeTypeId.code} </TableCell>
                <TableCell> {item.payCodeTypeId.type} </TableCell>
                <TableCell>{item.rate} </TableCell>
                <TableCell>{moment(item.startDate).format('DD MM YYYY')} </TableCell>
                <TableCell>{moment(item.endDate).format('DD MM YYYY')} </TableCell>
                <TableCell>{Number(item.active)} </TableCell>
            </TableBodyComponent>
        )
    }

    return (
        <div className={classes.staffGeneralWrapper}>
            <SimpleModal
                handleOpenClose={() => setToggleModal(!toggleModal)}
                openDefault={toggleModal}
                content={delEdit ?
                    <EmploymentModal
                        fundingId={info[authIndex]?.funderId?._id}
                        info={info[authIndex]}
                        handleClose={() => setToggleModal(!toggleModal)}/>
                    : <DeleteElement
                        loader={httpOnLoad.length > 0}
                        handleClose={() => setToggleModal(!toggleModal)}
                        handleDel={deleteAuthorization}
                    />
                }
            />
            <SimpleModal
                handleOpenClose={() => setToggleModal2(!toggleModal2)}
                openDefault={toggleModal2}
                content={

                    <PaycodeModal employmentId={info[authIndex]?.id}  authId={info[authIndex]?.id}
                                  handleClose={() => setToggleModal2(!toggleModal2)}   />
                }
            />
            <SimpleModal
                handleOpenClose={() => setToggleModal3(!toggleModal3)}
                openDefault={toggleModal3}
                content={
                    <PaycodeModal
                        info={payCodes && payCodes[paycodeIndex]}
                        employmentId={info[authIndex]?.id}
                        handleClose={() => setToggleModal3(!toggleModal3)}/>
                }
            />
            <Card
                employment={true}
                width='234px'
                cardInfo={info}
                showHeader={true}
                hideHeaderLine={false}
                title='Employments'
                color={Colors.ThemeBlue}
                icon={Images.employment}
                auth={true}
                active={authIndex}
                click={setAuthIndex}
            />
            <div className={classes.clearBoth}/>
            <div className={classes.notesWrap}>
                <AuthHeader empoloyment={true} setDelEdit={setDelEdit} info={info[authIndex]}
                            setToggleModal={setToggleModal} toggleModal={toggleModal}/>
                <div className={classes.authorizationServices}>
                    <p className={classes.authorizationServicesTitle}>Paycodes</p>
                    <div className={classes.authorizationServicesRight}>
                        <img src={Images.addHours} alt="" className={classes.iconStyle}
                             onClick={() => setToggleModal2(!toggleModal2)}/>
                        <p onClick={() => setToggleModal2(!toggleModal2)}
                           className={classes.authorizationServicesText}>Add Paycode</p>
                    </div>
                </div>
                <Notes
                    restHeight='560px'
                    data={payCodes}
                    items={payCodeItem}
                    headerTitles={headerTitles}
                    defaultStyle={true}/>
            </div>
        </div>
    )
}