import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';

export const TabsList = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [tabs, setTabs] = React.useState(
        [...Array(55)].map((_, index) => ({
            id: `tab${index + 1}`,
            label: `Tab ${index + 1}`,
            value: `${index + 1}`,
            content: `Content ${index + 1}`,
        }))
    );
    return (
        <div>
            <Box sx={{ width: '500px', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Stack direction="column">
                            <TabList
                                onChange={handleChange}
                                aria-label="Draggable Tabs"
                                variant="scrollable"
                                scrollButtons="auto"
                                visibleScrollbar={true}
                            >
                                {tabs.map((tab, index) => (
                                    <Tab
                                        label={tab.label}
                                        value={tab.value}
                                        key={index}
                                    />
                                ))}
                            </TabList>
                        </Stack>
                    </Box>
                    {tabs.map((tab, index) => (
                        <TabPanel value={tab.value} key={index}>
                            {tab.content}
                        </TabPanel>
                    ))}
                </TabContext>
            </Box>
        </div>
    );
};

export default TabsList;
