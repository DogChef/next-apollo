import React from "react";
import gql from "graphql-tag";
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

const MOVE_ARTICLE = gql`
  mutation moveArticle($id: ID!, $parentId: ID!) {
    moveArticle(id: $id, parentId: $parentId)
  }
`;

const ItemTypes = {
  ARTICLE: "article"
};

const SideBarItem = ({
  id,
  isDragging,
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
      });
    },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  });

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

  const draggable = id
    ? { ref: dragRef, style: { opacity: isDragging ? 0.5 : 1, cursor: "move" } }
    : "";

  const droppable = id
    ? {
        ref: dropRef,
        style: { backgroundColor: isOver ? "#ffd600" : "transparent" }
      }
    : "";

  return (
    <div {...draggable}>
      <Link href={url}>
        <StyledListItem
          button
          selected={selected}
          onClick={onClick}
          {...droppable}
        >
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
    </div>
  );
};

export default SideBarItem;
