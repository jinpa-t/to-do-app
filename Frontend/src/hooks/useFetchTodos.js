import { useState, useEffect } from 'react';

// currently this is not being used.

function useFetchTodos() {
  const [todoData, setTodoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:3030/api/posts/', {
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
        console.log(result);
        
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTodos();
  }, []); 

  // Return the data and status object directly instead of rendering JSX
  return { todoData, loading, error };
}

export default useFetchTodos;
