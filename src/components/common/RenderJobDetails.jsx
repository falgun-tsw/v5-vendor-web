import React from "react";
import RenderKeyValue from "@app/component/common/RenderKeyValue";
import Stack from "@app/component/common/Stack";
import Text from "@app/component/common/Text";

const RenderJobDetails = ({ title = "", data = [], sxTitle= {}, sxData = {} }) => {
  return (
    <>
      <Text sx={[{ color: "#206BCD" },{sxTitle}]}>{title}</Text>
      <Stack spacing={1} py={1} sx={[{ width: "100%"},{sxData}]}>
        {data.map((data) => (
          <RenderKeyValue
            label={data.label}
            value={data.value}
            sxForLabel={{ fontSize: "0.9rem", color: "#5A5A5C" }}
            sxForValue={{ fontSize: "0.9rem", color: "#5A5A5C" }}
          />
        ))}
      </Stack>
    </>
  );
};

export default RenderJobDetails;
