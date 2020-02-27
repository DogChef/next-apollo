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
import {
  Add as AddIcon,
  StarOutlined as FavouriteIcon,
  StarBorder as StarIcon
} from "@material-ui/icons";

const SideBarItem = props => {
  const theme = useTheme();

  const StyledListItem = matStyled(ListItem)({
    paddingLeft: theme.spacing(1 + props.hierarchy),

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
    paddingRight: "3px"
  });

  const StyledFavourite = matStyled(FavouriteIcon)({
    color: "#E8C200"
  });

  const addSubArticle = event => {
    event.preventDefault();
    props.addSubArticle();
  };

  const toggleFavourite = event => {
    event.preventDefault();
    props.toggleFavourite();
  };

  return (
    <Link href={props.url}>
      <StyledListItem button selected={props.selected} onClick={props.onClick}>
        {props.children}
        <ListItemText primary={props.text} />
        {props.addSubArticle && (
          <>
            <StyledIcon onClick={toggleFavourite}>
              {props.favourited ? <StyledFavourite /> : <StarIcon />}
            </StyledIcon>
            <StyledIcon onClick={addSubArticle}>
              <AddIcon />
            </StyledIcon>
          </>
        )}
      </StyledListItem>
    </Link>
  );
};

export default SideBarItem;
