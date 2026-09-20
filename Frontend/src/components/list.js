import { Component } from "react";

class List extends Component {
  constructor() {
    super();
    this.state = {
      toDoItems: [
        [0,  "Go to the park.",0, "09-22-2026"],
        [0,  "Mow the lawn.", 1,"09-15-2026"],
      ],
      completedToDoItems: [
        [1,  "Clean room.", 2,"09-05-2026"],
        [1, "Trip hair.",  2,"08-03-2026"],
      ],
      priority :["High", "Medium", "Low"]
    };
  }
   getPriorityClass = (priority) => {
     if (priority === 0) return 'priority-high';
     if (priority === 1) return 'priority-medium';
     return 'priority-low';
  };

  add = (item, toDoItemStatus, toDoItemPriority, toDoItemRepeat ) => {
    if (toDoItemStatus == "incomplete") {
      this.setState((prevState) => {
        return { toDoItems: [...prevState.toDoItems, [0, item, toDoItemPriority, "09-22-2026", toDoItemRepeat]] };
      });
    } else {
      this.setState((prevState) => {
        return {
          completedToDoItems: [...prevState.completedToDoItems, [1, item,  toDoItemPriority, "09-22-2026", toDoItemRepeat]],
        };
      });
    }
  };

  mark = (ind, toDoItemStatus) => {
    this.setState((prevState) => {
      if (toDoItemStatus == "incomplete") {
        const newItems = [...prevState.toDoItems]; // Create a new outer array
        const updatedItem = [...newItems[ind]]; // Create a new inner array for the item being modified
        updatedItem[0] = 1 - updatedItem[0]; // Modify the new inner array
        newItems[ind] = updatedItem; // Assign the new inner array back to the new outer array
        console.log(newItems);

        // move to completed list.
        this.add(newItems[ind][1]);

        // remove from to-do list
        this.remove(ind, "incomplete");
        //return { toDoItems: newItems };
      } else {
        const newItems = [...prevState.completedToDoItems]; // Create a new outer array
        const updatedItem = [...newItems[ind]]; // Create a new inner array for the item being modified
        updatedItem[0] = 1 - updatedItem[0]; // Modify the new inner array
        newItems[ind] = updatedItem; // Assign the new inner array back to the new outer array
        console.log(newItems);
        
        this.add(newItems[ind][1], "incomplete");
        // add to to-do list
        this.remove(ind, "complete");

        return { completedToDoItems: newItems };
      }
    });
  };

  remove = (ind, toDoItemStatus) => {
    if (toDoItemStatus == "incomplete") {
      this.setState((prevState) => ({
        toDoItems: prevState.toDoItems.filter((i, index) => index !== ind),
      }));
    } else {
      this.setState((prevState) => ({
        completedToDoItems: prevState.completedToDoItems.filter(
          (i, index) => index !== ind
        ),
      }))
    };
    
    
  };
  getPriorityClass = (priority) => {
   if (priority === 0) return 'priority-high';
   if (priority === 1) return 'priority-medium';
   return 'priority-low';
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
                  "incomplete",
                  document.querySelector("#priority").value,
                  document.querySelector("#repeat").value
                );
                document.querySelector("#text").value = "";
              }
            }}
          />
          <select name="priority" id="priority">
            <option value="0">High</option>
            <option value="1">Medium</option>
            <option value="2">Normal</option>
          </select>
          <select name="repeat" id="repeat">
            <option value="0">Daily</option>
            <option value="1">Weelky</option>
            <option value="2">Monthly</option>
          </select>
          <button
            id="add-btn"
            onClick={() => {
              this.add(document.querySelector("#text").value, "incomplete", );
              document.querySelector("#text").value = "";
            }}
          >
            Add
          </button>
          
        </div>
        {/* List Layout */}
        <ul>
          {this.state.toDoItems.map((item, index) => (
            
            <div className="list-item" key={index}>
              <div className="item-actions">
                <input
                  name="check"
                  type="checkbox"
                  checked={item[0] ? "checked" : ""}
                  onChange={() => this.mark(index, "incomplete")}
                />
                <input
                  name="delete"
                  type="button"
                  onClick={() => this.remove(index, "incomplete")}
                  value="X"
                />
              </div>
              <div
                className={item[0] ? "selected" : ""}
                style={item[0] ? { textDecoration: "line-through" } : {}}
              >
                <div className="item-details">
                  <span className={`item-details-priority ${this.getPriorityClass(item[2])}` }>{this.state.priority[item[2]]}</span>
                  <span className="item-details-date">{new Date().toLocaleDateString('en-US')}</span><br/>
                </div>
                <div className="item-details-description">{item[1]}</div>
              </div>
            </div>
            
          ))}
        </ul>
        <h2>Completed</h2>
        <ul>
          {this.state.completedToDoItems.map((item, index) => (
            <>
            <div className="list-item">
              <input
                name="check2"
                type="checkbox"
                checked={item[0] ? "checked" : ""}
                onChange={() => this.mark(index, "complete")}
              />
              <input
                name="delete2"
                key={"completed" + index}
                type="button"
                onClick={() => this.remove(index, "complete")}
                value="X"
              />
              <div
                className={item[0] ? "selected" : ""}
                style={item[0] ? { textDecoration: "line-through" } : {}}
              >
                <span>{new Date().toLocaleDateString('en-CA')}</span><br/>
                {item[1]}
              </div>
            </div>
            </>
          ))}
        </ul>
        </div>
        
      </div>
    );
  }
}

export default List;
