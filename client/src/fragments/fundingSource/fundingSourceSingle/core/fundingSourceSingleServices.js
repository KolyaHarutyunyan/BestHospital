import React  from "react";
import {Notes, TableBodyComponent} from "@eachbase/components";
import {FundingSourceSinglePTModifiers} from "./fundingSourceSinglePTModifiers";
import {Images} from "@eachbase/utils";
import {useSelector} from "react-redux";
import {TableCell} from "@material-ui/core";
import {fundingSourceSingleStyles} from "./styles";

export const FundingSourceSingleServices = () => {
    const data = useSelector(state => state.fundingSource.fundingSourceServices)
    const classes = fundingSourceSingleStyles()
    const headerTitles = [
        {
            title: 'Service',
            sortable: true
        },
        {
            title: 'CPT Code',
            sortable: false
        },
        {
            title: 'Unit Size',
            sortable: false
        },
        {
            title: 'Min Unit',
            sortable: false
        },
        {
            title: 'Max Unit',
            sortable: false
        },
        {
            title: 'Action',
            sortable: false
        },
    ];


    let serviceItem = (item, index) => {
        return (
            <TableBodyComponent key={index}>
                <TableCell><p className={classes.tableTitle}>{item.name}</p></TableCell>
                <TableCell>  {item.cptCode}  </TableCell>
                <TableCell>  {item.size}  </TableCell>
                <TableCell>  {item.min}  </TableCell>
                <TableCell>  {item.max}  </TableCell>
                <TableCell>
                    <>
                        <img src={Images.edit} alt="edit" className={classes.iconCursor} onClick={() => alert(item._id)}/>
                        <img src={Images.remove} alt="delete" className={classes.iconCursordelete} onClick={() => alert(index)}/>
                    </>
                </TableCell>
            </TableBodyComponent>
        )
    }

    return (
        <div style={{display: 'flex', justifyContent: "space-between", marginTop: 50}}>
            <div style={{marginTop: -32, width: '100%'}}>
                <Notes data={data} items={serviceItem} headerTitles={headerTitles} defaultStyle={true}/>
            </div>
            <FundingSourceSinglePTModifiers data={data?.modifiers}/>
        </div>
    )
}