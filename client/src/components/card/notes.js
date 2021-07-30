import React, {useState} from "react";
import {Table, TableCell, TableContainer} from "@material-ui/core";
import {useGlobalStyles} from "@eachbase/utils";
import {TableBodyComponent, TableHeadComponent} from "@eachbase/components";

import {SearchAndFilter} from "../inputs";
import {useSelector} from "react-redux";
import {PaginationItem} from "../pagination";

import { makeStyles } from "@material-ui/core/styles";

export const Notes = ({headerTitles, bodyTitles}) => {

    const officesStyle = makeStyles(() => ({
        thWidth: {
            '&:last-child': {
                width: '7%'
            },
            '&:nth-last-child(2)': {
                width: '58%'
            },
        },
    }));

    const classes = officesStyle()

    const globalStyle = useGlobalStyles();

    const [page, setPage] = useState(1);
    const {officesList} = useSelector((state) => ({
        officesList: state.offices.officesList,
        httpOnLoad: state.httpOnLoad,
    }));
    const changePage = (number) => {
        setPage(number);
    };
    // const list = officesList && officesList.length && officesList[page - 1]

    return (
        <div className={globalStyle.tableWrapper}>
            <TableContainer>
                <Table
                    className={globalStyle.table}
                    size="small"
                    aria-label="a dense table"
                >
                    <TableHeadComponent>
                        {
                            headerTitles && headerTitles.map((headerItem, index) => {
                                return (
                                    <TableCell key={index} className={classes.thWidth}>
                                        <SearchAndFilter title={headerItem.title} custom={headerItem.sortable}/>
                                    </TableCell>
                                )
                            })
                        }
                    </TableHeadComponent>

                    <TableBodyComponent>
                        {
                            bodyTitles && bodyTitles.map((item, index) => {
                                return (
                                    <TableCell key={index}>{item.title}</TableCell>
                                )
                            })
                        }
                    </TableBodyComponent>
                </Table>
                <PaginationItem
                    text={`Showing 30 to 30 of 200 entries`}
                    handleReturn={(number) => changePage(number)}
                    page={page}
                    count={officesList.length}
                />
            </TableContainer>
        </div>
    )
}