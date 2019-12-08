import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Anchor, DropButton, Box, Button, Menu } from "grommet";
import { Avatar } from "grommet-controls";
import { UserSettings, Logout } from "grommet-icons";

import { useAuth0 } from "../../react-auth0-spa";
import Logo from "./Logo";
import css from "./NavBar.module.css";

const NavBar = props => {
  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const roles = user ? user["http://a.mrkeebs.com/roles"] : [];

  const artisansIsActive = (match, location) =>
    location.pathname.startsWith("/artisan") ||
    location.pathname.startsWith("/catalogs");

  let history = useHistory();

  const links = [
    { name: "Artisans", path: "/artisans", active: artisansIsActive },
    { name: "My Artisans", path: "/my-artisans", auth: true },
    { name: "Wishlist", path: "/wishlist", auth: true },
    { name: "Submit", path: "/submit", auth: true },
    { name: "Review", path: "/review", role: "reviewer" },
    { name: "Bot", path: "/bot" }
  ]
    .filter(linkDef => {
      if (linkDef.role) {
        return roles.indexOf(linkDef.role) > -1;
      }
      return (
        !linkDef.hasOwnProperty("auth") ||
        (linkDef.auth === true && isAuthenticated) ||
        (linkDef.auth === false && !isAuthenticated)
      );
    })
    .map(linkDef => {
      const exact = linkDef.exact !== false;

      return (
        <Anchor
          key={`nv_${linkDef.name}`}
          as={NavLink}
          label={linkDef.name}
          to={linkDef.path}
          exact={exact}
          isActive={linkDef.active}
          activeClassName={exact === false ? "" : css.RouterLinkActive}
        />
      );
    });

  let xpto = null;
  if (!isAuthenticated) {
    xpto = (
      <Box>
        <Button
          label="log in"
          primary={true}
          onClick={() => loginWithRedirect({})}
        />
      </Box>
    );
  } else {
    const roles = user ? user["http://a.mrkeebs.com/roles"] : [];

    xpto = (
      <Box align="center" direction="row" gap="xxsmall">
        <Menu
          label={
            <Avatar
              image={user.picture}
              title={user.name}
              subTitle={
                roles.includes("reviewer") ? "reviewer" : "collaborator"
              }
            />
          }
          items={[
            {
              icon: <UserSettings />,
              label: "Profile",
              onClick: () => {
                history.push("/profile");
              },
              gap: "medium",
              hoverIndicator: true,
              alignSelf: "stretch"
            },
            {
              icon: <Logout />,
              label: "Log out",
              onClick: () => logoutWithRedirect(),
              gap: "medium",
              hoverIndicator: true,
              alignSelf: "stretch"
            }
          ]}
          justifyContent="between"
        />
      </Box>
    );
  }

  return (
    <Box
      align="center"
      alignContent="center"
      tag="header"
      background="light-1"
      direction="row"
      flex={false}
      justify="around"
      pad={{ vertical: "small", horizontal: "small" }}
      gap="large"
      elevation="small"
    >
      <Box direction="row" gap="large" align="center" alignContent="center">
        <Logo />
        {links}
      </Box>
      {xpto}
    </Box>
  );
};

export default NavBar;
