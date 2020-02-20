import React from "react";
import Link from "next/link";
import { styled as matStyled, useTheme } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";

const SideBarItem = props => {
  const theme = useTheme();

  const StyledListItem = matStyled(ListItem)({
    paddingLeft: theme.spacing(2 + props.hierarchy),

    "&.Mui-selected .MuiListItemText-primary": {
      fontWeight: 600,
      color: `${theme.palette.primary.dark}`
    },

    "&.Mui-selected .MuiListItemIcon-root": {
      color: `${theme.palette.primary.dark} !important`
    }
  });

  const StyledIcon = matStyled(ListItemIcon)({
    minWidth: 0,
    paddingRight: "5px"
  });

  const addSubArticle = event => {
    event.preventDefault();
    props.addSubArticle();
  };

  return (
    <Link href={props.url} passHref>
      <StyledListItem button selected={props.selected} onClick={props.onClick}>
        {props.children}
        <ListItemText primary={props.text} />
        {props.addSubArticle && (
          <StyledIcon onClick={addSubArticle}>
            <AddIcon />
          </StyledIcon>
        )}
      </StyledListItem>
    </Link>
  );
};

export default SideBarItem;
