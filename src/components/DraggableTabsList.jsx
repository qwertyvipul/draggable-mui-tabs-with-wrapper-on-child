import * as React from 'react';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import DraggableTab from './DraggableTab';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';

export default function DraggableTabsList(props) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const _renderTabList = (droppableProvided) => (
        <TabList onChange={handleChange} aria-label="Draggable Tabs">
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
        </TabList>
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
                        {_renderTabListWrappedInDroppable()}
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
