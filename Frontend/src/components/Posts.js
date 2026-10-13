import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const Login = () => {
    const [data, setData] = useState(null);

    const getdata = () => {
        return data;
    };

    const posts = () => {
        fetch("http://localhost:3030/api/posts/", {
            method: 'GET',
            credentials: 'include'
        })
        .then((response) => response.json())
        .then((data) => {
            setData(data);
            console.log("Posts retrieved successfully:", data);
        })
        .catch((error) => {
            console.error("Login error:", error);
        });
    };

    useEffect(() => {
        posts();
    }, []);

    return (
        <div className="App">
            <div>
                <button
                    onClick={posts}
                    type="submit"
                    className="btn btn-primary"
                >Get Posts</button>
                <div>
                    <h1>Posts</h1>
                    <div>{data && JSON.stringify(data, null, 2)}</div>
                </div>
            </div>
        </div>
    );
};

export default Login;
