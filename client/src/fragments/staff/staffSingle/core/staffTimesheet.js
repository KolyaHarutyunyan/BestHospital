import React, {useState} from "react";
import {Loader, Notes, SimpleModal, SlicedText, TableBodyComponent} from "@eachbase/components";
import {TableCell} from "@material-ui/core";
import {FindLoad, Images} from "@eachbase/utils";
import {serviceSingleStyles} from './styles';
import moment from "moment";
import {TimesheetModal} from "./modals";
import {useDispatch, useSelector} from "react-redux";
import {adminActions} from "../../../../store";

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
    const allPaycodes = useSelector(state => state.admins.allPaycodes)
    const [openModal, setOpenModal] = useState(false)


    const classes = serviceSingleStyles()
    const [active, setActive] = useState('active')
    const [index, setIndex] = useState(0)


    const handleOpenClose = () => {
        setOpenModal(!openModal)
    }
    const handleOpen = (item) => {
        dispatch(adminActions.getTimesheetById(item.id))
    }


    const {timesheetById} = useSelector((state) => ({
        timesheetById: state.admins.timesheetById
    }));

    const loader = FindLoad('GET_TIMESHEET_BY_ID')

    const timesheetItem = (item, index) => {
        return (
            <TableBodyComponent key={index}
                                handleOpenInfo={() => handleOpen(item)}
                // handleOpenInfo={()=>setIndex(index)}
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
                <TableCell><SlicedText size={30} type={'name'} data={item?.payCode?.payCodeTypeId?.type}/></TableCell>
                <TableCell>{item?.payCode?.rate}</TableCell>
                <TableCell>{item?.hours}</TableCell>
                <TableCell>{item.totalAmount}</TableCell>
            </TableBodyComponent>
        )
    }

    console.log(timesheetById,'timesheetByIdtimesheetById')

    return (
        <>
            <SimpleModal
                openDefault={openModal}
                handleOpenClose={handleOpenClose}
                content={<TimesheetModal
                    info={info[index]}
                    handleClose={handleOpenClose} allPaycodes={allPaycodes}
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
                    restHeight='560px'
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
                                <h1>
                                    <SlicedText size={30} type={'name'} data={timesheetById ? timesheetById.payCode && timesheetById.payCode.name : ''}/>
                                </h1>
                                <div className={classes.dateEdite}>
                                    <p>{timesheetById ? `${moment(timesheetById.startDate).format('DD/MM/YYYY')} - ${moment(timesheetById.endDate).format('DD/MM/YYYY')}` : ''}</p>
                                    <img src={Images.edit} alt="edit" onClick={handleOpenClose}/>
                                </div>
                            </div>
                            <p>{timesheetById ? timesheetById.description : ''}</p>
                            {timesheetById.overtimes.length ?
                            <Notes
                                restHeight='560px'
                                data={info}
                                items={bcbaItem}
                                headerTitles={headerTitlesBcba}
                                defaultStyle={true}
                            />:""}
                            <div className={classes.amountContainer}>
                                <p>Total hours: <span className={classes.hours}>{timesheetById ? `${timesheetById.hours} hrs` : ''}</span></p>
                                <p>Total Amount: <span className={classes.amount}>{timesheetById ? `$${timesheetById.totalAmount}` : ''}</span></p>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}