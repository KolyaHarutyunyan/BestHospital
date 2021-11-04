import React from 'react';
import PropTypes from 'prop-types';
import {AppBar,Tabs,Tab,Typography,Box } from '@material-ui/core';
import {tabsStyles} from "./styles";

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

export const SimpleTabs = ({tabsLabels, tabsContent, setActiveTab, setAuthActive}) => {
    const tabStyle = tabsStyles()
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={tabStyle.root}>

            <AppBar className={tabStyle.tabHeader} position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor='primary'
                    className={tabStyle.collor}
                    aria-label="scrollable force tabs example"
                    scrollButtons="on"
                    variant="scrollable"
                >
                    {
                        tabsLabels && tabsLabels.map((tabLabel, index) => {
                            return (
                                <Tab key={index} onClick={() => {
                                    setAuthActive && setAuthActive(false)
                                    setActiveTab(index)
                                }} className={tabStyle.tabLabel} label={tabLabel.label} {...a11yProps(index)} />
                            )
                        })
                    }
                </Tabs>
            </AppBar>
            {
                tabsContent && tabsContent.map((tabContent, index) => {
                    return (
                        <div key={index}>
                            <TabPanel value={value} index={index}>
                                {tabContent.tabComponent}
                            </TabPanel>
                        </div>
                    )
                })
            }
        </div>
    );
}
