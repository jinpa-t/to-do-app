import { Component } from "react";

class List extends Component {
  constructor() {
    super();
    this.state = {
      universalIDCounter: 4,
      toDoItems: [
        [0,  "Go to the park.",0, "09-22-2026", -1 , 0],
        [0,  "Mow the lawn.", 1,"09-15-2026", -1, 1],
        [1,  "Clean room.", 2,"09-05-2026", -1, 3],
        [1, "Trip hair.",  2,"08-03-2026", 0, 4],
      ]
      ,
      priority :["High", "Medium", "Low"]
    };
  }
   

  add = (item, toDoItemPriority, toDoItemRepeat ) => {
    this.setState((prevState) => {
      return { toDoItems: [...prevState.toDoItems, [0, item, toDoItemPriority, "09-22-2026", toDoItemRepeat, ++universalIDCounter]] };
    });
  };

  mark = (uuid) => {
  this.setState((prevState) => {
    // 1. Create a shallow copy of the outer array
    const newItems = [...prevState.toDoItems]; 
    
    // 2. Find the row index where the 5th column (index 4) matches the target uuid
    const targetIndex = newItems.findIndex(item => item && item[5] === uuid);

    // 3. Safety check: make sure the item was actually found
    if (targetIndex !== -1) {
      // 4. Create a copy of that specific inner row array
      const updatedItem = [...newItems[targetIndex]]; 
      
      // 5. Flip the status in the 1st column (index 0)
      updatedItem[0] = 1 - updatedItem[0]; 
      
      // 6. Place the updated row back into our outer array copy
      newItems[targetIndex] = updatedItem; 
    }

    // 7. Return the new state to trigger a re-render
    return { toDoItems: newItems };
  });
};


  remove = (ind, toDoItemStatus) => {
    this.setState((prevState) => ({
      toDoItems: prevState.toDoItems.filter((i, index) => index !== ind),
    }));
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
                  
                  document.querySelector("#priority").value,
                  document.querySelector("#repeat").value || 0
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
          {this.state.toDoItems.filter((item) => {
            return item && item[0] === 0;
          }).map((item, index) => (
            
            <div className="list-item" key={index}>
              <div className="item-actions">
                <input
                  name="check"
                  type="checkbox"
                  checked={item[0] ? "checked" : ""}
                  onChange={() => this.mark(item[5])}
                />
                <input
                  name="delete"
                  type="button"
                  onClick={() => this.remove(index)}
                  value="X"
                />
              </div>
              <div
                className={item[0] ? "selected" : ""}
                style={item[0] ? { textDecoration: "line-through" } : {}}
              >
                <div className="item-details">
                  <div className={`item-details-priority ${this.getPriorityClass(item[2])}` }>{this.state.priority[item[2]]}</div>
                  <div className="item-details-date">Due: {new Date().toLocaleDateString('en-US')}</div><br/>
                  <div className="item-details-repeat">Repeat: {this.getRepetitionType(item[4])}</div><br/>
                </div>
                <div className="item-details-description">{item[1]}</div>
              </div>
            </div>
            
          ))}
        </ul>
        <h2>Completed</h2>
        <ul>
          {this.state.toDoItems.filter((item) => {
            return item && item[0] === 1;
          }).map((item, index) => (
            <div key={index}>
            <div className="list-item">
              <input
                name="check2"
                type="checkbox"
                checked={item[0] ? "checked" : ""}
                onChange={() => this.mark(item[5])}
              />
              <input
                name="delete2"
                key={"completed" + index}
                type="button"
                onClick={() => this.remove(index)}
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
            </div>
          ))}
        </ul>
        </div>
        
      </div>
    );
  }
}

export default List;
