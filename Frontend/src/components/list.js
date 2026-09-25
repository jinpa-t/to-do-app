import { Component } from "react";

class List extends Component {
  constructor() {
    super();
    this.state = {
      todoData : [],
      loading: true,
      error: null,
      priority :["High", "Medium", "Low"],
    };
  }

  async componentDidMount(){
    try {
      const response = await fetch('http://localhost:3030/api/todos/', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
      if(!response.ok) {
        throw new Error("Network error while fetching data.");
      }
      const result = await response.json();
      this.setState ({
        todoData: result,
        loading: false
      });
      //console.log("DATA: ", todoData);
      
    } catch (err) {
      this.setState({ error: err.message, loading: false });
    }
  }

  fetchAllTodos = async() =>{
    try {
      const response = await fetch('http://localhost:3030/api/todos/', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
      if(!response.ok) {
        throw new Error("Network error while fetching data.");
      }
      const result =  await response.json();
      this.setState ({
        todoData: result,
        loading: false
      });
      //console.log("DATA: ", todoData);
      
    } catch (err) {
      this.setState({ error: err.message, loading: false });
      console.log(this.state.error);
    }
  }

  add = (toDoListDescription, toDoListPriority, toDoListRepeat, toDoListDueDate ) => {
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
    fetch('http://localhost:3030/api/todos/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json' // 1. Tells the server you are sending JSON
      },
      body: JSON.stringify({
        status: 0,
        description: toDoListDescription,
        priority: toDoListPriority,
        dueDate: toDoListDueDate,
        repetition: toDoListRepeat
      })
      })
      .then((response) => response.json())
      .then((data) => {
        this.fetchAllTodos();
        console.log("ToDo List saved successfully:", data);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  mark = (uuid, item) => {
    /*
      PATCH: update the status of the list.
    */
   let itemCopy = item;
   itemCopy.status = 1 - itemCopy.status;
   
  fetch(`http://localhost:3030/api/todos/${uuid}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json' // 1. Tells the server you are sending JSON
      },
      body: JSON.stringify({
        itemCopy
      })
      })
      .then((response) => response.json())
      .then((data) => {
        // console.log("ToDo List saved successfully:", data);
        this.fetchAllTodos(); 
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  remove = (uuid) => {
    /*
      SEND ID to delete the list.
    */
    fetch(`http://localhost:3030/api/todos/${uuid}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json' // 1. Tells the server you are sending JSON
      },
      body: []
      })
      .then((response) => response.json())
      .then((data) => {
        this.setState({data : data});
        this.fetchAllTodos(); 
        // console.log("ToDo List deleted successfully:", data);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  getPriorityClass = (priority) => {
   if (priority === 0) return 'priority-high';
   if (priority === 1) return 'priority-medium';
   return 'priority-low';
  };
  
  getRepetitionType = (repetition) => {
   if (repetition === 0) return 'Daily';
   if (repetition === 1) return 'Weekly';
   if (repetition === 2) return 'Monthy'
   return 'Never';
  };

  render() {
    return (
      <div>
        <div className="todo-container">
        <div className="input-btn-holder">
          <input
            id="text"
            name="new-list"
            type="text"
            placeholder="enter your text"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                this.add(
                document.querySelector("#text").value,
                document.querySelector("#priority").value || 2,
                (document.querySelector("#repeat").value || -1),
                (document.querySelector("#dueDate").value || 0),
                );
                document.querySelector("#text").value = "";
              }
            }}
          />
          <select name="priority" id="priority">
            <option value="0">High</option>
            <option value="1">Medium</option>
            <option value="2" defaultChecked>Normal</option>
          </select>
          <select name="repeat" id="repeat">
            <option value="-1" defaultChecked>Never</option>
            <option value="0">Daily</option>
            <option value="1">Weelky</option>
            <option value="2">Monthly</option>
          </select>
          <input name="dueDate" id="dueDate" type="date"></input>
          <button
            id="add-btn"
            onClick={() => {
              this.add(
                document.querySelector("#text").value,
                document.querySelector("#priority").value || 2,
                (document.querySelector("#repeat").value || -1),
                (document.querySelector("#dueDate").value || 0),
              );
              document.querySelector("#text").value = "";
            }}
          >
            Add
          </button>
        </div>

        <h2>Remaining Tasks</h2>
        <ul>
          {this.state.todoData.filter((item) => {
            return item && item.status === 0;
          }).map((item) => (
            
            <div className="list-item" key={item._id}>
              <div className="item-actions">
                <input
                  name="check"
                  type="checkbox"
                  checked={item.status ? "checked" : ""}
                  onChange={() => this.mark(item._id, item )}
                />
                <input
                  name="delete"
                  type="button"
                  onClick={() => this.remove(item._id)}
                  value="X"
                />
              </div>
              <div
                className={item.status ? "selected" : ""}
                style={item.status ? { textDecoration: "line-through" } : {}}
              >
                <div className="item-details">
                  <div className={`item-details-priority ${this.getPriorityClass(item.priority)}` }>{this.state.priority.priority}</div>
                  <div className="item-details-date">Due: {item.dueDate.substring(0,10)|| ''}</div><br/>
                  <div className="item-details-repeat">Repeat: {this.getRepetitionType(item.repetition)}</div><br/>
                </div>
                <div className="item-details-description">{item.description}</div>
              </div>
            </div>
            
          ))}
        </ul>

        <h2>Completed</h2>
        <ul>
          {this.state.todoData.filter((item) => {
            return item && item.status === 1;
          }).map((item, index) => (
            <div key={index}>
              <div className="list-item">
                <input
                  name="check2"
                  type="checkbox"
                  checked={item.status ? "checked" : ""}
                  onChange={() => this.mark(item._id, item)}
                />
                <input
                  name="delete2"
                  type="button"
                  onClick={() => this.remove(item._id)}
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
      </div>
    );
  }
}

export default List;
