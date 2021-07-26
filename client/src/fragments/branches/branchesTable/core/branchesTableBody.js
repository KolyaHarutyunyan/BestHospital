import React from "react";
import {
    Switcher,
    TableBodyComponent,
} from "@eachbase/components";
import {TableCell} from "@material-ui/core";
import {Images, useGlobalStyles} from "@eachbase/utils";
import {branchesFragments} from "./styles";
import {useDispatch} from "react-redux";

export const BranchesTableBody = ({key, data}) => {
    const classes = branchesFragments();
    const globalClasses = useGlobalStyles()
    const dispatch = useDispatch()

    return (
        <TableBodyComponent key={key}>
            <TableCell>
                <div className={globalClasses.InfoAndImage}>
                    <img src={Images.branchGreen} alt={"Offices Icon"}/>
                    <p>{data.name}</p>
                </div>
            </TableCell>
            <TableCell>{data.name}</TableCell>
            <TableCell>Amanda Johnson</TableCell>
            <TableCell>{data.email}</TableCell>
            <TableCell>{data.phoneNumber}</TableCell>
        </TableBodyComponent>
    )
};
