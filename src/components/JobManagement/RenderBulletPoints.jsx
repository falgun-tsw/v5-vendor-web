import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import Stack from "@app/component/common/Stack";
import Text from "@app/component/common/Text";

const RenderBulletPoints = ({
  title = "",
  data = [],
  titlesx = {},
  datasx = {},
}) => {
  return (
    <Stack>
      <Text sx={[titlesx, { color: "#206BCD" }]}>{title}</Text>
      <Stack>
        {data.map((item) => {
          return (
            <Stack flexDirection="row" alignItems="center">
              <CircleIcon
                sx={{
                  fontSize: "0.375rem",
                  marginRight: "0.625rem",
                  color: "#5A5A5C",
                }}
              />
              <Text
                component="span"
                sx={{ fontSize: "1rem", color: "#5A5A5C" }}
              >
                {item}
              </Text>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default RenderBulletPoints;
