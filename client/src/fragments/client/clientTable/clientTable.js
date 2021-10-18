import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Paper, Table, TableContainer} from "@material-ui/core";
import {ClientTableBody, ClientTableHead} from "./core";
import {useGlobalStyles} from "@eachbase/utils";
import {Loader, NoItemText, PaginationItem} from "@eachbase/components";
import {clientActions} from "@eachbase/store";


export const ClientTable = ({setOpen, handleClose, setDeleteClient, handleGetPage, status}) => {
    const globalStyle = useGlobalStyles();
    const [page, setPage] = useState(1);
    const dispatch = useDispatch()

    const {clientList, httpOnLoad, httpOnSuccess, httpOnError} = useSelector((state) => ({
        clientList: state.client.clientList,
        httpOnLoad: state.httpOnLoad,
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
    }));

    const changePage = number => {
        let start = number > 1 ? (number - 1) + '0' : 0
        setPage(number,)
        dispatch(clientActions.getClients({status: status, start: start, end: 10}))
        handleGetPage(start)
    };

    return (
        <div className={globalStyle.tableWrapper}>
            {clientList && clientList.count > 0 ?  <TableContainer component={Paper} style={{height: 'calc(100vh - 250px)'}}>
                <Table
                    stickyHeader
                    className={globalStyle.table}
                    size="small"
                    aria-label="a dense table"
                >
                    <ClientTableHead />
                    {httpOnLoad.length ?
                        <Loader/>
                        :
                        clientList?.clients?.map((item, i) => (
                            <ClientTableBody
                                data={item}
                                index={i}
                                setOpen={setOpen}
                                handleClose={handleClose}
                                setDeleteClient={setDeleteClient}
                            />
                        ))}
                </Table>


            </TableContainer> : <NoItemText text={'No Clients Yet'}/> }
            {clientList?.clients &&     <PaginationItem
                listLength={clientList?.clients?.length}
                page={page}
                handleReturn={(number) => changePage(number)}
                count={clientList?.count}
                entries={clientList?.clients?.length}
            />}
        </div>
    );
}
