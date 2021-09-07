import React, {useState} from "react";
import {useSelector} from "react-redux";
import {Table, TableCell, TableContainer} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {TableHeadComponent, SearchAndFilter, PaginationItem, NoItemText, CloseButton} from "@eachbase/components";
import {Images, useGlobalStyles} from "@eachbase/utils";

export const Notes = ({
                          editNote,
                          closeModal,
                          noteModalInfo,
                          showModal,
                          data,
                          headerTitles,
                          pagination,
                          defaultStyle,
                          items,
                          noItemsYet,
                      }) => {

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

                {!noItemsYet && !data && <NoItemText text='No Items Yet'/>}

                {pagination && <PaginationItem
                    text={`Showing 30 to 30 of 200 entries`}
                    handleReturn={(number) => changePage(number)}
                    page={page}
                    count={officesList.length}
                />}
                {
                    showModal &&
                    <div className={globalStyle.previewModal} style={{right: noteModalInfo.right}}>
                        <h1>{noteModalInfo.subject}</h1>
                        <span>By John Smith</span>
                        <div className={globalStyle.dateContainer}>
                            <p>{noteModalInfo.created}</p>
                            <div>
                                <div className={globalStyle.icons}>
                                    <img src={Images.edit} onClick={() => editNote({modalType:'editNote',text: 'text text',subject: noteModalInfo.subject, id:noteModalInfo.id})} alt="edit"/>
                                    <img src={Images.remove} alt="delete" onClick={() => alert('delete')}/>
                                </div>
                            </div>
                        </div>
                        <p>Lorem Ipsum is simply dummy text
                            of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's
                            standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of
                            type and scrambled it to make a type specimen
                            book. It has survived not only five centuries,
                            but also the leap into electronic typesetting.</p>
                        <div className={globalStyle.positionedButton}>
                            <CloseButton handleCLic={closeModal}/>
                        </div>
                    </div>
                }

            </TableContainer>
        </div>
    )
}