import "../styles/page.css";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

import {useState, useEffect} from 'react';
import {collection, query, orderBy, onSnapshot, getDocs, where } from "firebase/firestore";
import {auth, db, logout } from '../firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";


function Page() {
  
  const [openAddModal, setOpenAddModal] = useState(false);
  const [todos, setTodos] = useState([])
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
    

  /* function to get all tasks from firestore in realtime */
  useEffect(() => {

    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();

    const q = query(collection(db, 'todos'), orderBy('created', 'desc'));
    onSnapshot(q, (querySnapshot) => { 
      setTodos(querySnapshot.docs.map(doc => ({ 
        id: doc.id, 
        data: doc.data() 
      }))) 
    }) 
  },[user, loading]);
  
  return (
    <div className="title">
      <header>Todo App</header>
      <div className="title__container">
        <button onClick={() => setOpenAddModal(true)}>New Task +</button>
        <div className="title">
        {todos.map((todo) => ( 
	        <TodoList 
	          id={todo.id} 
	          key={todo.id} 
	          completed={todo.data.completed} 
	          title={todo.data.title} 
	          description={todo.data.description} 
	        /> 
        ))} 
        </div>
      </div>
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
         <div>{name}</div>
         <div>{user?.email}</div>
         <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>
       </div>

      {openAddModal && (
        <AddTodo onClose={() => setOpenAddModal(false)} open={openAddModal} />
      )}
    </div>
</div>
  );
}

export default Page;
