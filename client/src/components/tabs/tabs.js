import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {tabsStyles} from "./styles";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={0} mt={4}>
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
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
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
                    aria-label="simple tabs example"
                    indicatorColor='primary'
                    className={tabStyle.collor}
                >
                    {
                        tabsLabels && tabsLabels.map((tabLabel, index)=>{
                            return (
                                <Tab onClick={()=> {
                                    setAuthActive &&   setAuthActive(false)
                                    setActiveTab(index)
                                }}  className={tabStyle.tabLabel} label={tabLabel.label} {...a11yProps(index)} />
                            )
                        })
                    }
                </Tabs>
            </AppBar>
            {
                tabsContent && tabsContent.map((tabContent, index)=>{
                    return (
                        <TabPanel value={value} index={index}>
                            {tabContent.tabComponent}
                        </TabPanel>
                    )
                })
            }
        </div>
    );
}
