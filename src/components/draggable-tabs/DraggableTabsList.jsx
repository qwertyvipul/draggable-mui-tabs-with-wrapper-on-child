import * as React from 'react';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import DraggableTab from './DraggableTab';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/material/styles';

const StyledTabList = styled(TabList)(({ theme }) => ({
    // overflowX: 'scroll', // this in MuiTabs-root causing some issue
    // '& MuiTabs-scrollableX': {},
    // '& .MuiTabs-scroller': {
    //     display: 'flex',
    //     scrollbarWidth: 'inherit',
    //     overflowX: 'scroll',
    // },
}));

const StyledTab = styled(Tab)(({ theme }) => {
    return {
        // display: 'flex',
        // background: 'yellow',
        // border: '1px solid black',
        // margin: '5px',
    };
});

export default function DraggableTabsList(props) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const _renderTabList = (droppableProvided) => (
        <StyledTabList onChange={handleChange} variant="scrollable">
            {props.tabs.map((tab, index) => {
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
        <DragDropContext onDragEnd={props.onDragEnd}>
            <div>
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
            {props.tabs.map((tab, index) => (
                <TabPanel value={tab.value} key={index}>
                    {tab.content}
                </TabPanel>
            ))}
        </TabContext>
    );
}
