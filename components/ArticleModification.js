import React from "react";
import {
  Box,
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  styled as matStyled,
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

const useStyles = makeStyles(theme => ({
  listItem: {
    paddingLeft: theme.spacing(2)
  },

  subListItem: {
    paddingLeft: theme.spacing(4)
  }
}));

const ArticleModification = ({ authorTime, author, title, body, rootPath }) => {
  const [open, setOpen] = React.useState(!!rootPath);
  const classes = useStyles();

  return (
    <>
      <ListItem className={classes.listItem}>
        <StyledListItemIcon>
          <EditIcon />
        </StyledListItemIcon>
        <ListItemText primary={authorTime} />
        <StyledListItemIcon onClick={() => setOpen(!open)}>
          {open ? <ShowLessIcon /> : <ShowMoreIcon />}
        </StyledListItemIcon>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ListItem className={classes.subListItem}>
          <StyledListItemIcon>
            <AuthorIcon />
          </StyledListItemIcon>
          <ListItemText primary={`Author: ${author.name}`} />
        </ListItem>
        <ListItem className={classes.subListItem}>
          <StyledListItemIcon>
            <TitleIcon />
          </StyledListItemIcon>
          <ListItemText primary={`Title: ${title}`} />
        </ListItem>
        <ListItem className={classes.subListItem}>
          <StyledListItemIcon>
            <BodyIcon />
          </StyledListItemIcon>
          <StyledBox dangerouslySetInnerHTML={{ __html: body }} />
        </ListItem>
      </Collapse>
    </>
  );
};

export default ArticleModification;
