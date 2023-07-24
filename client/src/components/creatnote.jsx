// import { useState } from "react";
// import Axios from 'axios';


// function CreateForm(){
//     const[noteList, setNotelist] = useState([]);

//     const [title, setTitle] = useState();
//     const [post, setPost] = useState();


//     const creatPost = ()=>{
//         Axios.post("http://localhost:3001/createpost", {
//           title,
//           post
//         }).then((response)=>{
//           setNotelist([ {
//            title,
//            post
//           }, ...noteList])
          
//         })
//       }
  
//     return(
// <div>
// <form>
//     <input
//       name="title"
//       onChange={(event)=>setTitle(event.target.value)}
      
//       placeholder="Title"
//     />
//     <textarea
//       name="content"
//       onChange={(event)=>setPost(event.target.value)}
      
//       placeholder="Take a note..."
//       rows="3"
//     />
//     <button onClick={creatPost}>Add</button>
//   </form>



// </div>);
// }
// export default CreateForm;

import { useState } from "react";
import Axios from 'axios';

function CreateForm() {
  const [noteList, setNotelist] = useState([]);

  const [title, setTitle] = useState();
  const [post, setPost] = useState();

  const creatPost = () => {
    Axios.post("http://localhost:3001/createpost", {
      title,
      post
    }).then((response) => {
      const newNote = {
        title,
        post,
        // Assuming the server returns a unique ID for the newly created post
      };
      setNotelist([newNote, ...noteList]);
    });
  };

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={(event) => setPost(event.target.value)}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={creatPost}>Add</button>
      </form>
    </div>
  );
}

export default CreateForm;
