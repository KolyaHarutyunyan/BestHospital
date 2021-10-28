import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Paper, Table, TableContainer} from "@material-ui/core";
import {FundingSourceTableBody, FundingSourceTableHead} from "./core";
import {useGlobalStyles} from "@eachbase/utils";
import {Loader, NoItemText, PaginationItem} from "@eachbase/components";
import {fundingSourceActions} from "@eachbase/store";


export const FundingSourceTable = ({status, handleGetPage}) => {
        const globalStyle = useGlobalStyles();
        const [page, setPage] = useState(1);
        const dispatch = useDispatch()
        const {fundingSourceList, httpOnLoad, httpOnSuccess, httpOnError} = useSelector((state) => ({
            fundingSourceList: state.fundingSource.fundingSourceList,
            httpOnLoad: state.httpOnLoad,
            httpOnSuccess: state.httpOnSuccess,
            httpOnError: state.httpOnError,
        }));


        const changePage = (number) => {
            let start = number > 1 ? (number - 1) + '0' : 0
            setPage(number,)
            dispatch(fundingSourceActions.getFundingSource({status: status, start: start, end: 10}))
            handleGetPage(start)
        };

        return (
            <div className={globalStyle.tableWrapper}>
                <Paper className={globalStyle.tableBack}>
                {fundingSourceList?.funders?
                    <TableContainer style={{height: `calc(100vh - ${fundingSourceList?.funders?.length ? '250px' : '150px'} )`}} className={globalStyle.tableContainer} component={Paper}>
                        <Table
                            stickyHeader
                            className={globalStyle.table}
                            size="small"
                            aria-label="a dense table"
                        >
                            <FundingSourceTableHead/>
                            {httpOnLoad.length ? <Loader/>
                                :
                                fundingSourceList?.funders && fundingSourceList.funders.map((item, i) => (
                                    <FundingSourceTableBody
                                        data={item}
                                        key={i}
                                    />
                                ))}
                        </Table>
                    </TableContainer> : <NoItemText text={'No Funding source yet'}/>
                }
                    {fundingSourceList?.funders?.length ?
                        <PaginationItem
                        listLength={fundingSourceList?.funders?.length}
                        page={page}
                        handleReturn={(number) => changePage(number)}
                        count={fundingSourceList?.count}
                        entries={fundingSourceList?.funders?.length}
                    /> : <NoItemText text={'No Funding source yet'}/>}
                </Paper>
            </div>
        );
    }
;


