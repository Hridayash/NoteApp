// import {useState, useEffect} from 'react';
import Navbar from './components/navbar';
import "./App.css"
import CreateForm from './components/creatnote';
import Note from './components/note';



function App() {
 
  // const [title, setTitle] = useState();
  // const [post, setPost] = useState();



 



  return (
   <div className='app'>
    <Navbar />
    <CreateForm />
    <Note />
   

    
   </div>
  );
}

export default App;
