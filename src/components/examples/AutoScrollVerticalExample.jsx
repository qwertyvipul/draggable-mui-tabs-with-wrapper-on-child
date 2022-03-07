import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from '@emotion/styled';

const ItemContainer = styled.div({
    background: 'green',
    padding: '10px',
});

const Item = styled.div({
    background: 'yellow',
    padding: '10px',
    margin: '10px',
    border: '1px solid black',
});

export const DndExample = () => {
    const [itemsList, setItemsList] = React.useState(
        [...Array(15)].map((_, index) => ({
            label: `Item ${index + 1}`,
        }))
    );

    const onDragEnd = (result) => {
        console.log(result);
    };

    const _renderItemsList = (droppableProvided) => (
        <ItemContainer>
            {itemsList.map((item, index) => {
                return (
                    <Draggable
                        draggableId={`${index}`}
                        index={index}
                        disableInteractiveElementBlocking
                        key={index}
                    >
                        {(draggableProvided) => {
                            const style = {
                                // display: 'inline-block',
                                ...draggableProvided.draggableProps.style,
                            };
                            return (
                                <div
                                    ref={draggableProvided.innerRef}
                                    {...draggableProvided.draggableProps}
                                    style={style}
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
        </ItemContainer>
    );

    return (
        <div
            style={{ background: 'green', height: '500px', overflow: 'scroll' }}
        >
            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    <Droppable droppableId="1" direction="vertical">
                        {(droppableProvided) => {
                            // const style = {
                            //     width: '300px',
                            //     display: 'flex',
                            //     flexFlow: 'row',
                            //     flexWrap: 'nowrap',
                            //     overflow: 'scroll',
                            //     ...droppableProvided.droppableProps.style,
                            // };
                            return (
                                <div
                                    ref={droppableProvided.innerRef}
                                    {...droppableProvided.droppableProps}
                                    // style={style}
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

export default DndExample;
