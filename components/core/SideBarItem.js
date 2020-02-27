import React from "react";
import Link from "next/link";
import { styled as matStyled, useTheme } from "@material-ui/core/styles";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  Add as AddIcon,
  StarOutlined as FavouriteIcon,
  StarBorder as StarIcon
} from "@material-ui/icons";

const SideBarItem = ({
  hierarchy,
  addSubArticle,
  toggleFavourite,
  url,
  selected,
  onClick,
  children,
  text,
  favourited
}) => {
  const theme = useTheme();

  const StyledListItem = matStyled(ListItem)({
    paddingLeft: theme.spacing(1 + hierarchy),

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

  const addSubArticleTrigger = event => {
    event.preventDefault();
    addSubArticle();
  };

  const toggleFavouriteTrigger = event => {
    event.preventDefault();
    toggleFavourite();
  };

  return (
    <Link href={url}>
      <StyledListItem button selected={selected} onClick={onClick}>
        {children}
        <ListItemText primary={text} />
        {addSubArticle && (
          <>
            <StyledIcon onClick={toggleFavouriteTrigger}>
              {favourited ? <StyledFavourite /> : <StarIcon />}
            </StyledIcon>
            <StyledIcon onClick={addSubArticleTrigger}>
              <AddIcon />
            </StyledIcon>
          </>
        )}
      </StyledListItem>
    </Link>
  );
};

export default SideBarItem;
