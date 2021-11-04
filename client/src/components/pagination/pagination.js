import React from 'react';
import {paginationStyle} from './style';
import Pagination from '@material-ui/lab/Pagination';

export const PaginationItem = ({count, handleReturn, page, entries, listLength}) => {
    const classes = paginationStyle();

    const handleChangePage = (val) => {
        handleReturn(val);
    };

    const firsCount = page > 1 ? page - 1 + '1' : page
    const showCount = count === 1 ? entries :
        listLength === 10 ? page + '0' :
            `${page - 1 === 0 ? '' : page - 1}` + listLength

    return (
        <div className={classes.PaginationWrapper}>
            <div>
                <p className={classes.showCountText}>{`Showing ${firsCount} to ${showCount} of ${count} entries`} </p>
            </div>
            <Pagination
                onChange={(event, val) => handleChangePage(val, 'vvv')}
                page={page}
                count={count && Math.ceil(count / 10)}
                color={'primary'}
            />
        </div>
    );
};