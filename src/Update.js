import React, { useState, useEffect } from 'react';
import styles from './Update.css';

export default function Update() {

  const [apidata, setApiData] = useState([]);
  const [loading, setLoading] = useState();
  const [modify, setModify] = useState(false);

  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [id, setId] = useState(null);

  const baseURL = "https://jsonplaceholder.typicode.com/posts";

  const tableRows = apidata.map((user) => {
    return (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.userId}</td>
        <td>{user.title}</td>
        <td>{user.body}</td>
        <td><button onClick={() => setData(user)} className='update-btn'>Update</button></td>
        <td><button onClick={() => handleRemoveData(user.id)} className='remove-btn'>Remove</button></td>
      </tr>
    )
  }
  )

  useEffect(function () {
    setLoading(true);
    console.log("executing the use effect");
    try {
      fetch(baseURL)
        .then((res) => res.json())
        .then((data) => setApiData(data));
    }
    finally {
      setLoading(false);
    };
  }, []);

  const setData = (data) => {
    setModify(true);
    let { userId, id, title, body } = data;
    localStorage.setItem('UserID', userId);
    localStorage.setItem('ID', id);
    localStorage.setItem('Title', title);
    localStorage.setItem('Body', body);
  }

  useEffect(() => {
    setId(localStorage.getItem('ID'));
    setUserId(localStorage.getItem('UserID'));
    setTitle(localStorage.getItem('Title'));
    setBody(localStorage.getItem('Body'));
  }, [modify]);


  const updateApiData = (e) => {
    e.preventDefault();
    fetch(`${baseURL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ userId, title, body }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    }).then((response) => response.json())
      .then((value) => setApiData(apidata.map((user) => user.id == id ? user = value : user)))
    setModify(false);
    setTimeout(() => alert('data is updated successfully'), 2000)
  }

  const deleteData = (id) => {
    fetch(`${baseURL} / ${id} `, {
      method: 'DELETE',
    }).then((response) => response.json())
      .then((users) => setApiData(apidata.filter((user) => user.id !== id)))
    setTimeout(() => {
      alert("data is removed successfully");
    }, 2000)
  }

  const handleRemoveData = (id) => {
    //Todo : need to create the nice alert warning while removing the user
    modify ? alert("please close the update form") : deleteData(id)

  };

  const handleClose = (e) => {
    e.preventDefault();
    setModify(false);
  }


  return (
    <center>
      {modify ? (<form className="formDisplay"  >
        <div style={{ display: 'flex', flexDirection: "row-reverse" }}>
          <button className='close-btn' onClick={handleClose} title='close'>X</button>
        </div>
        <label >UserID</label>
        <input type="number" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <br />
        <br />
        <label >Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />
        <br />
        <label >Body</label>
        <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
        <br />
        <br />
        <button type='submit' onClick={updateApiData} >Update</button>
      </form>) : <h3>Form will appear , once update button is clicked!</h3>
      }
      <table>
        <thead>
          <tr>
            <td>S.No</td>
            <td>UserID</td>
            <td>Title</td>
            <td>Body</td>
            <td>Update</td>
            <td>Remove</td>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </center >
  )
}
