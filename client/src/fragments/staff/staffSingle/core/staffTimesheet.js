import React, {useEffect, useState} from "react";
import {Loader, Notes, SimpleModal, SlicedText, TableBodyComponent} from "@eachbase/components";
import {TableCell} from "@material-ui/core";
import {FindLoad, Images} from "@eachbase/utils";
import {serviceSingleStyles} from './styles';
import moment from "moment";
import {TimesheetModal} from "./modals";
import {useDispatch, useSelector} from "react-redux";
import {adminActions} from "../../../../store";
import {useParams} from "react-router-dom";

const headerTitles = [
    {
        title: 'PayCode',
        sortable: false
    },
    {
        title: 'Type',
        sortable: true
    },
    {
        title: 'ID',
        sortable: true
    },
    {
        title: 'Start Date',
        sortable: true
    },
    {
        title: 'End Date',
        sortable: true
    },
    {
        title: 'Total Amount',
        sortable: false
    },
];

const headerTitlesBcba = [
    {
        title: 'Rate Type',
        sortable: false
    },
    {
        title: 'Rate',
        sortable: false
    },
    {
        title: 'Hours',
        sortable: false
    },
    {
        title: 'Amount',
        sortable: false
    }
];

// const data = [{
//     payCode: 'Name',
//     type: 'Hourly',
//     id: '12345',
//     startDate: '10/10/10',
//     endDate: '11/11/11',
//     totalAmount: '$160'
// }]
//
// const dataBcba = [
//     {
//         rateType: 'Regular',
//         rate: '$10',
//         hours: '8 h',
//         amount: '$80',
//     },
// ]

export const StaffTimesheet = ({info}) => {
    const dispatch = useDispatch()
    const params = useParams()
    const allPaycodes = useSelector(state => state.admins.allPaycodes)
    const [openModal, setOpenModal] = useState(false)

    const [serviceIndex, setServiceIndex] = useState(0)

    const classes = serviceSingleStyles()
    const [active, setActive] = useState('active')
    const [index, setIndex] = useState(0)
    const [item, setItem] = useState('')


    const handleOpenClose = () => {
        setOpenModal(!openModal)
        setItem('')
    }

    const handleEditClose = (item) => {
        setOpenModal(!openModal)
        setItem(item)
    }

    const handleOpen = (item, index) => {
        setServiceIndex(index)
        dispatch(adminActions.getTimesheetById(item.id))
    }

    const {timesheetById} = useSelector((state) => ({
        timesheetById: state.admins.timesheetById
    }));

    useEffect(() => {
        if (info.length) {
            dispatch(adminActions.getTimesheetById(info[0].id))
        }
    }, [dispatch])

    const loader = FindLoad('GET_TIMESHEET_BY_ID')

    const timesheetItem = (item, index) => {
        return (
            <TableBodyComponent active={index === serviceIndex} key={index}
                                handleOpenInfo={() => handleOpen(item, index)}
            >
                <TableCell>
                    <SlicedText size={30} type={'name'} data={item?.payCode?.payCodeTypeId?.name}/>
                </TableCell>
                <TableCell>{item?.payCode?.payCodeTypeId?.type}</TableCell>
                <TableCell><p style={{width: 50, overflow: 'hidden',}}>{item?.id}</p></TableCell>
                <TableCell>{moment(item?.startDate).format('DD/MM/YYYY')}</TableCell>
                <TableCell>{info ? item.endDate === null ? 'Present' :
                    moment(item?.endDate).format('DD/MM/YYYY')
                    : moment(item?.endDate).format('DD/MM/YYYY')}</TableCell>
                <TableCell>{`$${item?.totalAmount}`}</TableCell>
            </TableBodyComponent>
        )
    }

    const bcbaItem = (item, index) => {
        return (
            <TableBodyComponent key={index}>
                <TableCell>
                    <SlicedText size={30} type={'name'}
                                data={item.description ? item?.payCode?.payCodeTypeId?.type : item ? item.rateType : ''}
                                // data={item.description ? item?.payCode?.payCodeTypeId?.type : ''}
                    />
                </TableCell>
                <TableCell>{
                    `$${item.amount && item.hours ? item.amount / item.hours : timesheetById?.payCode?.rate }`
                }</TableCell>
                <TableCell>{item.regularHours ? item.regularHours : item?.hours}</TableCell>
                <TableCell>{item.description ? `$${item.totalAmount}` : `$${item?.amount}`}</TableCell>
            </TableBodyComponent>
        )
    }

    useEffect(() =>{
       return()=>(dispatch(adminActions.clearAllPaycodes()))
    },[])

    return (
        <>
            <SimpleModal
                openDefault={openModal}
                handleOpenClose={handleOpenClose}
                content={
                    <TimesheetModal
                        // setIndex={() => setServiceIndex(0)}
                        info={item}
                        handleClose={handleOpenClose}
                        allPaycodes={allPaycodes}
                    />}
            />
            <div className={classes.switcher}>
                <p className={active === 'active' ? classes.switcherActive : classes.switcherProcessed}
                   onClick={() => setActive('active')}>Active</p>
                <p className={active === 'processed' ? classes.switcherActive : classes.switcherProcessed}
                   onClick={() => setActive('processed')}>Processed</p>
            </div>

            <div className={classes.timesheetWrapper}>
                <Notes
                    restHeight='460px'
                    data={info}
                    items={timesheetItem}
                    headerTitles={headerTitles}
                    defaultStyle={true}
                />
                <div className={classes.bcbaWrapper}>
                    {!!loader.length ?
                        <Loader style={'flex'}/>
                        :
                        <>
                            <div className={classes.bcbaHeader}>
                                <SlicedText size={30}
                                            type={'name'}
                                            data={timesheetById ? timesheetById.payCode && timesheetById.payCode.name : ''}
                                />
                                <div className={classes.dateEdite}>
                                    <p>
                                        {timesheetById ?
                                            `${moment(timesheetById.startDate).format('DD/MM/YYYY')} - ${timesheetById.endDate ? moment(timesheetById.endDate).format('DD/MM/YYYY') : 'Present'}`
                                            : ''}
                                    </p>
                                    <img src={Images.edit} alt="edit" onClick={() => handleEditClose(timesheetById)}/>
                                </div>
                            </div>
                            <p>{timesheetById ? timesheetById.description : ''}</p>

                            <div style={{height:'250px'}}>
                            {timesheetById &&
                              timesheetById.overtimes ?
                                <Notes
                                    restHeight='560px'
                                    data={timesheetById.overtimes.length > 0 ?
                                        timesheetById.regularHours > 0 ? [{
                                            amount: timesheetById.regularPay,
                                            hours: timesheetById.regularHours,
                                            name: "Regular",
                                            rateType: "Regular",
                                        },
                                        ...timesheetById.overtimes
                                    ] :
                                            timesheetById.overtimes
                                        : [{...timesheetById}]}
                                    items={bcbaItem}
                                    headerTitles={headerTitlesBcba}
                                    defaultStyle={true}
                                /> :
                                ""}

                            </div>

                            {/*{timesheetById && timesheetById.overtimes && timesheetById.overtimes.length > 0 &&*/}
                            {/*<TableBodyComponent>*/}
                            {/*    <TableCell>*/}
                            {/*        <SlicedText size={30} type={'name'} data={'Regular'}/>*/}
                            {/*    </TableCell>*/}
                            {/*    <TableCell>{`$${timesheetById.regularPay && timesheetById.regularHours ? timesheetById.regularPay / timesheetById.regularHours :''}`}</TableCell>*/}
                            {/*    <TableCell>{timesheetById.regularHours}</TableCell>*/}
                            {/*    /!*<TableCell>{item.description ? `$${item.totalAmount}` : `$${item?.amount}`}</TableCell>*!/*/}
                            {/*</TableBodyComponent>*/}
                            {/*}*/}



                            <div className={classes.amountContainer}>
                                <p>Total hours:
                                    <span className={classes.hours}>{timesheetById ?
                                        `${timesheetById.hours ? timesheetById.hours : timesheetById.regularHours ? timesheetById.regularHours : ''} hrs`
                                        : ''}
                                    </span>
                                </p>
                                <p>Total Amount: <span
                                    className={classes.amount}>{timesheetById ? `$${timesheetById.totalAmount}` : ''}</span>
                                </p>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}