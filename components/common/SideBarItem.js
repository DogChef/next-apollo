import React from "react";
import { useMutation } from "@apollo/react-hooks";
import Link from "next/link";
import { styled as matStyled, useTheme } from "@material-ui/core/styles";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  Add as AddIcon,
  StarOutlined as FavouriteIcon,
  StarBorder as StarIcon
} from "@material-ui/icons";
import { useDrag, useDrop } from "react-dnd";

import { MOVE_ARTICLE } from "../core/mutations";

const ItemTypes = {
  ARTICLE: "article"
};

const StyledIcon = matStyled(ListItemIcon)({
  minWidth: 0,
  paddingRight: "3px"
});

const StyledFavourite = matStyled(FavouriteIcon)({
  color: "#E8C200"
});

const SideBarItem = ({
  addSubArticle,
  children,
  favourited,
  hierarchy = 0,
  id,
  isDragging,
  onClick,
  refetch,
  selected,
  text,
  toggleFavourite,
  url
}) => {
  const theme = useTheme();
  const [moveArticle] = useMutation(MOVE_ARTICLE);
  const [{ opacity }, dragRef] = useDrag({
    item: { id: id, type: ItemTypes.ARTICLE },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: ItemTypes.ARTICLE,
    drop: draggedArticle => {
      moveArticle({
        variables: {
          id: draggedArticle.id,
          parentId: id
        }
      }).then(({ data: { moveArticle } }) => {
        moveArticle && refetch();
      });
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

  const addSubArticleTrigger = event => {
    event.preventDefault();
    addSubArticle();
  };

  const toggleFavouriteTrigger = event => {
    event.preventDefault();
    toggleFavourite();
  };

  const draggable =
    id && refetch
      ? {
          ref: dragRef,
          style: { opacity: isDragging ? 0.5 : 1, cursor: "move" }
        }
      : "";

  const droppable =
    id && refetch
      ? {
          ref: dropRef,
          style: { backgroundColor: isOver ? "#ffd600" : "transparent" }
        }
      : "";

  const styledListItem = {
    paddingLeft: theme.spacing(1 + hierarchy),

    "&.MuiSelected .MuiListItemTextPrimary": {
      fontWeight: 600,
      color: `${theme.palette.primary.dark}`
    },

    "&.MuiSelected .MuiListItemIconRoot": {
      color: `${theme.palette.primary.dark} !important`
    }
  };

  return (
    <div {...draggable}>
      <Link href={url}>
        <ListItem
          button
          selected={selected}
          onClick={onClick}
          style={styledListItem}
          {...droppable}
        >
          {children}
          <ListItemText primary={text} title={text} />
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
        </ListItem>
      </Link>
    </div>
  );
};

export default SideBarItem;
