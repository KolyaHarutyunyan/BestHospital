import {Card, DeleteElement, Notes, RadioButton, SimpleModal, TableBodyComponent} from '@eachbase/components';
import {serviceSingleStyles} from './styles';
import {Colors, Images} from "@eachbase/utils";
import {FormControlLabel, Radio, TableCell} from "@material-ui/core";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {AddEnrollment} from "../../clientModals";
import {clientActions} from "@eachbase/store";

export const ClientEnrollment = ({data}) => {
    const classes = serviceSingleStyles()
    const [toggleModal, setToggleModal] = useState(false)
    const [index, setIndex] = useState(null)
    const [delEdit, setDelEdit] = useState(null)
    const enrolments = useSelector(state => state.client.clientEnrollment)
    const dispatch = useDispatch()
    const generalInfo = [
        {title: 'First Name', value: data?.firstName},
        {title: 'Middle Name', value: data?.middleName},
        {title: 'Last Name', value: data?.lastName},
        {title: 'Code', value: data?.code},
    ]

    const headerTitles = [
        {
            title: 'Primary',
            sortable: false
        },
        {
            title: 'Funding Source',
            sortable: true
        },
        {
            title: 'Client ID',
            sortable: false
        },
        {
            title: 'Start Date',
            sortable: true
        },
        {
            title: 'Terminated...',
            sortable: true
        },
        {
            title: 'Action',
            sortable: false,
        },
    ];

    let deleteEnrollment = ()=>{
        dispatch(clientActions.deleteClientEnrollment(enrolments[index].id))
    }
    let editPrimary = (i)=>{
        alert(i)
    }

    let enrollmentsItem = (item, index) => {
        let startDate = moment(item?.startDate).format('DD/MM/YYYY')
        let terminationDate = moment(item?.terminationDate).format('DD/MM/YYYY')
        return (
            <TableBodyComponent key={index}>
                <TableCell>
                    <Radio onChange={()=>editPrimary(index)}  checked={item.primary} classes={{root: classes.radio, checked: classes.checked}} />
                </TableCell>
                <TableCell>  {item.funderId?.name}  </TableCell>
                <TableCell><p className={classes.tableID}>{item?.clientId}</p></TableCell>
                <TableCell>  {startDate}  </TableCell>
                <TableCell>  {terminationDate}  </TableCell>
                <TableCell>
                    <>
                        <img src={Images.edit} alt="edit" className={classes.iconStyle}
                             onClick={() => {
                                 setDelEdit(true)
                                 setToggleModal(!toggleModal)
                                 setIndex(index)

                             }}/>
                        <img src={Images.remove} alt="delete" className={classes.iconDeleteStyle}
                             onClick={() => {
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
                content={delEdit ? <AddEnrollment info={enrolments[index]} handleClose={() => setToggleModal(!toggleModal)}/>
                : <DeleteElement
                        text={'Delete Enrollment'}
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
                    data={enrolments}
                    items={enrollmentsItem}
                    headerTitles={headerTitles}
                    defaultStyle={true}/>
            </div>
        </div>
    )
}