import React from "react";
import { CardActionArea, Chip } from "@mui/material";
import Card from "@app/component/common/Card";
import Stack from "@app/component/common/Stack";
import Text from "@app/component/common/Text";
import { dateTimeHelper } from "@app/helper/dateTime";
import constants from "@app/helper/constants";

const RaiseDisputeCard = ({
  disputeRefNo,
  disputeTitle,
  createdAt,
  disputeStatus,
  onPress,
}) => {
  return (
    <Card sx={{ marginBottom: "20px" }}>
      <CardActionArea onClick={onPress} sx={{ padding: "1rem" }}>
        <Text pb={1} sx={{ fontSize: "0.9rem", color: "#333333" }}>
          #{disputeRefNo}
        </Text>
        <Text pb={1}>{disputeTitle}</Text>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text>{dateTimeHelper.displayDate(createdAt)}</Text>
          <Chip
            label={constants[disputeStatus]?.label}
            sx={{
              fontSize: "0.7rem",
              fontWeight: "550",
              color: constants[disputeStatus]?.color,
              backgroundColor: constants[disputeStatus]?.backgroundColor,
              border: `1px solid ${constants[disputeStatus]?.color}`
            }}
            variant="outlined"
          />
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default RaiseDisputeCard;
