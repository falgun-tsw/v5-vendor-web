import React, { Component } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@app/component/common/Stack";
import SearchJobCards from "@app/component/JobManagement/SearchJobCards";
import VendorCard from "@app/component/common/VendorCard";
import NoDataAvailable from "@app/component/common/NoDataAvailable";
import Pagination from "@app/component/common/Pagination";
import FilterJobs from "@app/component/JobManagement/FilterJobs";
export default class JobManagementContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openFilter: false,
      filterData: {
        skillsCategories: [],
        skills: []
      },
      paginationData: {
        page: 0,
        size: 10,
      },
    };
  }

  componentDidMount() {
    const { paginationData, filterData } = this.state;
    this.props.fetchVendorJobs({ filterData, page: paginationData.page, size: paginationData.size });
    this.props.fetchSkill();
    this.props.fetchSkillsCategories();
  }

  onSelectoptions = (key,id) => {
    try {
      const { filterData } = this.state;
      if(filterData[key].includes(id)){
        filterData[key] = filterData[key].filter((fid) => fid !== id);
      }else{
        filterData[key].push(id);
      }
      this.setState({ filterData },() => {
        const payload = {
          skillsCategories: filterData.skillsCategories
        }
        if(key === "skillsCategories") this.props.fetchSkill(payload);
      });
      
    } catch (error) {
      console.log("error",error)
    }
  }

  closeFilter = () => {
    this.setState({ openFilter: false });
  };

  handlePageAndRowsChange = (page, size) => {
    const { paginationData, filterData } = this.state;
    paginationData.page = page - 1;
    paginationData.size = size;
    this.setState(
      {
        paginationData,
      },
      () => this.props.fetchVendorJobs({filterData, page: paginationData.page, size: paginationData.size})
    );
  };

  handleClearFilter = () => {
    const { filterData, paginationData } = this.state;
    filterData.skills = []
    filterData.skillsCategories = []
    paginationData.size = 10
    paginationData.page = 0
    this.setState({ filterData, paginationData },() => {
      this.props.fetchVendorJobs({ filterData, page: paginationData.page, size: paginationData.size })
      this.closeFilter()
    })
  }

  handleApplyFilter = () => {
    const { filterData, paginationData } = this.state;
    try {
      this.props.fetchVendorJobs({ filterData, page: paginationData.page, size: paginationData.size });
      this.closeFilter()
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const {
      isJobListLoading = 0,
      vendorJobsList = [],
      jobSkillsCategoriesList = [],
      totalJobCount = 0,
      jobSkillsList = []
    } = this.props;
    const { openFilter, filterData, paginationData } = this.state;
    if (isJobListLoading) {
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
          headerTitle={`Job Management (${totalJobCount} Jobs)`}
          headerRight={
            vendorJobsList.length ? (
              <Tooltip title="Filter">
                <IconButton
                  edge="end"
                  sx={{
                    color: (filterData.skills.length || filterData.skillsCategories.length)
                      ? "#3677C8"
                      : null,
                    "&:hover": { background: "none" },
                  }}
                  onClick={() => {
                    this.setState({ openFilter: !this.state.openFilter });
                  }}
                >
                  <FilterAltOutlinedIcon />
                </IconButton>
              </Tooltip>
            ) : null
          }
        >
          {vendorJobsList.length ? (
            <>
              <SearchJobCards
                vendorJobsList={vendorJobsList}
              />
              <Pagination
                count={totalJobCount}
                page={paginationData.page}
                rowsPerPage={paginationData.size}
                defaultRowsPerPage={10}
                onPageChange={(page, size) => this.handlePageAndRowsChange(page, size)}
              />
            </>
          ) : (
            <NoDataAvailable />
          )}
        </VendorCard>
        <FilterJobs
          openFilter={openFilter}
          onFilterClose={this.closeFilter}
          filterData={filterData}
          onClearFilter={this.handleClearFilter}
          onApplyFilter={this.handleApplyFilter}
          skillCategoriesList={jobSkillsCategoriesList}
          skillList={jobSkillsList}
          onSelectoptions={this.onSelectoptions}
        />
      </>
    );
  }
}
