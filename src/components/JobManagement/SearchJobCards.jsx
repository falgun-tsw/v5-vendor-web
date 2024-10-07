import React from "react";
import Chip from "@mui/material/Chip";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";
import Stack from "@app/component/common/Stack";
import Button from "@app/component/common/Button";
import Text from "@app/component/common/Text";
import Link from "@app/component/common/Link";
import { Tooltip } from "@mui/material";
import { routes } from "src/routes";

export default function searchJobCards({ vendorJobsList = [], handleLoadMore }) {

  return (
    <>
      {vendorJobsList?.map((job, i) => {
        const {
          billing = {},
          id,
          jobRefNo,
          jobShortDescription,
          jobTiming = {},
          jobTitle,
          jobType,
          projectType,
          skills = [],
        } = job;

        return (
          <Stack
            sx={{
              width: { xs: "100%" },
            }}
            pt={1}
            key={`search_job_card_${i}`}
          >
            <Link
              style={{ textDecoration: "none" }}
              to={routes.jobManagementDetails.replace(":id",id)}
            >
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                sx={{
                  paddingBottom: "1rem",
                  paddingTop: i === 0 ? "0px" : "1rem",
                  cursor: "pointer",
                  borderBottom: "1px solid  #e6e6e6",
                }}
              >
                <Stack sx={{ md: { width: "75%" }, sm: { width: "100%" } }}>
                  <Stack
                    direction={{ xs: "row" }}
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={{ xs: 2 }}
                  >
                    <Text sx={{ fontSize: "0.9rem", color: "#333333" }}>
                      #{jobRefNo}
                    </Text>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={jobType}
                        color="success"
                        sx={{
                          fontSize: "0.7rem",
                          fontWeight: "550",
                        }}
                        variant="outlined"
                      />

                      <Chip
                        label={projectType}
                        color="primary"
                        sx={{
                          fontSize: "0.7rem",
                          fontWeight: "550",
                        }}
                        variant="outlined"
                      />
                    </Stack>
                  </Stack>

                  <Stack mt={0.5} spacing={0.5}>
                    <Text
                      sx={{
                        fontWeight: "600",
                        fontSize: "1.3rem",
                        color: "#262626",
                      }}
                    >
                      {jobTitle}
                    </Text>
                    <Text
                      sx={{
                        fontSize: "1rem",
                        color: "#333333",
                      }}
                    >
                      {jobShortDescription}
                    </Text>
                  </Stack>
                  <Stack
                    spacing={1}
                    mt={1}
                    sx={{
                      overflowX: "scroll",
                      scrollbarWidth: "none",
                      "&::-webkit-scrollbar": {
                        display: "none",
                      },
                    }}
                  >
                    <Stack direction="row" spacing={0}>
                      {skills.map((skill, index) => {
                        return (
                          <Stack direction="row" alignItems="center" key={skill.id}>
                            <Chip
                              label={skill.name}
                              sx={{
                                fontSize: "0.7rem",
                                fontWeight: "550",
                                marginRight: "0.625rem"
                              }}
                              variant="outlined"
                            />
                          </Stack>
                        );
                      })}
                    </Stack>
                  </Stack>
                </Stack>

                <Stack
                  spacing={1}
                  alignItems="flex-start"
                  pt={3}
                  direction={{ xs: "row", sm: "row", md: "column" }}
                >

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Tooltip title='Hours Required'>
                      <UpdateOutlinedIcon
                        sx={{
                          fontSize: "1.3rem",
                          color: "#4d4d4d",
                        }}
                      />
                    </Tooltip>

                    <Text sx={{ fontSize: "0.8rem", color: "#4d4d4d" }}>
                      {jobTiming.hourRequired} Hrs/{jobTiming.hourRequiredPer}
                    </Text>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Tooltip title='Total Duration'>
                      <DateRangeOutlinedIcon
                        sx={{
                          fontSize: "1.3rem",
                          color: "#4d4d4d",
                        }}
                      />
                    </Tooltip>

                    <Text sx={{ fontSize: "0.8rem", color: "#4d4d4d" }}>
                      {jobTiming.durationOfWork} {jobTiming.durationOfWorkType}
                    </Text>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Tooltip title='Pricing'>
                      <PriceChangeOutlinedIcon
                        sx={{
                          fontSize: "1.3rem",
                          color: "#4d4d4d",
                        }}
                      />
                    </Tooltip>

                    <Text sx={{ fontSize: "0.8rem", color: "#4d4d4d" }}>
                      ${billing.number}/{billing.type}
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
            </Link>
          </Stack>
        );
      })}
    </>
  );
}
