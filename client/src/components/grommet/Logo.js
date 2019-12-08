import React from "react";
import { Box, Image } from "grommet";

import LogoImage from "../../assets/logo.png";

const Logo = ({ height, width }) => (
  <Box
    height={height || "2.5rem"}
    width={width || "2.5rem"}
    round="full"
  >
    <Image fit="cover" src={LogoImage} />
  </Box>
);

export default Logo;
