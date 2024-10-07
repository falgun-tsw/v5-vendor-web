import React from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { styled } from '@mui/system'
import CloseIcon from '@mui/icons-material/Close'
import { makeStyles } from '@mui/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import {
    Chip,
    Checkbox,
    Grid,
    TextField,
    Button,
    FormControl,
} from '@mui/material'
import { useSelector } from 'react-redux'
import ListItemText from '@mui/material/ListItemText'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import CancelIcon from '@mui/icons-material/Cancel'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const DrawerRoot = styled(SwipeableDrawer)(() => ({
    '& .MuiBackdrop-root': {
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
    },
}))

const FilterHeaderWrap = styled(Grid)(({ primaryColor, fontFamily }) => ({
    backgroundColor: primaryColor,
    fontFamily: fontFamily,
}))

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
    },
    paper: {
        '@media screen and (min-width: 800px)': {
            width: `calc((100% - 260px) / 3)`,
            marginLeft: `calc(((100% - 260px) / 3) + 260px)`,
        },
    },
}))

const StyledTextField = styled(TextField)(({ primaryColor, fontFamily }) => ({
    MuiTextField: {
        width: '100%',
    },
    '& label.Mui-focused': {
        color: primaryColor,
        fontFamily: fontFamily,
    },
    '& .MuiFormLabel-root': {
        fontFamily: 'fontFamily',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: primaryColor,
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: primaryColor,
        },
        '&.Mui-focused fieldset': {
            borderColor: primaryColor,
        },
        '&:hover fieldset': {
            borderColor: primaryColor,
        },
        '&.Mui-focused fieldset': {
            borderColor: primaryColor,
        },
    },
}))

const FOutlinedButton = styled(Button)(({ primaryColor, fontFamily }) => ({
    border: `1px solid ${primaryColor} !important`,
    color: primaryColor,
    fontFamily: fontFamily,
}))

const FContainedButton = styled(Button)(({ primaryColor, fontFamily }) => ({
    backgroundColor: primaryColor,
    fontFamily: fontFamily,
}))

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

function FilterCharts({
    open,
    handleClose,
    anchorEl,
    primaryColor,
    applyFilter,
    chart,
}) {
    const defaultState = {
        siteIds: [],
        fromDate: null,
        toDate: null,
    }
    const { sites } = useSelector((state) => state.screenBuilder.dashboard)
    const [formData, setFormData] = React.useState(defaultState)
    const classes = useStyles()

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleDelete = (siteId) => {
        setFormData({
            ...formData,
            siteIds: formData.siteIds.filter((id) => id !== siteId),
        })
    }

    const clearFilter = async () => {
        setFormData(defaultState);
    }

    const btnDisable =
        !formData.fromDate && !formData.toDate && formData.siteIds.length === 0

    return (
        <DrawerRoot
            anchor={'bottom'}
            open={open}
            onClose={handleClose}
            ref={anchorEl}
            classes={{ paper: classes.paper }}
        >
            <FilterHeaderWrap
                className={`flex justify-between items-center px-4`}
                primaryColor={primaryColor}
            >
                <p className="text-16">Filter</p>
                <CloseIcon className="cursor-pointer" onClick={handleClose} />
            </FilterHeaderWrap>

            <form className="px-4">
                <Grid container>
                    {chart && chart.filters?.includes('SITE_ID') && (
                        <Grid item xs="12" className="mt-3">
                            <FormControl fullWidth>
                                <InputLabel id="demo-multiple-chip-label">
                                    Site ID
                                </InputLabel>
                                <Select
                                    fullWidth
                                    name="siteIds"
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={formData.siteIds}
                                    onChange={(e) => {
                                        handleChange('siteIds', e.target.value)
                                    }}
                                    input={
                                        <OutlinedInput
                                            id="select-multiple-chip"
                                            label="Site ID"
                                        />
                                    }
                                    renderValue={(selected) => (
                                        <div className={classes.chips}>
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                    clickable
                                                    deleteIcon={
                                                        <CancelIcon
                                                            onMouseDown={(
                                                                event
                                                            ) =>
                                                                event.stopPropagation()
                                                            }
                                                        />
                                                    }
                                                    className={classes.chip}
                                                    onDelete={(e) =>
                                                        handleDelete(value)
                                                    }
                                                />
                                            ))}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {sites.map((site) => (
                                        <MenuItem
                                            key={site.siteId}
                                            value={site.siteId}
                                        >
                                            <Checkbox
                                                checked={
                                                    formData.siteIds?.indexOf(
                                                        site.siteId
                                                    ) > -1
                                                }
                                            />
                                            <ListItemText
                                                primary={site.siteId}
                                            />{' '}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    )}
                    {chart && chart.filters?.includes('DATE_RANGE') && (
                        <>
                            <Grid item xs="12">
                                <div className="mt-10">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                        classes="w-full"
                                    >
                                        <DesktopDatePicker
                                            inputFormat={'dd MMM yyyy'}
                                            label="From date"
                                            name="fromDate"
                                            value={formData.fromDate}
                                            renderInput={(params) => (
                                                <StyledTextField
                                                    primaryColor={primaryColor}
                                                    fontFamily={''}
                                                    {...params}
                                                    fullWidth
                                                />
                                            )}
                                            onChange={(date) => {
                                                handleChange('fromDate', date)
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </Grid>
                            <Grid item xs="12">
                                <div className="mt-10">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDateFns}
                                    >
                                        <DesktopDatePicker
                                            inputFormat={'dd MMM yyyy'}
                                            label="To date"
                                            name="toDate"
                                            value={formData.toDate}
                                            renderInput={(params) => (
                                                <StyledTextField
                                                    primaryColor={primaryColor}
                                                    fontFamily={''}
                                                    {...params}
                                                    fullWidth
                                                />
                                            )}
                                            onChange={(date) => {
                                                handleChange('toDate', date)
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </Grid>
                        </>
                    )}
                </Grid>
                <Grid
                    spacing={2}
                    container
                    justify="space-between"
                    className="mb-1 mt-5"
                >
                    <Grid item xs={6}>
                        <FOutlinedButton
                            type="button"
                            fullWidth
                            variant="outlined"
                            onClick={clearFilter}
                            primaryColor={primaryColor}
                            disabled={btnDisable}
                        >
                            CLEAR
                        </FOutlinedButton>
                    </Grid>
                    <Grid item xs={6}>
                        <FContainedButton
                            type="button"
                            fullWidth
                            variant="contained"
                            onClick={() => applyFilter(formData)}
                            primaryColor={primaryColor}
                        >
                            APPLY
                        </FContainedButton>
                    </Grid>
                </Grid>
            </form>
        </DrawerRoot>
    )
}

export default FilterCharts
