import React from "react";
import Box from "@material-ui/core/Box";

const TabPanel = ({ children, value, index, ...other }) => (
  <Box role="tabpanel" hidden={value !== index}>
    {value === index && children}
  </Box>
);

export default TabPanel;
