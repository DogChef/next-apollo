import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Collapse, ListItemIcon, styled as matStyled } from "@material-ui/core";
import {
  ChevronRight as ShowMoreIcon,
  ExpandLess as ShowLessIcon,
  InsertDriveFileOutlined
} from "@material-ui/icons";

import SideBarItem from "./common/SideBarItem";
import { TOGGLE_FAVOURITE } from "./core/mutations";
import { GET_SIDEBAR_ARTICLE } from "./core/queries";

const ArticleIcon = matStyled(InsertDriveFileOutlined)({
  fontSize: "1.2rem",
  marginRight: "4px",
  marginBottom: "1px"
});

const StyledListItemIcon = matStyled(ListItemIcon)({
  minWidth: "34px"
});

const SideBarArticle = ({
  addSubArticle,
  hierarchy,
  id,
  mainRefetch,
  reload,
  rootPath,
  selected
}) => {
  const [open, setOpen] = React.useState(!!rootPath);
  const [isFavourite, setFavourite] = React.useState("");
  const [toggleFavourite] = useMutation(TOGGLE_FAVOURITE);
  const { loading, error, data, refetch } = useQuery(GET_SIDEBAR_ARTICLE, {
    variables: { id: id },
    fetchPolicy: "no-cache"
  });

  useEffect(() => {
    !!rootPath && !open && setOpen(true);
  }, [rootPath]);

  useEffect(() => {
    reload && refetch();
  }, [reload]);

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
      .then(({ data: { isFavourite } }) => setFavourite(isFavourite))
      .catch(err => {
        //TODO: Add error management
        console.log(`Error Toggle Favourite: ${err}`);
      });
  };

  const article = data?.article;
  const titleId = `${article?.title}-${article?.id}`;
  isFavourite === "" && article && setFavourite(article.favourited);

  return (
    <>
      <SideBarItem
        addSubArticle={() => addSubArticle(article?.id)}
        favourited={isFavourite}
        hierarchy={hierarchy}
        id={article?.id}
        refetch={mainRefetch}
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
            mainRefetch={mainRefetch}
            // rootPath && rootPath.includes(`${title}-${id}`)
            reload={reload}
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
