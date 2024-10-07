import React from "react";
import Box from "@app/component/common/Box";
import Text from "@app/component/common/Text";
import Image from "@app/component/common/Image";

export const NoDataAvailable = ({ infoText, infoImage }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Image
        alt="No data Available"
        imgStyle={{ width: "auto", maxWidth: "100%", marginBottom: 10 }}
        src={infoImage ? infoImage : "/images/NoDataAvailable.png"}
        height={200}
      />
      <Text>{infoText ? infoText : "No Data Available"}</Text>
    </Box>
  );
};

export default NoDataAvailable