import React , {useState} from 'react';

const Share = ({ selectedItem }) => {
  
  const [email, setEmail] = useState("");
  const [successMsg, setScuccessMsg] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(prevItem => ({
    ...prevItem,
    priority: e.target.value
  }));
  };

  const add = () => {
    /*
      send POST request to the backend for sending link to the shared email.
      request body:
      {
        email: email
      }
    */
   
    fetch(`http://localhost:3030/api/todos/share/${selectedItem._id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json' // 1. Tells the server you are sending JSON
      },
      body: JSON.stringify({
        email: email
      })
      })
      .then((response) => response.json())
      .then((data) => {
        setScuccessMsg(true);
        console.log("ToDo List shared successfully:", data);
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <div className="day-preview-container">
        <div className='edit-form-container'>
          <h3>Shareing </h3>
          <input
            id="text"
            name="new-list"
            type="email" 
            value={email || ''}
            onChange={handleEmailChange}
          />
           <button
            id="add-btn"
            onClick={() => {
              add();
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

export default Share;
