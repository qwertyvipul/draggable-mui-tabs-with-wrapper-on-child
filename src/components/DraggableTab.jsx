import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import Tab from "@mui/material/Tab";

export default function DraggableTab(props) {
  console.log(props.child);
  return (
    <Draggable draggableId={`${props.index}`} index={props.index}>
      {(draggableProvided) => (
        <div
          ref={draggableProvided.innerRef}
          {...draggableProvided.draggableProps}
        >
          <span {...draggableProvided.dragHandleProps}>||</span>
          {props.child}
        </div>
      )}
    </Draggable>
  );
}
