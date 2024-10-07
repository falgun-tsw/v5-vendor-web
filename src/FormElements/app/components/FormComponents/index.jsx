import React from 'react';
import PropTypes from "prop-types";
import V5ButtonRadio from './button-radio';
import V5Checklist from './checklist';
import V5DatePicker from './datePicker';
import V5Dropdown from './dropdown';
import V5InputTable from './input-table';
import V5ShortText from './short-text';
import V5LongText from './long-text';
import V5Email from './email';
import V5Number from './number';
import V5LocationMap from './location-map';
import V5Phone from './phone';
import V5SectionHeader from './section-header';
import V5Signature from './signature';
import V5SingleChoice from './single-choice';
import V5Button from './button';
import V5Photo from './photo';
import V5Tiles from './tiles';
import V5GlobalTime from './Time';
import V5BarcodeScanner from './barcode-scanner';
import V5Video from './video';
import V5Attachment from './attachment';
import useSettings from 'src/FormElements/app/hooks/useSettings';

function V5FormElement({data, formik, index, buttonAction}) {
    const { settings } = useSettings();
    const primaryColor = settings.layout1Settings.main.primaryColor;
    const fontFamily = settings.themes.typography.fontFamily;
    return (
        <>
            {(() => {
                switch (data.element) {
                    case 'Short_Text':
                        return (
                            <V5ShortText
                                customStyle={{}}
                                placeholderText={""}
                                type={"text"}
                                data={data}
                                formik={formik}
                                index={index}
                                primaryColor={primaryColor}
                                fontFamily={fontFamily}
                            />
                        );
                    case 'Long_Text':
                        return (
                            <V5LongText
                                customStyle={{}}
                                placeholderText={""}
                                type={"text"}
                                data={data}
                                formik={formik}
                                index={index}
                                primaryColor={primaryColor}
                                fontFamily={fontFamily}
                            />
                        );
                    case 'Email':
                        return (
                            <V5Email
                                customStyle={{}}
                                placeholderText={""}
                                type={"email"}
                                data={data}
                                formik={formik}
                                index={index}
                                primaryColor={primaryColor}
                                fontFamily={fontFamily}
                            />
                        );
                    case 'Number':
                        return (
                            <V5Number
                                customStyle={{}}
                                placeholderText={""}
                                type={"number"}
                                data={data}
                                formik={formik}
                                index={index}
                                primaryColor={primaryColor}
                                fontFamily={fontFamily}
                            />
                        );
                    case 'Dropdown':
                        return (
                            <V5Dropdown 
                                customStyle={{}}
                                placeholderText={""}
                                type={"text"}
                                data={data}
                                formik={formik}
                                index={index}
                                primaryColor={primaryColor}
                                fontFamily={fontFamily}
                            />
                        );
                    case 'Mapping_Dropdown':
                        return (
                            <V5Dropdown 
                                customStyle={{}}
                                placeholderText={""}
                                type={"text"}
                                data={data}
                                formik={formik}
                                index={index}
                                primaryColor={primaryColor}
                                fontFamily={fontFamily}
                            />
                        );
                    case 'Single_Choice':
                        return (
                            <V5SingleChoice 
                                formik={formik} 
                                index={index} 
                                data={data}
                                primaryColor={primaryColor}
                                fontFamily={fontFamily}
                            />
                        );
                    case 'Button_Radios':
                        return (
                            <V5ButtonRadio
                                formik={formik} 
                                index={index} 
                                primaryColor={primaryColor}
                                fontFamily={fontFamily}
                            data={data}/>
                        );
                    case 'Location_Coordinates':
                        return (
                            <V5LocationMap
                                customStyle={{}}
                                data={data}
                                formik={formik}
                                primaryColor={primaryColor}
                                fontFamily={fontFamily}
                                index={index} />
                        );
                    case 'Check_List':
                        return (
                            <V5Checklist 
                                customStyle={{}} 
                                data={data}
                                formik={formik} 
                                index={index}
                                primaryColor={primaryColor}
                                fontFamily={fontFamily}
                            />
                        );
                    case 'Configurable_List':
                        return (
                            <V5InputTable fontFamily={fontFamily} data={data} formik={formik} primaryColor={primaryColor} />
                        );
                    case 'Signature':
                        return (
                            <V5Signature fontFamily={fontFamily} data={data}  formik={formik} primaryColor={primaryColor} />
                        );
                    case 'Section_Header':
                        return (
                            <V5SectionHeader fontFamily={fontFamily} data={data} primaryColor={primaryColor}/>
                        );
                    case 'Date_Picker':
                        return (
                            <V5DatePicker fontFamily={fontFamily} data={data} formik={formik} primaryColor={primaryColor} />
                        );
                    case 'Phone':
                        return (
                            <V5Phone 
                            customStyle={{}} 
                            data={data}
                            formik={formik}
                            index={index}
                            primaryColor={primaryColor}
                            fontFamily={fontFamily}
                            />
                        );
                    case 'Button':
                        return (
                            <V5Button
                            customStyle={{}}
                            type={"button"}
                            data={data}
                            formik={formik}
                            primaryColor={primaryColor}
                            fontFamily={fontFamily}
                            index={index}
                            buttonAction={buttonAction}
                            />
                        );
                    case 'Photo':
                        return (
                            <V5Photo data={data} fontFamily={fontFamily} primaryColor={primaryColor} formik={formik}/>
                        );
                    case 'Video':
                        return (
                            <V5Video data={data} fontFamily={fontFamily} primaryColor={primaryColor} formik={formik}/>
                        );
                    case 'Barcode_Scanner':
                        return (
                            <V5BarcodeScanner fontFamily={fontFamily} primaryColor={primaryColor} data={data} formik={formik}/>
                        );
                    case 'Tiles':
                        return (
                            <V5Tiles data={data} fontFamily={fontFamily} formik={formik} primaryColor={primaryColor} />
                        );
                    case 'Time':
                        return (
                            <V5GlobalTime data={data} fontFamily={fontFamily} formik={formik} primaryColor={primaryColor} />
                        );
                    case 'Attachment':
                        return (
                            <V5Attachment data={data} fontFamily={fontFamily} formik={formik} primaryColor={primaryColor} />
                        )
                    default:
                        return null;
                }
            })()}
        </>

    )
}

V5FormElement.propTypes = {
    data: PropTypes.object
}

V5FormElement.defaultProps = {

};

export default V5FormElement;
