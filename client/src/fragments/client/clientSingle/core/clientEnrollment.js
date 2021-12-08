import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import moment from "moment";
import {Card, DeleteElement, MinLoader, Notes, SimpleModal, TableBodyComponent} from '@eachbase/components';
import {serviceSingleStyles} from './styles';
import {Colors, FindLoad, Images} from "@eachbase/utils";
import {Radio, TableCell} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AddEnrollment} from "../../clientModals";
import {clientActions, httpRequestsOnErrorsActions, httpRequestsOnSuccessActions} from "@eachbase/store";

export const ClientEnrollment = ({data, info}) => {
    const classes = serviceSingleStyles()
    const [toggleModal, setToggleModal] = useState(false)
    const [indexItem, setIndex] = useState(null)
    const [delEdit, setDelEdit] = useState(null)
    const dispatch = useDispatch()
    const params = useParams()
    const generalInfo = [
        {title: 'First Name', value: data?.firstName},
        {title: 'Middle Name', value: data?.middleName},
        {title: 'Last Name', value: data?.lastName},
        {title: 'Code', value: data?.code},
    ]

    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));

    const headerTitles = [
        {title: 'Primary', sortable: false},
        {title: 'Funding Source', sortable: true},
        {title: 'Client ID', sortable: false},
        {title: 'Start Date', sortable: true},
        {title: 'Terminated...', sortable: true},
        {title: 'Action', sortable: false,},
    ];

    let deleteEnrollment = () => {
        dispatch(clientActions.deleteClientEnrollment(info[indexItem].id, params.id))
        dispatch(httpRequestsOnErrorsActions.removeError('GET_CLIENT_ENROLMENT'))
    }

    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_CLIENT_ENROLLMENT'

    const loader = FindLoad('EDIT_CLIENT_ENROLLMENT')
    useEffect(() => {
        if (success) {
            setToggleModal(!toggleModal)
            dispatch(httpRequestsOnSuccessActions.removeSuccess('DELETE_CLIENT_ENROLLMENT'))
            dispatch(httpRequestsOnErrorsActions.removeError('GET_CLIENT_ENROLLMENT'))
            dispatch(httpRequestsOnErrorsActions.removeError('DELETE_CLIENT_ENROLLMENT'))

        }
    }, [success])

    let editPrimary = i => {
        setIndex(i)
        dispatch(clientActions.editClientEnrollment({primary: true}, params.id, info[i].funderId._id, info[i].id))
    }


    let enrollmentsItem = (item, index) => {
        let startDate = moment(item?.startDate).format('DD/MM/YYYY')
        let terminationDate =item.terminationDate ? moment(item?.terminationDate).format('DD/MM/YYYY') : 'Present'

        return (
            <TableBodyComponent key={index} >
                <TableCell>
                    {loader.length ?
                        indexItem === index &&
                        <div className={classes.loadStyle}>
                          <MinLoader margin={'0'} color={Colors.BackgroundBlue}/>
                        </div>
                        :
                        <Radio onChange={e => {
                            e.stopPropagation()
                            editPrimary(index)
                        }} checked={item.primary} classes={{root: classes.radio, checked: classes.checked}}/>
                    }
                </TableCell>
                <TableCell>  {item.funderId?.name}  </TableCell>
                <TableCell><p className={classes.tableID}>{item?.clientId}</p></TableCell>
                <TableCell>  {startDate}  </TableCell>
                <TableCell>  {terminationDate}  </TableCell>
                <TableCell>
                    <div style={{marginTop : 10}}>
                        <img src={Images.edit} alt="edit" className={classes.iconStyle}
                             onClick={e => {
                                 e.stopPropagation()
                                 setDelEdit(true)
                                 setToggleModal(!toggleModal)

                                 setIndex(index)
                             }}/>
                        {!item.primary &&  <img src={Images.remove} alt="delete" className={classes.iconDeleteStyle}
                                                  onClick={e => {
                                                      e.stopPropagation()
                                                      setDelEdit(false)
                                                      setToggleModal(!toggleModal)
                                                      setIndex(index)
                                                  }}/>}
                    </div>
                </TableCell>
            </TableBodyComponent>
        )
    }

    return (
        <div className={classes.staffGeneralWrapper}>
            <SimpleModal
                handleOpenClose={() => setToggleModal(!toggleModal)}
                openDefault={toggleModal}
                content={delEdit ? <AddEnrollment info={info[indexItem]} handleClose={() => setToggleModal(!toggleModal)}/>
                    : <DeleteElement
                        loader={httpOnLoad.length > 0}
                        info={'Delete Enrollment'}
                        handleClose={() => setToggleModal(!toggleModal)}
                        handleDel={deleteEnrollment}
                    />
                }
            />
            <Card
                width='32.5%'
                cardInfo={generalInfo}
                showHeader={true}
                title='General Info'
                color={Colors.BackgroundBlue}
                icon={Images.generalInfoIcon}
            />
            <div className={classes.clearBoth}/>
            <div className={classes.notesWrap}>
                <Notes
                    restHeight='360px'
                    data={info}
                    items={enrollmentsItem}
                    headerTitles={headerTitles}
                    defaultStyle={true}/>
            </div>
        </div>
    )
}