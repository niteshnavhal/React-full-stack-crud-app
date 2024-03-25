import { useEffect, useState } from "react";
import List from "./components/List";
import axios from "axios";
import { baseUrl } from "./utils/constant";

function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUi, setUpdateUi] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/`)
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
      })
      .catch((err) => console.log(`Error : ${err}`));
  }, [updateUi]);

  const addTask = () => {
    axios.post(`${baseUrl}/save`, { task: input }).then((res) => {
      console.log(res.data);
      setInput("");
      setUpdateUi((prevState) => !prevState);
    });
  };

  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdateId(id);
  };

  const updateTask = () => {
    axios.post(`${baseUrl}/update/${updateId}`, { task: input }).then((res) => {
      console.log(res.data);
      setUpdateId(null);
      setInput("");
      setUpdateUi((prev) => !prev);
    });
  };
  return (
    <main>
      <h1>Crud Operation</h1>
      <div className="inputHslder">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          onClick={() => {
            updateId ? updateTask() : addTask();
          }}
        >
          {updateId ? "Update Task" : "Add Task"}
        </button>
        <ul>
          {tasks.map((task) => (
            <List
              key={task._id}
              id={task._id}
              task={task.task}
              setUpdateUi={setUpdateUi}
              updateMode={updateMode}
            />
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
