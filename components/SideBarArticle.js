import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import {
  Collapse,
  List,
  ListItemIcon,
  styled as matStyled,
  Typography
} from "@material-ui/core";
import SideBarItem from "./core/SideBarItem";
import {
  ChevronRight as ShowMoreIcon,
  ExpandLess as ShowLessIcon,
  InsertDriveFileOutlined
} from "@material-ui/icons";

const GET_ARTICLE = gql`
  query getArticle($id: ID!) {
    getArticle(id: $id) {
      id
      title
      children {
        id
        title
      }
    }
  }
`;

const ArticleIcon = matStyled(InsertDriveFileOutlined)({
  fontSize: "1.2rem",
  marginRight: "4px",
  marginBottom: "1px"
});

const SideBarArticle = props => {
  const [open, setOpen] = React.useState(!!props.rootPath);
  const { loading, error, data } = useQuery(GET_ARTICLE, {
    variables: { id: props.id }
  });

  const StyledListItemIcon = matStyled(ListItemIcon)({
    minWidth: "34px"
  });

  const handleOpen = event => {
    event.preventDefault();
    setOpen(!open);
  };

  const article = data?.getArticle;
  const titleId = `${article?.title}-${article?.id}`;

  return (
    <>
      <SideBarItem
        addSubArticle={() => props.addSubArticle(article?.id)}
        hierarchy={props.hierarchy}
        selected={titleId === props.selected}
        text={article?.title}
        url={`/article/${titleId}`}
      >
        <StyledListItemIcon onClick={handleOpen}>
          {open ? <ShowLessIcon /> : <ShowMoreIcon />}
        </StyledListItemIcon>
        <ArticleIcon />
      </SideBarItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {article?.children.map(({ id, title }, index) => (
          <SideBarArticle
            addSubArticle={props.addSubArticle}
            hierarchy={props.hierarchy + 1}
            id={id}
            key={index}
            // props.rootPath && props.rootPath.includes(`${title}-${id}`)
            rootPath={
              props.rootPath &&
              `${title}-${id}` === props.rootPath[props.hierarchy]
                ? props.rootPath
                : undefined
            }
            selected={props.selected}
          />
        ))}
      </Collapse>
    </>
  );
};

export default SideBarArticle;
