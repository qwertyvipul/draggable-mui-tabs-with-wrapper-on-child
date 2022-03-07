import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

const DroppableWrapperDiv = styled.div({
    overflowX: 'scroll',
});

const ItemsList = styled.div({
    display: 'flex',
});

const Item = styled.button({
    boxSizing: 'border-box',
    padding: '10px',
    whiteSpace: 'nowrap',
});

export const DraggableItemsList = () => {
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
        <ItemsList>
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
                                    <Item
                                        {...draggableProvided.dragHandleProps}
                                    >
                                        {item.label}
                                    </Item>
                                </div>
                            );
                        }}
                    </Draggable>
                );
            })}
            {droppableProvided ? droppableProvided.placeholder : null}
        </ItemsList>
    );

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <DroppableWrapperDiv>
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
                </DroppableWrapperDiv>
            </DragDropContext>
        </div>
    );
};

export default DraggableItemsList;
