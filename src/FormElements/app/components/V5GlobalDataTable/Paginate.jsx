import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
//import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },

        '& .MuiPaginationItem-root': {
            color: '#51BEB7',
            fontWeight: '500',
            margin: '0',
            border: '1px solid lightgray',
            borderRadius: '2px',
        },
        '& .Mui-selected': {
            backgroundColor: '#51BEB7',
            color: '#000 !important',
        },
        '& .Mui-selected:hover': {
            backgroundColor: '#51BEB7'
        },
        '& .MuiPaginationItem-ellipsis': {
            height: '32px'
        }
    },
}))

function Paginate({ page, paginate, pageSize, listSize }) {
    const pages = Math.ceil(listSize / pageSize);
    const [pagesToShow, setPagesToShow] = useState(pages);
    const classes = useStyles();
    const showPageNumbers = () => {
        setPagesToShow(pages);
    }

    useEffect(() => {
        showPageNumbers();
        if (pages > 5) {
            setPagesToShow(5);
        }
    }, [pages]);

    return (
        <div className={classes.root}>
            <Pagination
                count={pagesToShow}
                defaultPage={page + 1}
                page={page + 1}
                showFirstButton
                showLastButton
                shape="rounded"
                onClick={showPageNumbers}
                onChange={(event, value) => paginate(value - 1)}
                pageSize={pageSize}
            />
        </div>
    )
}

export default Paginate
