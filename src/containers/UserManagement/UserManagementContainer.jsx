import React, { Component } from "react";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import Stack from "@app/component/common/Stack";
import Table from "@app/component/common/Table";
import Link from "@app/component/common/Link";
import FilterDrawer from "@app/component/UserManagement/FilterDrawer";
import NoDataAvailable from "@app/component/common/NoDataAvailable";
import Text from "@app/component/common/Text";
import VendorCard from "@app/component/common/VendorCard";
import { routes } from "src/routes";
import FilterVendorUser from "@app/component/UserManagement/FilterVendorUser";

const usersColumns = [
  {
    headerText: "User Name",
    field: "userName",
    bodyCellComponent: (v, d) => (
      <Link
        to={routes.userManagementViewVenderUser.replace(":id",d.id)}
        sx={{
          textDecoration: "none",
          color: "#000000DE",
          fontWeight: "350",
        }}
      >
        <Text>{d.userName}</Text>
      </Link>
    ),
  },
  {
    headerText: "User Code",
    field: "userCode",
  },
  {
    headerText: "Mobile No",
    field: "mobileNumber",
  },
  {
    headerText: "Email",
    field: "email",
  },
  {
    headerText: "State",
    field: "state",
  },
  {
    headerText: "Status",
    field: "status",
    bodyCellComponent: (v, d) => (
      <Chip
        label={`${d.status}`}
        color="success"
        disabled={d.status === "INACTIVE" ? true : false}
        sx={{
          fontSize: "0.8rem",
          fontWeight: "550",
          backgroundColor: "#D3FBCA",
        }}
        variant="outlined"
      />
    ),
  },
  {
    headerText: "",
    field: "",
    bodyCellComponent: (v, d) => (
      <Link to={routes.userManagementEditVendorUser.replace(":id",d.id)}>
        <Tooltip title="Edit">
          <IconButton
            edge="end"
            sx={{
              textDecoration: "none",
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Link>
    ),
  },
  {
    headerText: "",
    field: "",
    bodyCellComponent: (v, d) => (
      <Link to={routes.userManagementViewVenderUser.replace(":id",d.id)}>
        <Tooltip title="View">
          <IconButton
            edge="end"
            sx={{
              textDecoration: "none",
            }}
          >
            <InfoOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Link>
    ),
  },
];
export default class UserManagementContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openFilter: false,
      form: {
        userName: "",
        userCode: "",
        state: "",
        status: "",
      },
      paginationData: {
        page: 0,
        size: 10,
      },
    };
  }

  componentDidMount() {
    const { paginationData, form } = this.state;
    this.props.getVendorUsers({...form, ...paginationData});
  }

  toggleFilter = () => {
    this.setState({ openFilter: !this.state.openFilter });
  };

  resetForm = () => {
    this.setState({
      form: {
        userName: "",
        userCode: "",
        state: "",
        status: "",
      }
    });
  };

  checkIsFilterSelected = () => {
    const { form } = this.state;
    let dataExist = false;
    Object.values(form).forEach((item) => {
      if (![null, undefined, ""].includes(item)) {
        dataExist = true;
      }
    });
    return dataExist;
  };

  handleFilterClose = () => {
    this.toggleFilter();
  }
  handleFilterState = (openFilter) =>{
    if(openFilter){
      this.setState({ openFilter: false });
    }
    else{
      this.setState({ openFilter: true });
    }
  }
  handleOnChange = (key, value) => {
    const { form } = this.state;
    form[key] = value;
    this.setState({ form });
  };

  handleApplyFilter = () => {
    const { form, paginationData } = this.state;
    this.props.getVendorUsers({...form, ...paginationData});
    this.toggleFilter();
  }

  handleClearFilter = () => {
    this.resetForm();
  }

  handlePageAndRowsChange = (page, size) => {
    const { paginationData, form } = this.state;
    paginationData.page = page - 1;
    paginationData.size = size;
    this.setState(
      {
        paginationData,
      },
      () => this.props.getVendorUsers({...form,...paginationData})
    );
  };

  render() {
    const { usersLoading, vendorUsersList = [], vendorUsersListCountCount = 0 } = this.props;
    const { openFilter, form, paginationData } = this.state;
    const filterData = [
      {
        required: false,
        fullWidth: true,
        label: "User Name",
        value: form.userName,
        gridSize: { xs: 12, md: 12 },
        onChange: (e) => this.handleOnChange("userName", e.target.value),
      },
      {
        required: false,
        fullWidth: true,
        label: "User Code",
        value: form.userCode,
        gridSize: { xs: 12, md: 12 },
        onChange: (e) => this.handleOnChange("userCode", e.target.value),
      },
      {
        required: false,
        fullWidth: true,
        label: "State",
        value: form.state,
        gridSize: { xs: 12, md: 12 },
        onChange: (e) => this.handleOnChange("state", e.target.value),
      },
      {
        type: "dropdown",
        fullWidth: true,
        InputLabel: "Status",
        label: "status",
        value: form.status,
        onChange: (e) => this.handleOnChange("status", e.target.value),
        MenuItem: [
          { label: "Active", value: "ACTIVE" },
          { label: "Inactive", value: "INACTIVE" },
        ],
        gridSize: { xs: 12, md: 12 },
      },
    ];
    if (usersLoading) {
      return (
        <Stack
          sx={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress style={{ color: "lightgrey" }} size={50} />
        </Stack>
      );
    }
    return (
      <>
        <VendorCard
          headerTitle="User Management"
          headerRight={
            <Stack direction="row" spacing={{ xs: 8, sm: 3 }}>
              <Link to={routes.userManagementAddVendorUser}>
                <Tooltip title="Add User">
                  <IconButton edge="end">
                    <PersonAddAltRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Link>

              {vendorUsersList.length ? (
                <Tooltip title="Filter">
                  <IconButton
                    edge="end"
                    sx={{
                      color: this.checkIsFilterSelected()
                        ? "#3677C8"
                        : null,
                      "&:hover": { background: "none" },
                    }}
                    onClick={() =>{
                      this.handleFilterState(openFilter);
                    }}
                  >
                    <FilterAltOutlinedIcon />
                  </IconButton>
                </Tooltip>
              ) : null}
            </Stack>
          }
        >
          {vendorUsersList.length ? (
            <Stack pt={1}>
              <Table
                columns={usersColumns}
                data={vendorUsersList}
                count={vendorUsersListCountCount}
                page={paginationData.page}
                onPageChange={(page, size) =>
                  this.handlePageAndRowsChange(page, size)
                }
                onRowsPerPageChange={(page, size) =>
                  this.handlePageAndRowsChange(page, size)
                }
                rowsPerPage={paginationData.size}
                paginationBottom
              />
            </Stack>
          ) : (
            <NoDataAvailable />
          )}
        </VendorCard>
        <FilterVendorUser
          openFilter={openFilter}
          formData={filterData}
          onFilterClose={this.handleFilterClose}
          onApplyFilter={this.handleApplyFilter}
          onClearFilter={this.handleClearFilter}
        />
      </>
    );
  }
}
