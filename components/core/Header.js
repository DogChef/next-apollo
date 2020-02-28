import React from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { styled as matStyled, useTheme } from "@material-ui/core/styles";
import { AppBar, Button, Box, Toolbar, Typography } from "@material-ui/core";
import fetch from "cross-fetch";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

import { drawerWidth } from "./SideBar";
import { logout } from "../../lib/useAuth";

function sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

const GET_SEARCH_FILTERED = gql`
  query getSearchFiltered($value: String!) {
    getSearchFiltered(value: $value)
  }
`;

const Header = () => {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [selected, setSelected] = React.useState("");
  const loaded = !(open && options?.length === 0);

  const { loading, error, data } = useQuery(GET_SEARCH_FILTERED, {
    variables: { value: selected }
  });

  React.useEffect(() => {
    let active = true;

    if (loaded) {
      return undefined;
    }

    if (active && data?.getSearchFiltered) {
      setOptions(data.getSearchFiltered);
    }

    return () => {
      active = false;
    };
  }, [loaded]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  if (data?.getSearchFiltered && options === []) {
    setOptions(data.getSearchFiltered);
  }

  const StyledAppBar = matStyled(AppBar)({
    width: "100%",
    zIndex: theme.zIndex.drawer + 1
  });

  const StyledToolbar = matStyled(Toolbar)({
    justifyContent: "space-between"
  });

  const ImageContainer = matStyled(Box)({
    width: drawerWidth,
    height: "64px"
  });

  const StyledImg = styled.img`
    width: 134px;
    height: 63px;
    margin: 0 auto;
    padding: 8px;
  `;

  const handleSearch = async (event, value) => {
    setSelected(value);

    /*const { data } = await client.query({
        query: USERS_QUERY,
        variables: { query: value, boardId: this.props.boardId }
      });
      this.setState({
        dataSource: data ? data.users : []
      })*/
  };

  return (
    <StyledAppBar position="fixed">
      <StyledToolbar>
        <ImageContainer>
          <StyledImg src="/logo_white.png" />
        </ImageContainer>
        <Autocomplete
          onInputChange={(event, value) => {
            handleSearch(event, value);
          }}
          style={{ width: 400 }}
          open={open}
          options={options}
          loading={!loaded}
          autoComplete
          autoHighlight
          autoSelect
          clearOnEscape
          disableOpenOnFocus
          selectOnFocus
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              fullWidth
              placeholder="Search..."
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {!loaded ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
                autoComplete: "new-password"
              }}
            />
          )}
        />
        <Button color="inherit" onClick={logout}>
          Log Out
        </Button>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
