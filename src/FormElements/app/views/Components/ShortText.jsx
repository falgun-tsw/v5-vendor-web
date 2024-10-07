import React, { Fragment } from 'react';
import { Grid, TextField } from '@mui/material';
const shortField={
    // "id": "6674CDC1-4AD4-477F-A539-B04961F81B6D",
    // "element": "Short_Text",
    "fieldVariant": "outlined",
    "inputFieldSize": "large",
    "textAlignment": "left",
    "buttonType": "primary",
    "customOptions": {
        "required": true,
        "checked": true,
        "dataTable": false,
        "filtered": false,
        "componentType": "Short Text Field",
        "isMasked": false,
        "maskedValue": "",
        "validation": "Alphabetic"
    },
    "fieldName": "shortText_97C4DE24-0A98-4C3D-8A8E-751E7792FFD0",
    "label": "Short Text Field"
}
function ShortText(props) {
    const {validation,error,validationMessage}=props;
    return (
        <div>
            <Fragment>
                <TextField error={error}  variant={shortField.fieldVariant} fullWidth color={shortField.buttonType} label={shortField.label} required={shortField.customOptions.required} onChange={(e)=>{validation(shortField.customOptions.validation,e)}} helperText={validationMessage(shortField.customOptions.validation)}  />
            </Fragment>
        </div>
    )
}

export default ShortText