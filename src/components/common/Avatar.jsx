import React from "react";
import MAvatar from "@mui/material/Avatar";

import Text from "@app/component/common/Text";

const Avatar = ({ src, children, title, variant = "h2", avatarVariant="", sx = {}, text_sx={}, ...restProps }) => {
  if (src) {
    return (
      <MAvatar
        alt={title}
        src={src}
        variant={avatarVariant}
        sx={{ width: 96, height: 96, ...sx }}
        {...restProps}
      />
    );
  }

  if (children) {
    return (
      <MAvatar variant={avatarVariant} sx={{ ...sx }} {...restProps}>
        {children}
      </MAvatar>
    );
  }

  return (
    <MAvatar variant={avatarVariant} sx={{ width: 96, height: 96, backgroundColor: "primary.main", ...sx }}>
      <Text variant={variant} sx={{ lineHeight: 1, ...text_sx }}>{title ? title.charAt(0) : "J"}</Text>
    </MAvatar>
  );
};

export default React.memo(Avatar);
