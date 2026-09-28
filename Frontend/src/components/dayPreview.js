import React from 'react';

const DayPreview = ({ day, currentMonth, currentYear, listData = [] }) => {
  
  const tasks = listData || [];
  
  const filteredTasks = tasks.filter((item) => {
    const taskDate = new Date(item.dueDate.substring(0,10));
    return (
      day === taskDate.getDate() &&
      currentMonth === taskDate.getMonth() &&
      currentYear === taskDate.getFullYear()
    );
  });
  // sort based on task priority
  filteredTasks.sort((a,b) => a[2] - b[2]);
  
  const getPriorityClass = (priority) => {
    if (priority === 0) return 'priority-high';
    if (priority === 1) return 'priority-medium';
    return 'priority-low';
  };
  
  const getCompletedClass = (status) => {
    if (status === 1) return 'completed-task';
    
    return 'incomplete-task';
  };

  return (
    <div className="day-preview-container">
    {filteredTasks.length === 0 ? (
      <div className="no-tasks-message">No tasks for today</div>
    ) : (
      filteredTasks.map((item, index) => (
        <div 
          key={`task-${item._id || index}`} 
          className={`calendar-tasklist-item ${getCompletedClass(item.status)} ${getPriorityClass(item.priority)}`}
        >
          {item.description}
        </div>
      ))
    )}
  </div>
  );
};

export default DayPreview;
