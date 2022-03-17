import React, { useCallback, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import './MainPage.scss'

const Mainpage = () => {

  const {userId} = useContext(AuthContext)
  const [todos, setTodos] = useState([])
  const [edit, setEdit] = useState(null)
  const [text, setText] = useState('')
  const [editText, setEditText] = useState('')
  

    const getTodo = useCallback(async () => {
      try {
          await axios.get('https://test-todo-application.herokuapp.com/api/todo', {
              headers: {
                  'Content-Type': 'application/json'
              },
              params: {userId}
          })
          .then((response) => setTodos(response.data))
      } catch (error) {
          console.log(error);
      }
  }, [userId])


  useEffect(() => {
      getTodo()   
  }, [getTodo])


  const createTodo = useCallback(async () => {
      if(!text) return null    
          try {
              await axios.post('https://test-todo-application.herokuapp.com/api/todo/add', {text, userId}, {
                  headers: {
                      'Content-Type': 'application/json'
                  }
              })
              .then((response) => {
                  setTodos([...todos], response.data)
                  setText('')
                  getTodo()
              })
          } catch (error) {
              console.log(error);
          }
      }, [text, userId, todos, getTodo])


    const removeTodo = useCallback(async (id) => {
        try {
            await axios.delete(`https://test-todo-application.herokuapp.com/api/todo/delete/${id}`, {id}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => getTodo())
        } catch (error) {
            console.log(error);
        }
    }, [getTodo])


    const completedTodo = useCallback(async (id) => {
        try {
            await axios.put(`https://test-todo-application.herokuapp.com/api/todo/complete/${id}`, {id}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                setTodos([...todos], response.data)
                getTodo()
            })
        } catch (error) {
            console.log(error);
        }
    }, [getTodo, todos])


    const importantTodo = useCallback(async (id) => {
        try {
            await axios.put(`https://test-todo-application.herokuapp.com/api/todo/important/${id}`, {id}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                setTodos([...todos], response.data)
                getTodo()
            })
        } catch (error) {
            console.log(error);
        }
    }, [getTodo, todos])

    const sendEditTodo = useCallback(async (id, text) => {
      try {
        await axios.put(`https://test-todo-application.herokuapp.com/api/todo/update/${id}`, {id, text}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            setTodos([...todos], response.data)
            getTodo()
        })
    } catch (error) {
        console.log(error);
      }
    }, [getTodo, todos])


    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleEditChange = (e) => {
      setEditText(e.target.value)
  }


    const editTodo = (id, editText) => {
        setEdit(id)
        setEditText(editText)
    }

    const saveEditTodo = async (id) => {
      const text = editText
      if(!text) return null 
      let newTodo = [...todos].map(todo => {
        if(todo._id === id) {
          todo.text = text
        } 
        return todo   
      })
      setTodos(newTodo)
      setEdit(null)
      sendEditTodo(id, text)
  }


return (
  <div className='container'>
  <div className="main-page">
      <h4>Add Task</h4>
      <form className="form form login" onSubmit={e => e.preventDefault()}>
          <div className="row">
              <label>Task:</label>
                  <div className="input-field col s12">
                      <input
                          type="text"
                          id="text"
                          name="input"
                          className="validate"
                          value={text}
                          onChange={handleChange}
                      />
                  </div>
          </div>
          <div className="row">
              <button 
                  className="waves-effect waves-light btn blue"
                  onClick={createTodo}
              >
                  Add
              </button>
          </div>
      </form>
      <div>
  <h3>Tasks:</h3>
  <div className="todos">
      {
          todos.map((todo, index) => {
              let cls = ['row flex todos-item']
                  
              if(todo.completed) {
                  cls.push('completed')
              }
              if(todo.important) {
                  cls.push('important')
              }
              
              return (
                  <div className={cls.join(' ')} key={index}>   
                      <div className="col todos-num">{index + 1}</div>
                      { edit === todo._id ? 
                          <div className="input-field col s12">
                              <input 
                                type="text"
                                id="text"
                                name="input"
                                className="validate"
                                onChange={handleEditChange}     
                                value={editText}/>
                          </div>
                       :  
                          <p className="col todos-text">{todo.text}</p>
                      }

                      {
                        edit === todo._id ?
                          <div className="col todos-buttons">
                            <i className="material-icons green-text" onClick={() => saveEditTodo(todo._id)}>save</i>
                          </div> 
                          :
                        <div className="col todos-buttons">
                            <i className="material-icons blue-text" onClick={() => completedTodo(todo._id)}>check</i>
                            <i className="material-icons orange-text" onClick={() => importantTodo(todo._id)}>warning</i>
                            <i className="material-icons purple-text" onClick={() => editTodo(todo._id, todo.text)}>edit</i>
                          <i className="material-icons red-text" onClick={() => removeTodo(todo._id)}>delete</i>
                        </div>
                      }            
                  </div>
              )
          })
      }
    </div>
  </div>
</div>
</div>
  )
}

export default Mainpage;