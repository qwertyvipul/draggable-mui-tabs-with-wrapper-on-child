import * as React from 'react';
import './styles.css';
import DraggableTabsList from './components/draggable-tabs/DraggableTabsList';
import HorizontalExample from './components/examples/HorizontalExample';
import MuiCopy from './components/examples/MuiCopy';
import DraggableItemsList from './components/examples/DraggableItemsList';

export default function App() {
    return (
        <div className="App">
            <h1>Draggable Tab List</h1>
            <DraggableTabsList />
            <hr />
            <h1>Mui Copy</h1>
            <MuiCopy />
            <hr />
            <h1>Horizontal Example</h1>
            <HorizontalExample />
            <hr />
            <h1>Draggable Items List</h1>
            <DraggableItemsList />
            <hr />
        </div>
    );
}
