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
import { ArticleIcon } from "./SideBarArticles";
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
      rootPath
      children {
        id
        title
      }
    }
  }
`;

const SideBarArticle = props => {
  const [open, setOpen] = React.useState(false);
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
        selected={titleId === props.selected}
        text={article?.title}
        url={`/article/${titleId}`}
        hierarchy={props.hierarchy}
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
            selected={props.selected}
            id={id}
            key={index}
            hierarchy={props.hierarchy + 1}
          />
        ))}
      </Collapse>
    </>
  );
};

export default SideBarArticle;
