import React, {useEffect} from "react";
import {PayrollSetupStyles} from '../styles';
import {Notes, SlicedText, TableBodyComponent} from "@eachbase/components";
import {TableCell} from "@material-ui/core";
import {Images} from "@eachbase/utils";
import {useDispatch, useSelector} from "react-redux";
import {payrollActions} from "@eachbase/store/payroll";

const headerTitles = [
    {
        title: 'Name',
        sortable: true
    },
    {
        title: 'Code',
        sortable: false
    },
    {
        title: 'Type',
        sortable: true
    },
    {
        title: 'Overtiming Applied',
        sortable: false
    },
    {
        title: 'PTO Accrued',
        sortable: false
    },
    {
        title: 'Action',
        sortable: false
    },
];

const data = [
    {
        name: 'name',
        code: 'code',
        type: 'type',
        overtime: 'overtime',
        pto: 'pto'
    }
]

export const PayCodeTable = () => {
    const dispatch = useDispatch()
    const classes = PayrollSetupStyles()

    const globalPayCodes = useSelector(state => state.payroll.PayCodes)
    console.log(globalPayCodes,'globalPayCodes');
    useEffect(()=>{
        dispatch(payrollActions.getPayCodeGlobal())
    },[])

    const notesItem = (item, index) => {
        return (
            <TableBodyComponent key={index}>
                <TableCell>
                    <SlicedText size={30} type={'name'} data={item.name}/>
                </TableCell>
                <TableCell>
                    {item.code}
                </TableCell>
                <TableCell>
                    {item.type}
                </TableCell>
                <TableCell>
                    {item.overtime}
                </TableCell>
                <TableCell>
                    {item.pto}
                </TableCell>
                <TableCell>{item.action ? item.action :
                    <div className={classes.icons}>
                        <img src={Images.edit} onClick={() => alert('edit')} alt="edit"/>
                        <img src={Images.remove} alt="delete"
                             onClick={() => alert('delete')}/>
                    </div>
                }
                </TableCell>
            </TableBodyComponent>
        )
    }
    return (
        <Notes defaultStyle={true} data={data} pagination={false} items={notesItem}
               headerTitles={headerTitles}/>
    )
}