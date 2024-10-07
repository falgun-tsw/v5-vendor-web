import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import { capitalizeFirstLetter } from '@app/FormElements/utils';
import { format } from 'date-fns';

var initialState = {
  clientLogoForHeader: '',
  moduleList: [],
  formData: [
    {
      "id": "A62067FE-E195-420E-B4C1-C359E1BAD4DE",
      "element": "Short_Text",
      "type": "Short Text Field",
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
        "validation": "Alphabetic",
        "charLimit": "20"
      },
      "fieldName": "shortText_EE9E1603-6F38-4FF9-BC7C-4F4E2B6F0177",
      "label": "First Name",
      "dirty": false
    },
    {
      "id": "21D235EF-26D6-452A-AE60-B261949EBE8D",
      "element": "Short_Text",
      "type": "Short Text Field",
      "fieldVariant": "outlined",
      "inputFieldSize": "large",
      "textAlignment": "left",
      "buttonType": "primary",
      "customOptions": {
        "required": false,
        "checked": true,
        "dataTable": false,
        "filtered": false,
        "componentType": "Short Text Field",
        "isMasked": false,
        "maskedValue": "",
        "validation": "AlphaNumeric",
        "charLimit": "10"
      },
      "fieldName": "shortText_21285966-5E28-4B17-A08F-55A4C5AE8907",
      "label": "Last Name",
      "dirty": false
    },
    {
      "id": "E91F8A68-A0B1-4995-B67F-15D7B0AC6014",
      "element": "Long_Text",
      "type": "Long Text Field",
      "fieldVariant": "outlined",
      "inputFieldSize": "large",
      "textAlignment": "left",
      "buttonType": "primary",
      "customOptions": {
        "required": true,
        "checked": true,
        "dataTable": false,
        "filtered": false,
        "componentType": "Long Text Field",
        "isNumberLimit": true,
        "min": 10,
        "max": 100,
        "limitType": "Characters",
        "limitTypeOptions": "Words,Characters",
        "isLimitEntry": true,
        "editorMode": "Plain_Text",
        "editorModeOptions": "Plain_Text,Rich_Text,Full_Screen",
        "validationType": "Alphabetic",
        "validationOptions": "None,Alphabetic,AlphaNumeric,Currency,Cyrillic,Email,Numeric,URL"
      },
      "fieldName": "long_text_3E8325BD-71B1-4F2B-8E36-CD33527D039B",
      "label": "About you",
      "dirty": false
    },
    {
      "id": "13774D10-A07C-4819-8E17-87FBF850DD64",
      "element": "Long_Text",
      "type": "Long Text Field",
      "fieldVariant": "outlined",
      "inputFieldSize": "large",
      "textAlignment": "left",
      "buttonType": "primary",
      "customOptions": {
        "required": true,
        "checked": true,
        "dataTable": false,
        "filtered": false,
        "componentType": "Long Text Field",
        "isNumberLimit": true,
        "min": 3,
        "max": 5,
        "limitType": "Words",
        "limitTypeOptions": "Words,Characters",
        "isLimitEntry": true,
        "editorMode": "Plain_Text",
        "editorModeOptions": "Plain_Text,Rich_Text,Full_Screen",
        "validationType": "AlphaNumeric",
        "validationOptions": "None,Alphabetic,AlphaNumeric,Currency,Cyrillic,Email,Numeric,URL"
      },
      "fieldName": "long_text_72A83F20-A547-4897-A897-2EE4AE3ADA2A",
      "label": "About2",
      "dirty": false
    },
    {
      "id": "C53BC569-5D0E-4C8F-8E6E-DD6C827DB5E1",
      "element": "Number",
      "type": "Numbers",
      "fieldVariant": "outlined",
      "inputFieldSize": "large",
      "textAlignment": "left",
      "buttonType": "primary",
      "customOptions": {
        "required": true,
        "checked": true,
        "dataTable": false,
        "filtered": false,
        "componentType": "Numbers",
        "isNumberLimit": true,
        "min": 0,
        "max": 10
      },
      "fieldName": "number_input_55EFC678-C82D-479E-8D83-F985D1F71476",
      "label": "Mobile",
      "dirty": false
    },
    {
      "id": "D26D2C7D-887B-4A50-A908-B0012761F150",
      "element": "Number",
      "type": "Numbers",
      "fieldVariant": "outlined",
      "inputFieldSize": "large",
      "textAlignment": "left",
      "buttonType": "primary",
      "customOptions": {
        "required": false,
        "checked": true,
        "dataTable": false,
        "filtered": false,
        "componentType": "Numbers",
        "isNumberLimit": true,
        "min": 10,
        "max": 100
      },
      "fieldName": "number_input_D5E2CF04-EC10-46C2-9157-342037837C16",
      "label": "Age",
      "dirty": false
    },
    {
      "id": "9C327EE7-1095-4C2A-892B-7D5B76F5F1F6",
      "element": "Dropdown",
      "type": "Dropdown",
      "fieldVariant": "outlined",
      "inputFieldSize": "large",
      "textAlignment": "left",
      "buttonType": "primary",
      "customOptions": {
        "required": true,
        "checked": true,
        "dataTable": false,
        "filtered": false,
        "componentType": "Dropdown",
        "showEmptyTextOption": true,
        "emptyOptionText": "None",
        "defaultOptions": "none",
        "optionsText": "Male\nFemale\nOther"
      },
      "fieldName": "dropdown_input_0E3DF923-D9DA-4C81-8CCD-9109EA7A45E0",
      "label": "Gender",
      "dropDownOptions": [
        {
          "value": "Male",
          "label": "Male",
          "key": "9A3E10EE-CA51-46E0-931F-0F6F7D67A914"
        },
        {
          "value": "Female",
          "label": "Female",
          "key": "60D8CFF7-049D-4F6C-B902-40D2D11DCC41"
        },
        {
          "value": "Other",
          "label": "Other",
          "key": "856C3F54-E673-404F-AB10-338D6BE6D1A2"
        }
      ],
      "dirty": false
    },
    {
      "id": "202EEC8D-BF0A-4830-A3A6-EA56842397C3",
      "element": "Dropdown",
      "type": "Dropdown",
      "fieldVariant": "outlined",
      "inputFieldSize": "large",
      "textAlignment": "left",
      "buttonType": "primary",
      "customOptions": {
        "required": true,
        "checked": true,
        "dataTable": false,
        "filtered": false,
        "componentType": "Dropdown",
        "showEmptyTextOption": true,
        "emptyOptionText": "None",
        "defaultOptions": "Mingle",
        "optionsText": "Married\nNever Married\nDivorced\nSingle\nMingle"
      },
      "fieldName": "dropdown_input_A2C0079D-9FFA-4049-85C8-DB0A4298625B",
      "label": "Marital status",
      "dropDownOptions": [
        {
          "value": "Married",
          "label": "Married",
          "key": "C7D0E0BB-3C0A-4993-B415-B56476B048BA"
        },
        {
          "value": "Never Married",
          "label": "Never Married",
          "key": "7B8E60BA-D6F6-4088-B755-EC57D55133FA"
        },
        {
          "value": "Divorced",
          "label": "Divorced",
          "key": "E5A38AAF-691C-4BCE-8CC4-11A1E68B3A37"
        },
        {
          "value": "Single",
          "label": "Single",
          "key": "3AA3BD3E-BCE2-48E4-971C-BE033C5EF63C"
        },
        {
          "value": "Mingle",
          "label": "Mingle",
          "key": "9C3C7A8C-59DA-4338-9F1C-C295C32528FB"
        }
      ],
      "dirty": false
    },
    {
      "id": "A10209E2-3519-4BCD-A26B-F19C0D28DC0F", "element": "Photo", "type": "Photo", "fieldVariant": "outlined",
      "buttonType": "primary",
      "customOptions": {
        "required": true,
        "checked": true,
        "dataTable": false,
        "filtered": false,
        "componentType": "Photo"
      },
      "cameraFacingOptions": "front",
      "checked": true,
      "componentType": "Photo",
      "dataTable": false,
      "distanceToBuildingRadius": "",
      "filtered": false,
      "helpText": "",
      "isCommentsAvail": false,
      "isDistToBuilding": false,
      "isEditPhoto": false,
      "isPhotoAvail": true,
      "isPhotoUpload": true,
      "isRadioGroup": false,
      "isShowHelp": false,
      "isTargetAzimuthAngle": false,
      "required": true,
      "sampleS3Uri": "",
      "tapedrop": false,
      "element": "Photo",
      "fieldName": "photoC697A6F7-14C5-4EA9-84EA-7484693B1C15",
      "fieldVariant": "outlined",
      'id': "A10209E2-3519-4BCD-A26B-F19C0D28DC0F",
      'inputFieldSize': "large",
      'label': "Photo",
      "type": "Photo",
    },
    {
      "id": "0320F8C1-15A4-406B-A435-C83387A79680",
      "element": "Button",
      "type": "Buttons",
      "fieldVariant": "outlined",
      "inputFieldSize": "large",
      "textAlignment": "left",
      "buttonType": "primary",
      "customOptions": {
        "required": true,
        "checked": true,
        "dataTable": false,
        "filtered": false,
        "componentType": "Buttons",
        "actionClick": "Save"
      },
      "fieldName": "button819F24E9-94D0-4C27-AA15-CEB47E58BB2C",
      "label": "Submit",
      "dirty": false
    },
    {
      "id": "154E4F4E-CE32-4A6C-8AB4-E53A3BD13B2F",
      "element": "Button",
      "type": "Buttons",
      "fieldVariant": "outlined",
      "inputFieldSize": "large",
      "textAlignment": "left",
      "buttonType": "secondary",
      "customOptions": {
        "required": true,
        "checked": true,
        "dataTable": false,
        "filtered": false,
        "componentType": "Buttons",
        "actionClick": "Cancel or Abort"
      },
      "fieldName": "buttonA2FBFDB8-07BE-4DC6-899F-E3905F0351F3",
      "label": "Cancel",
      "dirty": false
    },
    {
      "id": "224B2071-31D6-4D39-8A13-19883461BF9F",
      "element": "Single_Choice",
      "type": "Single Choice",
      "fieldVariant": "outlined",
      "inputFieldSize": "large",
      "textAlignment": "left",
      "buttonType": "primary",
      "customOptions": {
        "required": true,
        "checked": true,
        "dataTable": false,
        "filtered": false,
        "componentType": "Single Choice",
        "isSingleChoiseOption": true,
        "isSpreadToColumn": false,
        "columns": 0
      },
      "fieldName": "singlechoice_D799A962-E1D7-493E-ACAB-7A988F71A663",
      "label": "choise",
      "singleChoiceOptions": [
        {
          "value": "option_1",
          "label": "Option 1",
          "key": "radiobuttons_option_08A92C21-B24C-4821-A115-A504773857DD"
        },
        {
          "value": "option_2",
          "label": "Option 2",
          "key": "radiobuttons_option_CFED5CCF-3A2B-4049-B44F-DD53B45859EA"
        },
        {
          "value": "other",
          "label": "Other",
          "key": "radiobuttons_option_C7FCC999-08E3-4EE3-97AF-B4BF6061F4A8"
        }
      ],
      "globalStyles": {
        "formDefault": false
      },
      "dirty": false
    },
    {
      "id": "197FD3F5-F15C-438A-916F-F5B6504630FE",
      "element": "Single_Choice",
      "type": "Single Choice",
      "fieldVariant": "outlined",
      "inputFieldSize": "large",
      "textAlignment": "left",
      "buttonType": "primary",
      "customOptions": {
        "required": false,
        "checked": true,
        "dataTable": false,
        "filtered": false,
        "componentType": "Single Choice",
        "isSingleChoiseOption": true,
        "isSpreadToColumn": false,
        "columns": 1
      },
      "fieldName": "singlechoice_191ECE02-60A7-49D1-AEE1-12E436EEF5F5",
      "label": "quiz",
      "singleChoiceOptions": [
        {
          "value": "option_1",
          "label": "Option 1",
          "key": "radiobuttons_option_6B016A84-3D13-49CF-9650-3A690EC2A12D"
        },
        {
          "value": "option_2",
          "label": "Option 2",
          "key": "radiobuttons_option_261A8DA3-89D4-4781-ABAA-2DAE6211581A"
        },
        {
          "value": "other",
          "label": "Other",
          "key": "radiobuttons_option_5E34C369-579E-46D0-9C7F-04CED63DB5BC"
        }
      ],
      "globalStyles": {
        "formDefault": false
      },
      "dirty": false
    },
    {
      "id": "9AD2B7DB-4FDA-400A-B6A7-25904165CB39",
      "element": "Check_List",
      "type": "Check List",
      "fieldVariant": "outlined",
      "inputFieldSize": "large",
      "textAlignment": "left",
      "buttonType": "primary",
      "customOptions": {
        "required": true,
        "checked": true,
        "dataTable": false,
        "filtered": false,
        "componentType": "Check List",
        "optionsText": "Option 1\nOption 2",
        "columns": 0
      },
      "fieldName": "checklist_input_28D6B2F4-159A-428B-8B3B-45E18DA2FD41",
      "label": "Check List",
      "checkListOptions": [
        {
          "value": "option_1",
          "label": "Option 1",
          "key": "checkboxes_option_5CC788BB-41D2-4279-AAC1-EAE4AAB421AE"
        },
        {
          "value": "option_2",
          "label": "Option 2",
          "key": "checkboxes_option_3D9149C5-320F-4FD4-A0DA-630E15EBCB08"
        },
        {
          "value": "Option 3",
          "label": "Option 3",
          "key": "CCB70D23-4483-4852-AE77-6FADC03F8DC9"
        },
        {
          "value": "Option 4",
          "label": "Option 4",
          "key": "CCB70D23-4483-4852-AE77-6FADC03F8DC9"
        },
        {
          "value": "Option 5",
          "label": "Option 5",
          "key": "CCB70D23-4483-4852-AE77-6FADC03F8DC9"
        },
        {
          "value": "Option 6",
          "label": "Option 6",
          "key": "CCB70D23-4483-4852-AE77-6FADC03F8DC9"
        },
        {
          "value": "Option ",
          "label": "Option ",
          "key": "CCB70D23-4483-4852-AE77-6FADC03F8DC9"
        },
      ]
    },

    {
      "id": "7CEDDC60-588D-4E57-8A40-89BF64F7D3B1",
      "element": "Check_List",
      "type": "Check List",
      "fieldVariant": "outlined",
      "inputFieldSize": "large",
      "textAlignment": "left",
      "buttonType": "primary",
      "customOptions": {
        "required": false,
        "checked": true,
        "dataTable": false,
        "filtered": false,
        "componentType": "Check List",
        "optionsText": "Option 1\nOption 2\nOption 3",
        "columns": 1,
        "isOtherOption": true
      },
      "fieldName": "checklist_input_AD0D9341-8240-4E5E-B8B4-43B48978949B",
      "label": "check box",
      "checkListOptions": [
        {
          "value": "Option 1",
          "label": "Option 1",
          "key": "C42D17F9-C1F1-432C-80C8-3E16550B5BDA"
        },
        {
          "value": "Option 2",
          "label": "Option 2",
          "key": "025E4C3E-1B87-4FCB-AB59-2803FE4099A9"
        },
        {
          "value": "Option 3",
          "label": "Option 3",
          "key": "CCB70D23-4483-4852-AE77-6FADC03F8DC9"
        },
        {
          "value": "other",
          "label": "Other"
        }
      ],
      "globalStyles": {
        "formDefault": false
      },
      "dirty": false
    },
    {
      "id": "02C3968F-8061-4BB3-851A-3CBFE03FB050",
      "element": "Button_Radios",
      "type": "Button Radio",
      "fieldVariant": "outlined",
      "inputFieldSize": "large",
      "textAlignment": "left",
      "buttonType": "primary",
      "customOptions": {
        "required": true,
        "checked": true,
        "dataTable": false,
        "filtered": false,
        "componentType": "Button Radio",
        "optionsText": "Option 1\nOption 2\nOption 3",
        "columns": 0,
        "spacing": 1,
        "buttonThemeColor": "red"
      },
      "fieldName": "buttonradio0C735EF9-4162-4E8D-AA7B-F55AB4E7A114",
      "label": "Radio Buttons",
      "buttonRadioOptions": [
        {
          "value": "Option 1",
          "label": "Option 1",
          "key": "9BC92A54-77D1-4C93-8F10-D747727F60C7",
          "hoverText": ""
        },
        {
          "value": "Option 2",
          "label": "Option 2",
          "key": "C0556F67-D9DD-466A-94B7-40B6C6BD30AF",
          "hoverText": ""
        },
        {
          "value": "Option 3",
          "label": "Option 3",
          "key": "3A78C369-CEAD-4680-BA10-479DB0C2365D",
          "hoverText": ""
        }
      ],
      "globalStyles": {
        "formDefault": false
      },
      "dirty": false
    }
  ],
  workflows: {},
  allForms: [],
  moduleChipsFilterDetails: {},
  moduleFilterDetails: {
    moduleName: '',
    //parentModuleName: '',
    //rolesMapped: '',
    status: '',
    from: null,
    to: null,
    empId: "",
    empName: "",
    empRole: ""
  },
  columnsAndFilters: {},
  formattedColumns: [],
  formattedRows: [],
  activeModuleName: '',
  workflowId: localStorage.getItem("workflowId") ? localStorage.getItem("workflowId") : "",
  workflowData: [],
  screenFormData: [],
  screenFormResponseData: [],
  loading: true,
  mappedBy: null,
  isApproved: '',
  empName: [],
  empRole: [],
  empId: [],
  roles: [],
  dynamicMappingDropdown: [],
}

const moduleInfoSlice = createSlice({
  name: 'moduleInfo',
  initialState,
  reducers: {
    setInitialState(state, action) {
      state.loading = true;
      state.columnsAndFilters = initialState.columnsAndFilters;
      state.formattedColumns = initialState.formattedColumns;
      state.formattedRows = initialState.formattedRows;
      state.screenFormResponseData = initialState.screenFormResponseData;
    },
    setAllModules(state, action) {
      let data = [{
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'home',
      }]
      data = [ ...data, ...action.payload];
      state.moduleList = data;
      state.loading = false;
    },
    setAllWorkflows(state, action) {
      state.workflows = action.payload
    },
    setClientLogoForHeader(state, action) {
      state.clientLogoForHeader = action.payload;
    },
    setAllForms(state, action) {
      state.allForms = action.payload.data;
      if (action.payload.submoduleId) {
        state.activeModuleName = state.moduleList.filter(m => m.id === action.payload.moduleId)[0];
      } else {
        state.activeModuleName = state.moduleList.filter(m => m.id === action.payload.moduleId)[0];
      }
      state.loading = false;
    },
    setWorkflowId(state, action) {
      state.workflowId = action.payload.workflowId;
      localStorage.setItem("workflowId", action.payload.workflowId);
    },
    setStateByName(state, action) {
      const { name, value, fieldName } = action.payload;
      if (fieldName) {
        state[fieldName][name] = value;
      } else {
        state[name] = value;
      }
    },
    setFormattedColumnsAndRows(state, action) {
      const { isFromApplyFilter } = action.payload;
      //..SET COLUMNS
      const actionHeader = {
        id: 'actionHeader',
        label: '',
        //minWidth: 170,
        align: 'right',
        icon: "more_vert",
        //format: (value) => value.toFixed(2),
      };
      let formattedColumns = [];
      state.columnsAndFilters
        && state.columnsAndFilters.columns
        && state.columnsAndFilters.columns.map((c, i) => {
          let cobj = {
            id: c.componentId,
            label: c.hint,
            //minWidth: 180,
            //align: 'right',
            //icon: "more_vert",
            //format: (value) => value.toFixed(2),
            format: (value) => `${value && value.length > 13 ? capitalizeFirstLetter(value)?.trim().slice(0, 13) + " ..." : capitalizeFirstLetter(value)?.trim()}`
          };
          formattedColumns.push(cobj);
        });
      formattedColumns.push(actionHeader);
      state.formattedColumns = formattedColumns;

      //..SET ROWS
      const cols = state.columnsAndFilters && state.columnsAndFilters.columns;
      let formattedRows = [];
      state.allForms
        && state.allForms.records
        && state.allForms.records.map((r, i) => {
          let robj = {};
          cols && cols.map((c, i) => {
            robj["formId"] = r.id;
            if (r[c.componentId] || r[c.componentId] === 0) {
              robj[c.componentId] = r[c.componentId].id ? r[c.componentId].id : r[c.componentId];
            } else {
              robj[c.componentId] = "-";
            }
          });
          formattedRows.push(robj);
        });

      state.formattedRows = formattedRows;
      if (!isFromApplyFilter) {
        //..SET DYNAMIC FILTERS
        const { filters } = state.columnsAndFilters;
        let moduleFilterDetails = {}, moduleChipsFilterDetails = {};
        filters && filters.map((f, i) => {
          if (f.type === "Date_Picker") {
            moduleFilterDetails[f.componentId] = null;
            moduleChipsFilterDetails[f.hint] = null;
          } else {
            moduleFilterDetails[f.componentId] = "";
            moduleChipsFilterDetails[f.hint] = "";
          }
        });
        state.moduleFilterDetails = moduleFilterDetails;
        state.moduleChipsFilterDetails = moduleChipsFilterDetails;
      }
    },
    setWorkflowData(state, action) {
      const { mappedBy } = action.payload;
      state.workflowData = action.payload;
      state.mappedBy = mappedBy;
    },
    setModuleFilterDetails(state, action) {
      state.moduleFilterDetails = action.payload
    },
    setScreenFormData(state, action) {
      state.screenFormData = action.payload
    },
    setScreenFormResponseData(state, action) {
      state.screenFormResponseData = action.payload
    },
    setChipsData(state, action) {
      for (let prop of Object.keys(action.payload)) {
        const result = state.columnsAndFilters.filters
          && state.columnsAndFilters.filters.find(x => x.componentId === prop);
        if (result && action.payload[prop]) {
          if (result.type === "Date_Picker") {
            state.moduleChipsFilterDetails[result.hint] = format(action.payload[prop], 'dd-MM-yyyy');
          } else {
            state.moduleChipsFilterDetails[result.hint] = action.payload[prop];
          }
        }
      }
    },
    setFiltersData(state, action) {
      for (let prop of Object.keys(action.payload)) {
        const result = state.columnsAndFilters.filters
          && state.columnsAndFilters.filters.find(x => x.hint === prop);
        if (result) {
          state.moduleFilterDetails[result.componentId] = action.payload[prop];
        }
      }
    },
    clearFilter(state, action) {
      for (let prop of Object.keys(state.moduleFilterDetails)) {
        const result = state.columnsAndFilters.filters
          && state.columnsAndFilters.filters.find(x => x.componentId === prop);
        if (result) {
          if (result.type === "Date_Picker") {
            state.moduleFilterDetails[prop] = null;
            state.moduleChipsFilterDetails[result.hint] = null;
          } else {
            state.moduleFilterDetails[prop] = "";
            state.moduleChipsFilterDetails[result.hint] = "";
          }
        }
      }
    },
    setLoading (state, action) {
      state.loading = action.payload;
    },
    setApproval(state, action) {
      state.isApproved = action.payload;
    },
    setEmpInfo(state, action) {
      let empInfo = action.payload;
      let empIds = [];
      let empNames = [];
      let empRoles = []
      const key = 'name';
      empInfo.map((el) => {
        empIds.push(el.employeeId);
        empNames.push(el.name);
        el.roles.map((role) => {
          empRoles.push(role);
        })
      })
      const uniqueEmpRoles = [...new Map(empRoles.map(item =>
        [item[key], item])).values()];
      state.empId = empIds;
      state.empName = empNames;
      state.empRole = uniqueEmpRoles;
    },
    setMappingDropdownInfo(state, action) {
      state.dynamicMappingDropdown = action.payload
    },
  },
})

export default moduleInfoSlice.reducer;

//Actions
export const {
  setInitialState,
  setAllModules,
  setClientLogoForHeader,
  setAllForms,
  setModuleFilterDetails,
  setWorkflowId,
  setStateByName,
  setFormattedColumnsAndRows,
  setWorkflowData,
  setScreenFormData,
  setScreenFormResponseData,
  setChipsData,
  setFiltersData,
  clearFilter,
  setLoading,
  setApproval,
  setEmpInfo,
  setMappingDropdownInfo,
} = moduleInfoSlice.actions;