import React, {useEffect, useState} from "react";
import {Paper, Table, TableContainer} from "@material-ui/core";
import {FundingSourceTableBody, FundingSourceTableHead} from "./core";
import {useGlobalStyles} from "@eachbase/utils";
import {useDispatch, useSelector} from "react-redux";
import {Loader, PaginationItem, Toast} from "@eachbase/components";
import {fundingSourceActions, httpRequestsOnSuccessActions} from "@eachbase/store";




export const FundingSourceTable = ({status, handleGetPage}) => {
    const globalStyle = useGlobalStyles();
    const [page, setPage] = useState(1);
    const dispatch = useDispatch()
    const {fundingSourceList, httpOnLoad,httpOnSuccess, httpOnError} = useSelector((state) => ({
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




    const successCreate = httpOnSuccess.length && httpOnSuccess[0].type === 'CREATE_FUNDING_SOURCE'
    let errorMessage = successCreate ? 'Successfully added' : 'Something went wrong'

    return (
        <div className={globalStyle.tableWrapper}>
            <TableContainer className={globalStyle.tableContainer} component={Paper}>
                <Table
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
                <PaginationItem
                    listLength={fundingSourceList?.funders?.length}
                    page={page}
                    handleReturn={(number) => changePage(number)}
                    count={fundingSourceList?.count}
                    entries={fundingSourceList?.funders?.length}
                />
            </TableContainer>
            <Toast
                type={'success'}
                text={errorMessage}
                info={successCreate}/>

        </div>
    );
};


