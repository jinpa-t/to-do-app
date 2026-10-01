import React , {useState} from 'react';

const Edit = ({ selectItem }) => {
  
  const [_selectItem, setSelectItem] = useState(selectItem);

  const getPriorityClass = (priority) => {
    if (priority === 0) return 'priority-high';
    if (priority === 1) return 'priority-medium';
    return 'priority-low';
  };
  
  const getCompletedClass = (status) => {
    if (status === 1) return 'completed-task';
    
    return 'incomplete-task';
  };

  const handleDescriptionChange = (e) => {
    setSelectItem(prevItem => ({
    ...prevItem,
    description: e.target.value
  }));
  };
  

  const add = (toDoListDescription, toDoListPriority, toDoListRepeat, toDoListDueDate ) => {
    /*
      send PATCH request to the backend for saving.
      request body:
      {
        description: req.body.description,
        priority: req.body.priority,
        dueDate: req.body.dueDate,
        repetition: req.body.repetition
      }
    */
   
    fetch(`http://localhost:3030/api/todos/${selectItem._id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json' // 1. Tells the server you are sending JSON
      },
      body: JSON.stringify({
       
        description: _selectItem.description,
        priority: _selectItem.priority,
        dueDate: _selectItem.dueDate,
        repetition: _selectItem.repetition
      })
      })
      .then((response) => response.json())
      .then((data) => {
        
        console.log("ToDo List saved successfully:", data);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  
  return (
    <div className="day-preview-container">
        <div className='edit-form-container'>
          <h3>Editing </h3>
          <input
            id="text"
            name="new-list"
            type="text"
            value={selectItem?.description || ''}
            onChange={handleDescriptionChange}
          />
          <select name="priority" id="priority" value={_selectItem?.priority}>
            <option value="0">High</option>
            <option value="1">Medium</option>
            <option value="2" defaultChecked>Normal</option>
          </select>
          <select name="repeat" id="repeat" value={_selectItem?.repetition}>
            <option value="-1" defaultChecked>Never</option>
            <option value="0">Daily</option>
            <option value="1">Weelky</option>
            <option value="2">Monthly</option>
          </select>
          <input name="dueDate" id="dueDate" type="date" value={selectItem?.dueDate.substring(0,10)}></input>
          <button
            id="add-btn"
            onClick={() => {
              add(
                document.querySelector("#text").value,
                document.querySelector("#priority").value ,
                (document.querySelector("#repeat").value ),
                (document.querySelector("#dueDate").value ),
              );
              document.querySelector("#text").value = "";
            }}
          >
            Save
          </button>
          
        </div>
      
  </div>
  );
};

export default Edit;
