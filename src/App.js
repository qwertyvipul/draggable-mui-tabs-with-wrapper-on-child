import * as React from 'react';
import './styles.css';
import DraggableTabsList from './components/draggable/DraggableTabsList';
import DndExample from './components/dnd/DndExample';
import TabsList from './components/simple-tabs/TabsList';

export default function App() {
    const [tabs, setTabs] = React.useState(
        [...Array(55)].map((_, index) => ({
            id: `tab${index + 1}`,
            label: `Tab ${index + 1}`,
            value: `${index + 1}`,
            content: `Content ${index + 1}`,
        }))
    );

    //     [
    //     { id: 'tab1', label: 'Tab 1', value: '1', content: 'Content 1' },
    //     { id: 'tab2', label: 'Tab 2', value: '2', content: 'Content 2' },
    //     { id: 'tab3', label: 'Tab 3', value: '3', content: 'Content 3' },
    //     { id: 'tab4', label: 'Tab 4', value: '4', content: 'Content 4' },
    //     { id: 'tab5', label: 'Tab 5', value: '5', content: 'Content 5' },
    // ]);

    const onDragEnd = (result) => {
        const newTabs = Array.from(tabs);
        const draggedTab = newTabs.splice(result.source.index, 1)[0];
        newTabs.splice(result.destination.index, 0, draggedTab);
        setTabs(newTabs);
    };

    return (
        <div className="App">
            <h3>Draggable Tab List</h3>
            <DraggableTabsList onDragEnd={onDragEnd} tabs={tabs} />
            <hr />
            <h3>Normal Draggable Divs in Div</h3>
            <DndExample />
            <hr />
        </div>
    );
}
