import React from "react";
import Router from "next/router";
import { auth, redirect, logout } from "./useAuth";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import jwt_decode from "jwt-decode";

// Gets the display name of a JSX component for dev tools
const getDisplayName = Component =>
  Component.displayName || Component.name || "Component";

export const withAuth = ({ requiredRoles } = {}) => WrappedComponent =>
  class extends React.Component {
    state = {
      user: null
    };

    static displayName = `withAuth(${getDisplayName(WrappedComponent)})`;

    static async getInitialProps(ctx) {
      const signedIn = auth(ctx);

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(ctx));

      if (!signedIn) {
        redirect({ ctx, uri: "/sign-in" });
      }

      return { ...componentProps };
    }

    async componentDidMount() {
      try {
        //Cant call hook. Do query without hook
        const data = await useQuery(gql`
          query verifyUser {
            verifyUser {
              id
              name
              email
            }
          }
        `);

        console.log(data);
        const user = data.getLoggedUser;

        if (requiredRoles && !requiredRoles.includes(user.role)) {
          throw null;
        }

        this.setState({ user: user });
      } catch (err) {
        console.log(err);
        //redirect({ uri: "/sign-in" });
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          logout={logout}
          user={this.state.user || this.props.user}
        />
      );
    }
  };

export default withAuth;
