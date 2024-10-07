import React from 'react'
import Stack from '@app/component/common/Stack';
import Text from '@app/component/common/Text';

const RenderKeyValue = ({ label, value, sxForValue={}, sxForLabel={} }) => {
    return (
        <Stack direction="row">
          <Text
            sx={[{
              fontSize: "1rem",
              fontWeight: "550",
              marginRight: "0.5rem",
            },sxForLabel]}
          >
            {label}
          </Text>
          <Text sx={[{fontSize: "1rem",fontWeight:"400"},sxForValue]}>{value}</Text>
        </Stack>
      );
}

export default React.memo(RenderKeyValue)