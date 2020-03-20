import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Divider, styled as matStyled } from "@material-ui/core";
import { ExpandMore as ArrowIcon } from "@material-ui/icons";

import SideBarArticle from "./SideBarArticle";
import { GET_ARTICLES, GET_FAVOURITE_ARTICLES } from "./core/queries";

const SideBarArticles = ({ isMain, addSubArticle, rootPath, selected }) => {
  const [reload, setReload] = useState(false);
  const { loading, error, data, refetch, networkStatus } = useQuery(
    isMain ? GET_ARTICLES : GET_FAVOURITE_ARTICLES,
    {
      fetchPolicy: "no-cache",
      notifyOnNetworkStatusChange: true
    }
  );

  useEffect(() => {
    networkStatus === 4 && setReload(new Date());
  }, [networkStatus]);

  const articles = isMain ? data?.articles : data?.verifiedUser?.favourites;

  return (
    <>
      {articles?.map(
        ({ id, title, parent }, index) =>
          (!parent || !isMain) && (
            <div key={index}>
              <SideBarArticle
                addSubArticle={addSubArticle}
                hierarchy={1}
                id={id}
                rootPath={
                  `${title}-${id}` === rootPath[0] ? rootPath : undefined
                }
                mainRefetch={isMain && refetch}
                reload={reload}
                selected={selected}
              />
              {!isMain && <Divider />}
            </div>
          )
      )}
    </>
  );
};

export default SideBarArticles;
