import React from "react";
import Link from "next/link";
import { styled as matStyled, useTheme } from "@material-ui/core/styles";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const SideBarItem = props => {
  const theme = useTheme();

  const StyledListItem = matStyled(ListItem)({
    "&.Mui-selected .MuiListItemText-primary": {
      fontWeight: 600,
      color: `${theme.palette.primary.dark}`
    },

    "&.Mui-selected .MuiListItemIcon-root": {
      color: `${theme.palette.primary.dark} !important`
    }
  });

  return (
    <Link href={props.url} passHref>
      <StyledListItem button selected={props.selected} onClick={props.onClick}>
        <ListItemIcon>{props.children}</ListItemIcon>
        <ListItemText primary={props.text} />
      </StyledListItem>
    </Link>
  );
};

export default SideBarItem;
