import React from 'react';
import './Timeline.css';

function Timeline({
  items = [],
  groupBy = 'month',
  onItemSelect,
  className = '',
  renderTag
}) {
  const [selectedItem, setSelectedItem] = React.useState(null);

  const groupedItems = React.useMemo(() => {
    const groups = new Map();
    items.forEach((item) => {
      const date = new Date(item.date);
      let groupKey, groupDate;

      if (groupBy === 'year') {
        groupKey = date.getFullYear().toString();
        groupDate = new Date(date.getFullYear(), 0, 1);
      } else {
        groupKey = date.toLocaleString('default', {
          month: 'long',
          year: 'numeric',
        });
        groupDate = new Date(date.getFullYear(), date.getMonth(), 1);
      }

      if (!groups.has(groupKey)) {
        groups.set(groupKey, { date: groupDate, items: [] });
      }
      groups.get(groupKey).items.push(item);
    });

    return Array.from(groups.entries())
      .map(([key, group]) => ({
        key,
        date: group.date,
        items: group.items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
      }))
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map((group) => ({
        key: group.key,
        items: group.items,
      }));
  }, [items, groupBy]);

  const toggleItemSelection = React.useCallback((item) => {
    const newSelectedItem = selectedItem?.id === item.id ? null : item;
    setSelectedItem(newSelectedItem);
    if (onItemSelect) onItemSelect(newSelectedItem);
  }, [onItemSelect, selectedItem]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  return (
    <div className={`timeline-container ${className}`} role="list">
      <div className="timeline-line"></div>
      {groupedItems.map((group) => (
        <section className="group-section" key={group.key}>
          <h3 className="group-header" aria-level="3">{group.key}</h3>
          {group.items.map((item) => {
            const isSelected = selectedItem?.id === item.id;

            return (
              <div
                className={`timeline-item ${isSelected ? 'selected' : ''}`}
                key={item.id}
                onClick={() => toggleItemSelection(item)}
                onKeyDown={(e) => e.key === 'Enter' && toggleItemSelection(item)}
                role="button"
                aria-pressed={isSelected}
                tabIndex={0}
              >
                <div className="timeline-date">{formatDate(item.date)}</div>
                <div
                  className={`timeline-marker ${
                    item.isCompleted ? 'completed' : ''
                  } ${isSelected ? 'selected' : ''}`}
                ></div>
                <div className="timeline-content">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  {isSelected && (
                    <>
                      <div className="timeline-metadata">
                        {item.attribute && <span className="attribute">{item.attribute}</span>}
                        {item.tags && item.tags.length > 0 && (
                          <div className="timeline-tags">
                            {item.tags.map((tag) =>
                              renderTag ? renderTag(tag) : (
                                <span
                                  key={tag.id}
                                  className={`tag ${tag.className || ''}`}
                                  style={{ backgroundColor: tag.color || 'initial', ...tag.style }}
                                >
                                  {tag.icon && <span className="tag-icon">{tag.icon}</span>}
                                  {tag.label}
                                </span>
                              )
                            )}
                          </div>
                        )}
                        <p>Completed: {item.isCompleted ? 'Yes' : 'No'}</p>
                      </div>
                    </>
                  )}
                </div>
                {item.status && (
                  <div
                    className={`timeline-status ${item.status.className || ''}`}
                    style={item.status.style}
                  >
                    {item.status.icon && <span className="status-icon">{item.status.icon}</span>}
                    {item.status.text}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      ))}
    </div>
  );
}

export default Timeline;
