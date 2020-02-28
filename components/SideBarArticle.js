import React from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Collapse, ListItemIcon, styled as matStyled } from "@material-ui/core";
import {
  ChevronRight as ShowMoreIcon,
  ExpandLess as ShowLessIcon,
  InsertDriveFileOutlined
} from "@material-ui/icons";

import SideBarItem from "./core/SideBarItem";

const GET_ARTICLE = gql`
  query getArticle($id: ID!) {
    getArticle(id: $id) {
      id
      title
      favourited
      children {
        id
        title
      }
    }
  }
`;

const TOGGLE_FAVOURITE = gql`
  mutation toggleFavourite($articleId: ID!) {
    toggleFavourite(articleId: $articleId)
  }
`;

const ArticleIcon = matStyled(InsertDriveFileOutlined)({
  fontSize: "1.2rem",
  marginRight: "4px",
  marginBottom: "1px"
});

const SideBarArticle = ({
  rootPath,
  id,
  addSubArticle,
  hierarchy,
  selected
}) => {
  const [open, setOpen] = React.useState(!!rootPath);
  const [isFavourite, setFavourite] = React.useState("");
  const [toggleFavourite] = useMutation(TOGGLE_FAVOURITE);
  const { loading, error, data } = useQuery(GET_ARTICLE, {
    variables: { id: id }
  });

  const StyledListItemIcon = matStyled(ListItemIcon)({
    minWidth: "34px"
  });

  const handleOpen = event => {
    event.preventDefault();
    setOpen(!open);
  };

  const toggleFavouriteAction = () => {
    toggleFavourite({
      variables: {
        articleId: article?.id
      }
    })
      .then(({ data: { toggleFavourite } }) => setFavourite(toggleFavourite))
      .catch(err => {
        //TODO: Add error management
        console.log(`Error Toggle Favourite: ${err}`);
      });
  };

  const article = data?.getArticle;
  const titleId = `${article?.title}-${article?.id}`;

  isFavourite === "" && article && setFavourite(article.favourited);

  return (
    <>
      <SideBarItem
        addSubArticle={() => addSubArticle(article?.id)}
        favourited={isFavourite}
        hierarchy={hierarchy}
        id={article?.id}
        selected={titleId === selected}
        text={article?.title}
        toggleFavourite={toggleFavouriteAction}
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
            addSubArticle={addSubArticle}
            hierarchy={hierarchy + 1}
            id={id}
            key={index}
            // rootPath && rootPath.includes(`${title}-${id}`)
            rootPath={
              rootPath && `${title}-${id}` === rootPath[hierarchy]
                ? rootPath
                : undefined
            }
            selected={selected}
          />
        ))}
      </Collapse>
    </>
  );
};

export default SideBarArticle;
