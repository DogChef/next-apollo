import React from "react";
import {
  Box,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled as matStyled,
  useTheme,
  Typography
} from "@material-ui/core";
import {
  ChevronRight as ShowMoreIcon,
  ExpandLess as ShowLessIcon,
  Create as EditIcon,
  Face as AuthorIcon,
  Label as TitleIcon,
  FormatAlignJustify as BodyIcon
} from "@material-ui/icons";

const ArticleModification = ({ authorTime, author, title, body, rootPath }) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(!!rootPath);

  const StyledListItem = matStyled(ListItem)({
    paddingLeft: theme.spacing(2)
  });

  const StyledSubListItem = matStyled(ListItem)({
    paddingLeft: theme.spacing(4)
  });

  const StyledListItemIcon = matStyled(ListItemIcon)({
    minWidth: "40px"
  });

  const StyledBox = matStyled(Box)({
    width: "100%"
  });

  const StyledIcon = matStyled(ListItemIcon)({
    minWidth: 0,
    paddingRight: "3px"
  });

  return (
    <>
      <StyledListItem>
        <StyledListItemIcon>
          <EditIcon />
        </StyledListItemIcon>
        <ListItemText primary={authorTime} />
        <StyledListItemIcon onClick={() => setOpen(!open)}>
          {open ? <ShowLessIcon /> : <ShowMoreIcon />}
        </StyledListItemIcon>
      </StyledListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <StyledSubListItem>
          <StyledListItemIcon>
            <AuthorIcon />
          </StyledListItemIcon>
          <ListItemText primary={`Author: ${author.name}`} />
        </StyledSubListItem>
        <StyledSubListItem>
          <StyledListItemIcon>
            <TitleIcon />
          </StyledListItemIcon>
          <ListItemText primary={`Title: ${title}`} />
        </StyledSubListItem>
        <StyledSubListItem>
          <StyledListItemIcon>
            <BodyIcon />
          </StyledListItemIcon>
          <StyledBox dangerouslySetInnerHTML={{ __html: body }} />
        </StyledSubListItem>
      </Collapse>
    </>
  );
};

export default ArticleModification;
