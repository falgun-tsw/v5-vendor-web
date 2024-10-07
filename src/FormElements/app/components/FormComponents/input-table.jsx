import Delete from '@mui/icons-material/Delete';
import { Button, Checkbox, FormControlLabel, FormLabel, Grid, MenuItem, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useEffect } from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TimePicker from '@mui/lab/TimePicker';
import { cloneDeep } from 'lodash'
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';

const StyledTextField = styled(TextField)(({primaryColor,fontFamily}) => ({
    '& label.Mui-focused': {
        color: primaryColor,
        fontFamily: fontFamily
    },
    '& .MuiFormLabel-root': {
        fontFamily: fontFamily
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: primaryColor
    },
    '& .MuiOutlinedInput-root': {

        '&.Mui-focused fieldset': {
            borderColor: primaryColor,
        },
        '&:hover fieldset': {
            borderColor: primaryColor
        },
    },
}))

const StyledTableRow = styled(TableRow)(({ theme, fontFamily }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: '#FFFFFF00'
    },
    '&:nth-of-type(odd)': {
        backgroundColor: '#F5F5F5'
    },
    root: {
        zIndex: theme.zIndex.appBar + 1
    }
}));

const V5InputTable = (props) => {
    const {
        data,
        formik,
        fontFamily,
        primaryColor
    } = props;

    const useStyles = makeStyles((theme) => ({
        table: {
            minWidth: 450,
        },
        input: {
            minWidth: 10,
            width: '25ch',
        },
        margin: {
            margin: theme.spacing(1),
        },
        tableHeaderRow: {
            background: '#FFFFFF00'
        },
        addRowBtn: {
            color: primaryColor,
            cursor: "pointer",
            fontSize:'16px',
            fontWeight:'bold',
            fontFamily:fontFamily
        },
        tableHeader: {
            whiteSpace: "nowrap",
            fontFamily:fontFamily
        },
        tableCell: {
            padding: "12px",
            whiteSpace: "nowrap",
            width: "15rem"
        },
        tableIcon: {
            padding: "12px",
            whiteSpace: "nowrap",
            width: "5rem"
        },
        slider: {
            overflow: 'scroll',
            '&::-webkit-scrollbar': {
                width: '0em',
            },
        },
        emptySlider: {
            overflow: 'scroll',
            '&::-webkit-scrollbar': {
                width: '0em',
                height: "0em",
            },
        }
    }));

    const [rows, setRows] = useState([]);
    const classes = useStyles();
    const { formId } = useParams();
    useEffect(() => {
        data.hasOwnProperty('rows') ? setRows(data.rows) : setRows([]);
        if (formik.values[data.id] && formik.values[data.id].length) {
            setRows(formik.values[data.id]);
        }
    }, []);

    useEffect(() => {
        if (formik.values[data.id] && formik.values[data.id].length) {
            setRows(formik.values[data.id]);
        }
    }, [formik.values[data.id]]);

    const TextInputCells = props => {
        // const classes = useStyles();
        // const [selectedDate, setDate] = useState(null);
        // const [selectedTime, setTime] = useState(null);
        const [inputValue, setInputValue] = useState(props.value);

        // const setSelectedDate = (date) => {
        //     setDate(date);
        //     updateRow(props.rowId, props.data.headerId, date);
        // };

        // const setSelectedTime = (time) => {
        //     setTime(time);
        //     updateRow(props.rowId, props.data.headerId, time);
        // };

        const updateData = () => {
            updateRow(props.rowId, props.data.headerId, inputValue);
            
        }

        let data = '';
        if (props.data.type === "Short Text Field") {
            data = <StyledTextField
                        primaryColor={primaryColor}
                        fontFamily={fontFamily}
                        size="small"
                        className='ml-3'
                disabled={props.customOptions.editRow || !formId ? false : true}
                        required={props.data.required}
                        variant={props.fieldVariant}
                        placeholder={props.data.placeholder} 
                        value={inputValue}
                        onChange={(e)=>setInputValue(e.target.value)}
                        onBlur={updateData}
                    />
        } else if (props.data.type === "Long Text Field") {
            data = <StyledTextField
                        primaryColor={primaryColor}
                        fontFamily={fontFamily}
                        size="small"
                        multiline
                        className='ml-3'
                disabled={props.customOptions.editRow || !formId ? false : true}
                        rows={3}
                        required={props.data.required}
                        variant={props.fieldVariant}
                        placeholder={props.data.placeholder} 
                        value={inputValue}
                        onChange={(e)=>setInputValue(e.target.value)}
                        onBlur={updateData}
                    />
        } else if (props.data.type === "Numbers") {
            data = <StyledTextField
                        primaryColor={primaryColor}
                        fontFamily={fontFamily}
                        size="small"
                        type="number"
                        className='ml-3'
                disabled={props.customOptions.editRow || !formId ? false : true}
                        required={props.data.required}
                        variant={props.fieldVariant}
                        placeholder={props.data.placeholder} 
                        value={inputValue}
                        onChange={(e)=>setInputValue(e.target.value)}
                        onBlur={updateData}
                    />
        } else if (props.data.type === "Dropdown") {
            data = <StyledTextField
                        primaryColor={primaryColor}
                        fontFamily={fontFamily}
                        className='ml-3'
                        size="small"
                disabled={props.customOptions.editRow || !formId ? false : true}
                        // label="Small select"
                        variant={props.fieldVariant}
                        style={{ width: 200 }}
                        select
                        label={props.data.label}
                        required={props.data.required}
                        placeholder={props.data.placeholder}
                        value={inputValue}
                        onChange={(e)=>setInputValue(e.target.value)}
                        onBlur={updateData}>
                        {props.data !== undefined && props.data.options !== undefined && props.data.options.map((option) => {
                            const this_key = `preview_${option.key}`;
                            return <MenuItem value={option.value} key={this_key}>{option.label}</MenuItem>;
                        })}
                    </StyledTextField>

        } else if (props.data.type === "checkbox") {
            data = props.data.options !== undefined && props.data.options.map((option) => {
                return <FormControlLabel
                            disabled={props.customOptions.editRow ? false : true}
                            control={<Checkbox className='ml-3' checked={props.data.options[option.value]} name={option.value} color="primary" />}
                            label={option.label}
                        />;
            });
        } else if (props.data.type === "Button Radio") {
            data = <RadioGroup
                        row aria-label="material"
                        name="single-choice"
                        required={props.data.required}
                        className='ml-3'
                    >
                    {
                        props.data.options !== undefined && props.data.options.map(option => {
                            return <FormControlLabel
                                key={option.key}
                                label={option.label}
                                value={option.value}
                                control={<Radio color='primary' />}
                            />
                        })
                    }
                    </RadioGroup>
        } else if (props.data.type === "Date Picker") {
            let dateFormat = "MM/dd/yyyy";
            if (props.data.dateFormat !== undefined) {
                let dateFormat1 = 'MM/dd/yyyy';
                let dateFormat2 = 'dd/MM/yyyy';
                let dateFormat3 = 'yyyy/MM/dd';
                let dateFormat4 = 'yyyy/dd/MM';
                if (props.data.dateFormat.toLowerCase() === "mm/dd/yyyy") {
                    dateFormat = dateFormat1;
                } else if (props.data.dateFormat.toLowerCase() === "dd/mm/yyyy") {
                    dateFormat = dateFormat2;
                } else if (props.data.dateFormat.toLowerCase() === "yyyy/mm/dd") {
                    dateFormat = dateFormat3;
                } else if (props.data.dateFormat.toLowerCase() === "yyyy/dd/mm") {
                    dateFormat = dateFormat4;
                }
            }

            data = <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label={props.data.label}
                            name={props.data.label}
                            inputFormat={dateFormat}
                            onChange={setInputValue}
                            autoOk={true}
                            value={inputValue}
                            required={props.data.required}
                            renderInput={(params) => <StyledTextField {...params} fontFamily={fontFamily} primaryColor={primaryColor} size="small" required={props.data.required} className="ml-3" InputLabelProps={{
                                classes: {
                                    asterisk: 'text-error'
                                }
                            }}
                                disabled={formId ? true : false}
                            />}
                        />
                    </LocalizationProvider>
        } else if (props.data.type === "Time") {
            data = <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                            label={props.data.label}
                            name={props.data.label}
                            value={inputValue}
                            onChange={setInputValue}
                            required={props.data.required}
                            renderInput={(params) => <StyledTextField {...params} fontFamily={fontFamily} primaryColor={primaryColor} size="small" required={props.data.required} className="ml-3" InputLabelProps={{
                                classes: {
                                    asterisk: 'text-error'
                                }

                            }}
                                disabled={formId ? true : false}
                            />}
                        />
                    </LocalizationProvider>
                    } else if (props.data.type === "static") {
                        data = <FormLabel>{props.data.staticText}</FormLabel>
                    } else if (props.data.type === "Email") {
                        data = <StyledTextField
                                    fontFamily={fontFamily}
                                    primaryColor={primaryColor}
                                    size="small"
                                    variant={props.fieldVariant}
                                    required={props.data.required}
                            disabled={props.customOptions.editRow || !formId ? false : true}
                                    type="email"
                                    className='ml-3'
                                    value={inputValue}
                                    onChange={(e)=>setInputValue(e.target.value)}
                                    onBlur={updateData}
                                />
                    }
                    return data;
                }

    const addRow = () => {
        setRows(rows => [...rows, { rowId: rows.length, values: data.customOptions.headerList }]);
    }

    const deleteRow = (id) => {
        let remainingRows = rows.filter((row) => {
            return row.rowId !== id;
        });
        setRows(remainingRows);
    }

    const updateRow = (id, headerId, value) => {
        let newRows = rows.map((row) => {

            //checking for all mandatpry fields
            let errorFound = row.values.some((h)=>h.required === true && !h.value);

            formik.setFieldError(data.id, errorFound);

            if (id === row.rowId) {
                let matchIndex  = row.values.findIndex((v)=>v.headerId === headerId);
                let newValues = cloneDeep(row.values);
                newValues[matchIndex]["value"] = value;
                return { ...row, values: newValues};
            }
            return row;
        });
        setRows(newRows);
        formik.setFieldValue(data.id, newRows);
    }

    rows.map((row, index) => (
        <TableRow key={row}>
            <TableCell component="th" className={classes.tableHeader} scope="row" align="left"><TextInputCells id={row + '' + index} /></TableCell>
        </TableRow>
    ))

    const InputTable = props => {
        const classes = useStyles();
        return (
            <TableContainer  className={ rows.length > 0? classes.slider : classes.emptySlider } sx={{ mt: 3 }} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow className={classes.tableHeaderRow}>
                            {props.tableHeaders.map((header, index) => (
                                <TableCell align="left" className={classes.tableCell} key={index}><b>{header.label + (header.required ? " *" : "")}</b></TableCell>
                            ))}
                            <TableCell align="right" className={classes.tableIcon}><b>{props.customOptions.headerActionLabel}</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* <GetRows rows={props.rows} /> */}
                        {
                            props.rows.map((row, rowIndex) => (
                                <StyledTableRow key={row.rowId}>
                                    {props.tableHeaders.map((header, cellIndex) => (
                                        <TableCell key={row + cellIndex} component="th" scope="row" align="left" >
                                            <Grid style={{ width: '250px' }}>
                                                <TextInputCells className="flex-nowrap" customOptions={props.customOptions} data={header} options={header.options} type={header.type} required={header.required} fieldVariant={props.fieldVariant} rowId={row.rowId} value={row.values.filter(v=>v.headerId === header.headerId)[0].value? row.values.filter(v=>v.headerId === header.headerId)[0].value: ""}/>
                                            </Grid>
                                        </TableCell>
                                    ))}
                                    <TableCell key={row + props.tableHeaders.length + 1} component="th" scope="row" align="right">
                                        {props.customOptions.deleteRow ? <Delete value={rowIndex} onClick={() => deleteRow(row.rowId)} className="cursor-pointer" /> : null}
                                    </TableCell>
                                </StyledTableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    return (
        <>
            <InputTable customOptions={data.customOptions} tableHeaders={data.customOptions.headerList} rows={rows} fieldVariant={data.fieldVariant} />
            {(rows.length < parseInt(data.customOptions.maximalRows) || data.customOptions.maximalRows === "0") &&
                <Button onClick={addRow} className={classes.addRowBtn}>{data.customOptions.labelAdd}</Button>
            }
        </>
    );
}

export default V5InputTable;