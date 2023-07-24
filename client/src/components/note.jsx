import Axios from 'axios';
import { useState, useEffect } from 'react';
import  '../App.css';

function Note() {
  const [noteList, setNoteList] = useState([]);

  const deleteNote = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)

      window.location.reload();
  };
  const updateFriend = (id)=>{
    const newTitle =prompt("Enter new Title");
    const newPost = prompt("Enter new Post");
    
    Axios.put("http://localhost:3001/update/", {title : newTitle, post : newPost, id:id})

    window.location.reload();

  }

  useEffect(() => {
    Axios.get("http://localhost:3001/getpost/")
      .then((response) => {
        setNoteList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='users'>
      {noteList.map((note, key) => {
        return (
          <div className='note' key={key}>
            <h1>{note.title}</h1>
            <p>{note.post}</p>
            <div className='buttons'><button onClick={()=>updateFriend(note._id)}>Edit</button>
            <button onClick={() => deleteNote(note._id)}>Delete</button></div>
            
          </div>
         
      
        );
      })}
    </div>
  );
}

export default Note;
