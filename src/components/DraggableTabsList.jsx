import * as React from 'react';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import DraggableTab from './DraggableTab';
import Tab from '@mui/material/Tab';

export default function DraggableTabsList(props) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [tabs, setTabs] = React.useState([
        { id: 'tab1', label: 'Tab 1', value: '1', content: 'Content 1' },
        { id: 'tab2', label: 'Tab 2', value: '2', content: 'Content 2' },
        { id: 'tab3', label: 'Tab 3', value: '3', content: 'Content 3' },
        { id: 'tab4', label: 'Tab 4', value: '4', content: 'Content 4' },
        { id: 'tab5', label: 'Tab 5', value: '5', content: 'Content 5' },
    ]);

    const onDragEnd = (result) => {
        const newTabs = Array.from(tabs);
        const draggedTab = newTabs.splice(result.source.index, 1)[0];
        newTabs.splice(result.destination.index, 0, draggedTab);
        setTabs(newTabs);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="1" direction="horizontal">
                            {(droppableProvided) => (
                                <div
                                    ref={droppableProvided.innerRef}
                                    {...droppableProvided.droppableProps}
                                >
                                    <TabList
                                        onChange={handleChange}
                                        aria-label="lab API tabs example"
                                    >
                                        {tabs.map((tab, index) => {
                                            const child = (
                                                <DraggableTab
                                                    child={
                                                        <Tab
                                                            label={tab.label}
                                                            value={tab.value}
                                                        />
                                                    }
                                                    index={index}
                                                    key={index}
                                                />
                                            );
                                            return child;
                                        })}
                                        {droppableProvided.placeholder}
                                    </TabList>
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </Box>
                {tabs.map((tab, index) => (
                    <TabPanel value={tab.value} key={index}>
                        {tab.content}
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    );
}
