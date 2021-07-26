import React from "react";

import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import clsx from "clsx";
import {navBarStyles} from "./style";
import {
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
} from "@material-ui/core";
import {ChevronLeft, ChevronRight} from "@material-ui/icons";
import {GlobalLogo, Title} from "@eachbase/components";
import {Colors, Images, superAdminRouters} from "@eachbase/utils";
import {LeftBarImages} from "./leftBarImages";

export const LeftBar = ({
                            handleDrawerClose,
                            open,
                            theme,
                            setLinksStyle,
                            linkInfo,
                        }) => {
    const classes = navBarStyles();
    const dispatch = useDispatch();


    return (
        <div>
            <div
                className={classes.transition}
                style={
                    open === false ? {marginLeft: "47px"} : {marginLeft: "203px"}
                }
            >
                <IconButton
                    style={{background: Colors.BackgroundBlue, border:`2px solid ${Colors.TextWhite}`}}
                    className={classes.IconButtonStyle}
                    onClick={handleDrawerClose}
                >
                    {open === false ? <ChevronRight/> : <ChevronLeft/>}
                </IconButton>
            </div>

            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <GlobalLogo/>


                <List onClick={setLinksStyle} className={classes.menuItems}>
                    {superAdminRouters.map((item, i) => (
                        <Link
                            // onClick={ () => dispatch (authActions.saveWindowLink (item.path)) }
                            key={i}
                            to={item.path}
                        >
                            <div className={ linkInfo === item.path ? classes.linkWrapperActive : ''  }>
                            <ListItem
                                className={
                                    linkInfo === item.path ?
                                        open === false ? classes.activeListItemFalse :
                                            classes.activeListItem : classes.listItem
                                }
                                button
                            >
                                {
                                    <LeftBarImages
                                        item={item}
                                        linkInfo={linkInfo}
                                    />
                                }
                                {open && (
                                    <ListItemText
                                        className={
                                            linkInfo === item.path
                                                ? classes.menuActiveItemsStyle
                                                : classes.menuItemsStyle
                                        }
                                        primary={
                                            item.name.length > 13
                                                ? `${item.name.slice(0, 13)}...`
                                                : item.name
                                        }
                                    />
                                )}
                            </ListItem>
                            </div>
                        </Link>
                    ))}
                </List>
            </Drawer>
        </div>
    );
};
