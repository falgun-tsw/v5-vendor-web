import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Grid, Breadcrumbs } from '@mui/material'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import V5GlobalIconButtons from '../V5GlobalIconButtons/V5GlobalIconButtons'

function V5GlobalHeaderActionList(props) {
    const { title, iconsList } = props
    const useStyles = makeStyles((theme) => ({
        root: {
            '& .MuiBreadcrumbs-separator': {
                fontSize: "2.3rem"
            }
        },
        icon: {
            fontSize: "2rem"
        }
    }))


    const classes = useStyles();

    return (
        <div className={`analytics mx-6 mb-2 mt-3 ${classes.root}`}>
            <Grid
                container
                spacing={2}
                className="justify-between flex mt-15 items-center"
                data-testid="header-Action-Div"
            >

                <Grid className="flex align-middle">
                    <Grid item className="pt-2">
                        {/* <Breadcrumbs>
                            <Link to="/">
                                <Icon className={`material-icons-two-tone mt-2 ${classes.icon}`}>
                                    home
                                </Icon>
                            </Link>

                            <h1 data-testid="title" className="text-black mt-3" title={title}>{title}</h1>

                        </Breadcrumbs> */}
                    </Grid>
                </Grid>
                <Grid className="mt-5">
                    {iconsList &&
                        iconsList.map((ic, index) => {
                            return (
                                <V5GlobalIconButtons
                                    key={index}
                                    iconType={ic.iconType}
                                    tooltipTitle={ic.tooltipTitle}
                                    areaLabel={ic.areaLabel}
                                    iconComponent={ic.iconComponent}
                                    iconClickHandler={ic.iconClickHandler}
                                    filterPopupOpen={ic.filterPopupOpen}
                                    reference={ic.ref}
                                />
                            )
                        })}
                </Grid>
            </Grid>
        </div>
    )
}

V5GlobalHeaderActionList.propTypes = {
    title: PropTypes.string.isRequired,
    iconsList: PropTypes.array.isRequired,
}

V5GlobalHeaderActionList.defaultProps = {}

export default V5GlobalHeaderActionList
