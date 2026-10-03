import React , {useState} from 'react';

const Edit = ({ selectedItem }) => {
  
  const [_selectedItem, setSelectItem] = useState(selectedItem);
  const [successMsg, setScuccessMsg] = useState(false);

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

  const handleDateChange = (e) => {
    setSelectItem(prevItem => ({
    ...prevItem,
    dueDate: e.target.value
  }));
  };

  const handlePriorityChange = (e) => {
    setSelectItem(prevItem => ({
    ...prevItem,
    priority: e.target.value
  }));
  };

  const handleRepetitionChange = (e) => {
    setSelectItem(prevItem => ({
    ...prevItem,
    repetition: e.target.value
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
   
    fetch(`http://localhost:3030/api/todos/${selectedItem._id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json' // 1. Tells the server you are sending JSON
      },
      body: JSON.stringify({
       
        description: _selectedItem.description,
        priority: _selectedItem.priority,
        dueDate: _selectedItem.dueDate,
        repetition: _selectedItem.repetition
      })
      })
      .then((response) => response.json())
      .then((data) => {
        setScuccessMsg(true);
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
            value={_selectedItem?.description || ''}
            onChange={handleDescriptionChange}
          />
          <select name="priority" id="priority" value={_selectedItem?.priority} onChange={handlePriorityChange}>
            <option value="0">High</option>
            <option value="1">Medium</option>
            <option value="2" defaultChecked>Normal</option>
          </select>
          <select name="repeat" id="repeat" value={_selectedItem?.repetition} onChange={handleRepetitionChange}>
            <option value="-1" defaultChecked>Never</option>
            <option value="0">Daily</option>
            <option value="1">Weelky</option>
            <option value="2">Monthly</option>
          </select>
          <input name="dueDate" id="dueDate" type="date" value={_selectedItem?.dueDate.substring(0,10)} onChange={handleDateChange}></input>
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
          {successMsg && <div className='priority-normal'>Saved successfully</div>

          }
          
        </div>
      
  </div>
  );
};

export default Edit;
