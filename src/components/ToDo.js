import React from 'react'

import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"


const ToDo = ({text, updateMode, deleteToDo}) => {
    return (
        <div className="todo"
        variant="outlined"
        color="secondary"
        elevation={20}>
            <div className="text">{text}</div>
            <div className="icons">
                <BiEdit className='icon' onClick={updateMode} />
                <AiFillDelete className='icon' onClick={deleteToDo} />
            </div>
        </div>
    )
}

export default ToDo