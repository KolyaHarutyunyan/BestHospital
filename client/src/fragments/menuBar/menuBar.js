import React, { useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import { navBarStyles } from "./core/style";
import { Router } from "../../root/router";
import { TopBar, LeftBar } from "./core";
import { useSelector } from "react-redux";

export const MenuBar = ({}) => {
  const classes = navBarStyles(),
    theme = useTheme(),
    [open, setOpen] = React.useState(false),
    [linkInfo, setLinkInfo] = React.useState(""),
    handleDrawerClose = () => {
      setOpen(!open);
    };

  const { saveLink } = useSelector((state) => ({
    saveLink: state.auth.saveLink,
  }));

  useEffect(
    () => setLinkInfo(saveLink ? saveLink : window.location.pathname),
    [saveLink]
  );

  const setLinksStyle = () => {
    setLinkInfo(window.location.pathname);
  };

  return (
    <div className={classes.root}>
      <TopBar open={open} handleClick={handleDrawerClose} />

      <LeftBar
        handleDrawerClose={handleDrawerClose}
        open={open}
        theme={theme}
        setLinksStyle={setLinksStyle}
        linkInfo={linkInfo}
      />

      <main className={classes.content}>
        <Router />
      </main>
    </div>
  );
};
