import React from 'react';
import Timeline from './components/Timeline/Timeline';

function App() {
  const items = [
    {
      id: '1',
      date: new Date(2021, 11, 3),
      title: 'Item 1',
      description: 'Description 1',
      attribute: 'Attribute 1',
      status: {
        text: 'Recently Added',
        style: { backgroundColor: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '4px' },
        icon: <span>🆕</span>
      },
      isCompleted: false,
      tags: [
        { id: 'urgent', label: 'Urgent', color: '#ff0000' },
        { id: 'review', label: 'In Review' }
      ],
    },
    {
      id: '2',
      date: new Date(2021, 11, 5),
      title: 'Item 2',
      description: 'Description 2',
      attribute: 'Attribute 2',
      status: {
        text: 'Updated Record',
        style: { backgroundColor: '#cce5ff', color: '#004085', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px' }
      },
      isCompleted: true,
      tags: []
    },
  ];

  return (
    <div className="App">
      <Timeline
        items={items}
        groupBy="month"
      />
    </div>
  );
}

export default App;
