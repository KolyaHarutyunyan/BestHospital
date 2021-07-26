import React, { useState } from 'react';
import { paginationStyle } from './style';
import Pagination from '@material-ui/lab/Pagination';

export const PaginationItem = ({ count, handleReturn, page, text }) => {
    const classes = paginationStyle();

    const handleChangePage = (val) => {
        handleReturn(val);
    };

    return (
        <div className={classes.paginationWrapper}>
            <p>{text}</p>
            <Pagination
                onChange={(event, val) => handleChangePage(val, 'vvv')}
                page={page}
                count={count}
                color={'primary'}
            />
        </div>
    );
};
