import React from 'react';

const DayPreview = ({ day, currentMonth, currentYear, listData = [] }) => {
  
  const tasks = listData[0] || [];
  
  const filteredTasks = tasks.filter((item) => {
    const taskDate = new Date(item[3]);
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
    if (status === 0) return 'completed-task';
    
    return 'incomplete-task';
  };

  return (
    <div className="day-preview-container">
    {filteredTasks.length === 0 ? (
      <div className="no-tasks-message">No tasks for today</div>
    ) : (
      filteredTasks.map((item, index) => (
        <div 
          key={`task-${item[0] || index}`} 
          className={`calendar-tasklist-item ${getCompletedClass(item[0])} ${getPriorityClass(item[2])}`}
        >
          {item[1]}
        </div>
      ))
    )}
  </div>
  );
};

export default DayPreview;
