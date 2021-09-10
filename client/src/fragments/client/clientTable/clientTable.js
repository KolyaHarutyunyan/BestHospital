import {Paper, Table, TableContainer} from "@material-ui/core";
import {ClientTableBody, ClientTableHead} from "./core";
import {useGlobalStyles} from "@eachbase/utils";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Loader, NoItemText, PaginationItem, Toast} from "@eachbase/components";
import {clientActions,} from "@eachbase/store";


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

    const changePage = (number) => {
        let start = number > 1 ? (number - 1) + '0' : 0
        setPage(number,)
        dispatch(clientActions.getClients({status: status, start: start, end: 10}))
        handleGetPage(start)
    };

    const successCreate = httpOnSuccess.length && httpOnSuccess[0].type === 'CREATE_CLIENT'
    let errorMessage = successCreate ? 'Successfully added' : 'Something went wrong'
    return (
        <div className={globalStyle.tableWrapper}>
            <Toast
                type={'success'}
                text={errorMessage}
                info={successCreate}/>
            {clientList ?  <TableContainer component={Paper}>
                <Table
                    className={globalStyle.table}
                    size="small"
                    aria-label="a dense table"
                >
                    <ClientTableHead/>
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

                <PaginationItem
                    listLength={clientList?.clients?.length}
                    page={page}
                    handleReturn={(number) => changePage(number)}
                    count={clientList?.count}
                    entries={clientList?.clients?.length}
                />
            </TableContainer> : <NoItemText text={'No Clients Yet'}/> }
        </div>
    );
};
