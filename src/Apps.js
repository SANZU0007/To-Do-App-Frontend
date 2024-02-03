// Import necessary Material-UI components and styles
import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";

import "./apps.css";
import { AiFillLock } from "react-icons/ai";

function Apps() {
  const    naviagate= useNavigate()
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };



  const change = ()=>{
    naviagate("/changepass")
  }
  return (
    <>
 
    <div className="Apps-data">

      <Grid container className="container-1" spacing={3}>
        {/* Grid item for the heading */}
        <Grid item xs={12}>
       
          <div className="navbar">
          <h1 className="header-title">ToDo App</h1>
            
            <AiFillLock   onClick={change} className="icon-btn" />
            
            
            </div>
        </Grid>

        {/* Grid item for the input and button */}
        <Grid item xs={12} sm={6}>
          <div className="top">
            <TextField
              type="text"
              label="write your list"
              color="secondary"
              value={text}
              onChange={(e) => setText(e.target.value)}
              focused
              fullWidth
            />

            <Button
            id="add-1"
              variant="contained"
              onClick={isUpdating
                ? () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
                : () => addToDo(text, setText, setToDo)}>
              {isUpdating ? "Update" : "Add"}
            </Button>
         
          </div>
        </Grid>

        {/* Grid item for the list */}
        <Grid item xs={12}>
          <div className="list">
            {toDo.map((item) => <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => deleteToDo(item._id, setToDo)} />)}
          </div>
        </Grid>
      </Grid>

    </div></>
  );
}

export default Apps;
