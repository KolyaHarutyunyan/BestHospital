import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Table, TableCell, TableContainer} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {TableHeadComponent, SearchAndFilter, PaginationItem} from "@eachbase/components";
import {useGlobalStyles} from "@eachbase/utils";

export const Notes = ({ data, headerTitles, pagination, defaultStyle, items}) => {

    const officesStyle = makeStyles(({}) => ({
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
                                    <TableCell key={index} className={defaultStyle ? null : classes.thWidth}>
                                        <SearchAndFilter title={headerItem.title} custom={headerItem.sortable}/>
                                    </TableCell>
                                )
                            })
                        }
                    </TableHeadComponent>
                    {
                        data && data.length ? data.map((item, index) => {
                            return (
                                <>
                                    {items(item, index)}
                                </>
                            )
                        }) : null
                    }
                </Table>
                {pagination && <PaginationItem
                    text={`Showing 30 to 30 of 200 entries`}
                    handleReturn={(number) => changePage(number)}
                    page={page}
                    count={officesList.length}
                />}
            </TableContainer>
        </div>
    )
}