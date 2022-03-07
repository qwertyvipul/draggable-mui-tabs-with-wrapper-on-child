import * as React from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import { styled } from '@mui/material/styles';

function DraggableTab(props) {
    return (
        <Draggable
            draggableId={`${props.index}`}
            index={props.index}
            disableInteractiveElementBlocking
        >
            {(draggableProvided) => (
                <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                >
                    {React.cloneElement(props.child, {
                        ...props,
                        ...draggableProvided.dragHandleProps,
                    })}
                </div>
            )}
        </Draggable>
    );
}

const StyledTabList = styled(TabList)();
const StyledTab = styled(Tab)();

export default function DraggableTabsList() {
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

    const onDragEnd = (result) => {
        const newTabs = Array.from(tabs);
        const draggedTab = newTabs.splice(result.source.index, 1)[0];
        newTabs.splice(result.destination.index, 0, draggedTab);
        setTabs(newTabs);
    };

    const _renderTabList = (droppableProvided) => (
        <StyledTabList onChange={handleChange} variant="scrollable">
            {tabs.map((tab, index) => {
                const child = (
                    <StyledTab
                        label={tab.label}
                        value={tab.value}
                        key={index}
                    />
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
        </StyledTabList>
    );

    const _renderTabListWrappedInDroppable = () => (
        <DragDropContext onDragEnd={onDragEnd}>
            <div style={{ display: 'flex', overflow: 'auto' }}>
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
            </div>
        </DragDropContext>
    );

    return (
        <TabContext value={value}>
            {_renderTabListWrappedInDroppable()}
            {tabs.map((tab, index) => (
                <TabPanel value={tab.value} key={index}>
                    {tab.content}
                </TabPanel>
            ))}
        </TabContext>
    );
}
