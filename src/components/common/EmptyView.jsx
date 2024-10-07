import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    cardContainer: {
        display: 'grid',
        placeItems: 'center',
        marginTop: "10%",
        height: "calc(100vh-120px)",
        gridTemplateRows: "0fr 0fr 0fr",
    },
    link: {
        textDecoration: 'underline',
        color: '#2C3E93',
    },
}))

function EmptyView({
    Imgsrc,
    Title,
    subTitleStart,
    subTitleLink,
    navigateTo,
    subTitleEnd,
    clickHandler,
    hasborder
}) {
    const classes = useStyles();
    return (
        <div className={classes.cardContainer}>
            <img src={Imgsrc} className="mb-2" alt='logo' />
            <h1 className="font-medium">{Title}</h1>
            <p>
                {subTitleStart}{' '}
                {
                    clickHandler ?
                    <a onClick={clickHandler} className={`${classes.link} cursor-pointer`}>
                        {subTitleLink}
                    </a>
                    :
                    <Link to={navigateTo} className={`${classes.link} cursor-pointer`}>
                        {subTitleLink}
                    </Link>
                }
                {' '}{subTitleEnd}
            </p>
        </div>
    )
}

export default EmptyView
