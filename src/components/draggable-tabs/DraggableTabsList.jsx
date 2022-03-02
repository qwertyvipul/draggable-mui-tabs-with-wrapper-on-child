import * as React from 'react';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import { Tabs } from '@mui/material';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import DraggableTab from './DraggableTab';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import { TabsContext } from './TabsContext';
import TabDropdown from './TabDropdown';

export default function DraggableTabsList(props) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const _renderTabList = (droppableProvided) => (
        <Tabs
            onChange={handleChange}
            aria-label="Draggable Tabs"
            variant="scrollable"
            ScrollButtonComponent={TabDropdown}
        >
            {props.tabs.map((tab, index) => {
                const child = (
                    <Tab label={tab.label} value={tab.value} key={index} />
                );

                return (
                    <DraggableTab
                        label={tab.label}
                        value={tab.value}
                        index={index}
                        key={index}
                        child={child}
                    />
                );
            })}
            {droppableProvided ? droppableProvided.placeholder : null}
        </Tabs>
    );

    const _renderTabListWrappedInDroppable = () => (
        <DragDropContext onDragEnd={props.onDragEnd}>
            <Droppable droppableId="1" direction="horizontal">
                {(droppableProvided) => (
                    <div
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}
                    >
                        {_renderTabList(droppableProvided)}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Stack direction="column">
                        <TabsContext.Provider
                            value={{
                                tabs: props.tabs,
                                onChange: handleChange,
                                value: value,
                            }}
                        >
                            {_renderTabListWrappedInDroppable()}
                        </TabsContext.Provider>
                    </Stack>
                </Box>
                {props.tabs.map((tab, index) => (
                    <TabPanel value={tab.value} key={index}>
                        {tab.content}
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    );
}
