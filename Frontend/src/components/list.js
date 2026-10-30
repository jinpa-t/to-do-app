
import React, { useState, useEffect, useRef } from "react";
import Edit from "./edit";
import Share from "./share";

const List = () =>{
  const [inputValue, setInputValue] = useState("");
  const [todoData, setTodoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priority] = useState(["High", "Medium", "Low"]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedShareItem, setSelectedShareItem] = useState(null);
  const [allCategories, setAllCategories] = useState(null);
  const editWindow = useRef();
  const shareWindow = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3030/api/todos/', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error("Network error while fetching data.");
        }
        const result = await response.json();
        setTodoData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }

      try {
        const response = await fetch('http://localhost:3030/api/todos/categories/', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error("Network error while fetching data.");
        }
        const result = await response.json();
        setAllCategories(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchAllTodos = async () => {
    try {
      const response = await fetch('http://localhost:3030/api/todos/', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error("Network error while fetching data.");
      }
      const result = await response.json();
      setTodoData(result);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const openPreview = (item) => {
    if (editWindow.current) {
      editWindow.current.classList.remove('hidden');
      setSelectedItem(item);
    }
  };

  const closePreview = () => {
    if (editWindow.current) {
      editWindow.current.classList.add('hidden');
      fetchAllTodos();
    }
  };

  const openShareWindow = (item) => {
    if (shareWindow.current) {
      shareWindow.current.classList.remove('hidden');
      setSelectedShareItem(item);
    }
  };

  const closeShareWindow = () => {
    if (shareWindow.current) {
      shareWindow.current.classList.add('hidden');
      fetchAllTodos();
    }
  };

  /*
    send post request to the backend for saving.
    request body:
    {
      status: req.body.status,
      description: req.body.description,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
      repetition: req.body.repetition
    }
  */
  const add = (toDoListDescription, toDoListPriority, toDoListRepeat, toDoListDueDate) => {
    fetch('http://localhost:3030/api/todos/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 0,
        description: toDoListDescription,
        priority: toDoListPriority,
        dueDate: toDoListDueDate,
        repetition: toDoListRepeat,
        category: 'general'
      })
    })
      .then((response) => response.json())
      .then((data) => {
        fetchAllTodos();
        console.log("ToDo List saved successfully:", data);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };


  const mark = (uuid, item) => {
    let itemCopy = item;
    itemCopy.status = 1 - itemCopy.status;

    fetch(`http://localhost:3030/api/todos/${uuid}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        itemCopy
      })
    })
      .then((response) => response.json())
      .then((data) => {
        fetchAllTodos();
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  const remove = (uuid) => {
    fetch(`http://localhost:3030/api/todos/${uuid}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: []
    })
      .then((response) => response.json())
      .then((data) => {
        fetchAllTodos();
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  const changeCategory = (e, uuid, item) => {
    let id = null;
    allCategories.map((categ) => {
      if (categ.name === e.target.value) {
        id = categ._id;
      }
    });
    let itemCopy = item;
    itemCopy.category = id;

    fetch(`http://localhost:3030/api/todos/${uuid}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        itemCopy
      })
    })
      .then((response) => response.json())
      .then((data) => {
        fetchAllTodos();
      })
      .catch((error) => {
        console.error("Login error:", error);
      });

    console.log("Selected Item:", e.target.value);
  };

  const getPriorityClass = (priority) => {
    if (priority === 0) return 'priority-high';
    if (priority === 1) return 'priority-medium';
    return 'priority-low';
  };

  const getRepetitionType = (repetition) => {
    if (repetition === 0) return 'Daily';
    if (repetition === 1) return 'Weekly';
    if (repetition === 2) return 'Monthly';
    return 'Never';
  };

  return (
    <div>
      <div className="todo-container">
      <div className="input-btn-holder">
        <input
          id="text"
          name="new-list"
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="enter your text"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              add(
              inputValue,
              document.querySelector("#priority").value || 2,
              (document.querySelector("#repeat").value || -1),
              (document.querySelector("#dueDate").value || 0),
              );
              setInputValue("");
            }
          }}
        />
        <br />
        <label htmlFor="priority">Priority:</label>
        <select name="priority" id="priority">
          <option value="0">High</option>
          <option value="1">Medium</option>
          <option value="2" defaultChecked>Normal</option>
        </select>
        <label htmlFor="repeat">Repeat:</label>
        <select name="repeat" id="repeat">
          <option value="-1" defaultChecked>Never</option>
          <option value="0">Daily</option>
          <option value="1">Weelky</option>
          <option value="2">Monthly</option>
        </select>
        <br />
        <label htmlFor="dueDate">Due Date:</label>
        <input name="dueDate" id="dueDate" type="date"></input>
        <button
          id="add-btn"
          onClick={() => {
            add(
              inputValue,
              document.querySelector("#priority").value || 2,
              (document.querySelector("#repeat").value || -1),
              (document.querySelector("#dueDate").value || 0),
            );
            setInputValue("");
          }}
        >
          Add
        </button>
      </div>

      <h2>Remaining Tasks</h2>
      <ul>
        {todoData.filter((item) => {
          return item && item.status === 0;
        }).map((item) => (
          
          <div className="list-item" key={item._id} style={{backgroundColor: item.category.color}}>
            <div className="item-actions">
              <input
                name="check"
                type="checkbox"
                checked={item.status ? "checked" : ""}
                onChange={() => mark(item._id, item )}
              />
              <input
                name="edit"
                type="button"
                onClick={() => openPreview(item)}
                value="Edit"
              />
              <input
                name="delete"
                type="button"
                onClick={() => remove(item._id)}
                value="X"
              />
            </div>
            <div
              className={item.status ? "selected" : ""}
              style={item.status ? { textDecoration: "line-through" } : {}}
            >
              <div className="item-details">
                <div className={`item-details-priority ${getPriorityClass(item.priority)}` }>{priority.priority}</div>
                <div className="item-details-date">Due: {item.dueDate.substring(0,10)|| ''}</div><br/>
                <div className="item-details-repeat">Repeat: {getRepetitionType(item.repetition)}</div><br/>
                <label htmlFor="category">Category</label>
                <select className="item-details-category"  name="category" value={item.category?.name || ""}  onChange={(e) => changeCategory(e, item._id, item)}>{allCategories?.map((categ, index) => (
                  
                  <option value={categ.name} key={item._id + categ.name} style={{backgroundColor: categ.color}}>{categ.name}</option>
      
                ))}</select><br/>
              </div>
              <div className="item-details-description">{item.description}</div>
              <div>Shared with : {item.category.shared_with?"Yes":"No"}</div>
              <button onClick={() => openShareWindow(item)}>Share</button>
            </div>
          </div>
          
        ))}
      </ul>

      <h2>Completed</h2>
      <ul>
        {todoData.filter((item) => {
          return item && item.status === 1;
        }).map((item, index) => (
          <div key={index}>
            <div className="list-item">
              <input
                name="check2"
                type="checkbox"
                checked={item.status ? "checked" : ""}
                onChange={() => mark(item._id, item)}
              />
              <input
                name="delete2"
                type="button"
                onClick={() => remove(item._id)}
                value="X"
              />
              <div
                className={item.status ? "selected" : ""}
                style={item.status ? { textDecoration: "line-through" } : {}}
              >
                <span>{item.dueDate.substring(0,10) || ''}</span><br/>
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </ul>
      </div>  
      <div className='calendar-day-preview hidden' ref={editWindow}>
          <button onClick={closePreview}>X</button>
          <Edit selectedItem={selectedItem} key={selectedItem?._id}/>
      </div>
      <div className='share-item-preview hidden' ref={shareWindow}>
          <button onClick={closeShareWindow}>X</button>
          <Share selectedItem={selectedShareItem} key={selectedShareItem?._id}/>
      </div>
    </div>
  );
  
}

export default List;
