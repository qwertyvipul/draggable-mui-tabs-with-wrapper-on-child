import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

const MuiTabsRootCopy = styled.div({
    // display: 'flex',
    // overflow: 'hidden',
    //--------------------//
    overflowX: 'scroll',
});

const MuiTabsScrollerCopy = styled.div({
    // display: 'block',
    flexBasis: 'auto',
    flexGrow: 1,
    flexShrink: 1,
    overflowX: 'auto',
    overflowX: 'scroll',
    overflowY: 'hidden',
    position: 'relative',
    scrollbarWidth: 'none',
    //--------------------//
    display: 'flex',
});

const MuiTabsFlexContainerCopy = styled.div({
    display: 'flex',
    whiteSpace: 'nowrap',
});

const MuiButtonBaseRootCopy = styled.button({
    appearance: 'none',
    boxSizing: 'border-box',
    padding: '12px 16px',
    cursor: 'grab',
    display: 'inline-flex',
    flexDirection: 'column',
    flexShrink: '0',
    overflow: 'hidden',
    position: 'relative',
    touchAction: 'manipulation',
    userSelect: 'none',
    verticalAlign: 'middle',
});

export const MuiCopy = () => {
    const [itemsList, setItemsList] = React.useState(
        [...Array(55)].map((_, index) => ({
            label: `Item ${index + 1}`,
        }))
    );

    const onDragEnd = (result) => {
        const newList = Array.from(itemsList);
        const draggedItem = newList.splice(result.source.index, 1)[0];
        newList.splice(result.destination.index, 0, draggedItem);
        setItemsList(newList);
    };

    const _renderItemsList = (droppableProvided) => (
        <MuiTabsRootCopy className="MuiTabs-root-copy">
            <MuiTabsScrollerCopy className="MuiTabs-scroller-copy">
                <MuiTabsFlexContainerCopy className="MuiTabs-flexContainer-copy">
                    {itemsList.map((item, index) => {
                        return (
                            <Draggable
                                draggableId={`${index}`}
                                index={index}
                                disableInteractiveElementBlocking
                                key={index}
                            >
                                {(draggableProvided) => {
                                    return (
                                        <div
                                            ref={draggableProvided.innerRef}
                                            {...draggableProvided.draggableProps}
                                        >
                                            <MuiButtonBaseRootCopy
                                                className="MuiButtonBase-root-copy"
                                                {...draggableProvided.dragHandleProps}
                                            >
                                                {item.label}
                                            </MuiButtonBaseRootCopy>
                                        </div>
                                    );
                                }}
                            </Draggable>
                        );
                    })}
                    {droppableProvided ? droppableProvided.placeholder : null}
                </MuiTabsFlexContainerCopy>
            </MuiTabsScrollerCopy>
        </MuiTabsRootCopy>
    );

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    <Droppable droppableId="1" direction="horizontal">
                        {(droppableProvided) => {
                            return (
                                <div
                                    ref={droppableProvided.innerRef}
                                    {...droppableProvided.droppableProps}
                                >
                                    {_renderItemsList(droppableProvided)}
                                </div>
                            );
                        }}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    );
};

export default MuiCopy;
