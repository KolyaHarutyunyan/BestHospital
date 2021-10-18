import React, {useState} from "react";
import {Notes, SlicedText, TableBodyComponent} from "@eachbase/components";
import {TableCell} from "@material-ui/core";
import {Images} from "@eachbase/utils";
import {serviceSingleStyles} from './styles';

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

const data = [{
    payCode: 'Name',
    type: 'Hourly',
    id: '12345',
    startDate: '10/10/10',
    endDate: '11/11/11',
    totalAmount: '$160'
}]

const dataBcba = [
    {
        rateType: 'Regular',
        rate: '$10',
        hours: '8 h',
        amount: '$80',
    },
]

export const StaffTimesheet = () => {

    const classes = serviceSingleStyles()


    const [active, setActive] = useState('active')

    const timesheetItem = (item, index) => {
        return (
            <TableBodyComponent key={index}>
                <TableCell>
                    <SlicedText size={30} type={'name'} data={item.payCode}/>
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.startDate}</TableCell>
                <TableCell>{item.endDate}</TableCell>
                <TableCell>{item.totalAmount}</TableCell>
            </TableBodyComponent>
        )
    }

    const bcbaItem = (item, index) => {
        return (
            <TableBodyComponent key={index}>
                <TableCell><SlicedText size={30} type={'name'} data={item.rateType}/></TableCell>
                <TableCell>{item.rate}</TableCell>
                <TableCell>{item.hours}</TableCell>
                <TableCell>{item.amount}</TableCell>
            </TableBodyComponent>
        )
    }

    return (
        <>
            <div className={classes.switcher}>
                <p className={ active === 'active' ? classes.switcherActive :  classes.switcherProcessed} onClick={()=> setActive('active') }>Active</p>
                <p className={active === 'processed' ? classes.switcherActive :  classes.switcherProcessed} onClick={()=> setActive('processed') }>Processed</p>
            </div>

            <div className={classes.timesheetWrapper}>
                <Notes
                    restHeight='560px'
                    data={data}
                    items={timesheetItem}
                    headerTitles={headerTitles}
                    defaultStyle={true}
                />
                <div className={classes.bcbaWrapper}>
                    <div className={classes.bcbaHeader}>
                        <h1>BCBA (hourly)</h1>
                        <div className={classes.dateEdite}>
                            <p>04/21/2021 - 04/27/2017</p>
                            <img src={Images.edit} alt="edit"/>
                        </div>
                    </div>
                    <p>Office Supply reimbursement</p>
                    <Notes
                        restHeight='560px'
                        data={dataBcba}
                        items={bcbaItem}
                        headerTitles={headerTitlesBcba}
                        defaultStyle={true}
                    />
                    <div className={classes.amountContainer}>
                        <p>Total hours: <span className={classes.hours}>13hrs</span></p>
                        <p>Total Amount <span className={classes.amount}>$160</span></p>
                    </div>
                </div>
            </div>
        </>
    )
}