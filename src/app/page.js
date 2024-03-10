"use client"

import { useRef, useState, useEffect } from "react"
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdClearAll } from "react-icons/md";
import { FaSort } from "react-icons/fa";

export default function Home() {
  const dialogRef = useRef();
  const [list, setList] = useState([]);

  const [inputVal, setInputVal] = useState('');

  const handleDialogAction = () => {
    dialogRef.current.showModal();
  }
  const handleCloseDialog = () => {
    dialogRef.current.close();
  }
  const handleAddTask = () => {
    handleCloseDialog();
    // setList([...list, { task: inputVal, done: false }])
    // localStorage.setItem("tasks",[...list]);
    const updatedList = [...list, { task: inputVal, done: false }];
    setList(updatedList);
    localStorage.setItem("tasks", JSON.stringify(updatedList));
  }

  const handleUpdateList = (index) => {
    let temp = [...list];
    temp[index].done = !temp[index].done;
    setList([...temp]);
    // localStorage.setItem("tasks", [...list]);
    localStorage.setItem("tasks", JSON.stringify([...temp]));
  }
  const handleClearList = () => {
    let temp = [...list];
    let updatedList = temp.filter((item) => item.done === false);
    setList(updatedList);
    localStorage.setItem("tasks", JSON.stringify(updatedList));
  }
  const handleSortList = () => {
    let temp = [...list];
    let doneList = temp.filter((task) => task.done === true);
    let yetList = temp.filter((task) => task.done === false);
    let finalList = [...yetList, ...doneList];
    setList(finalList);
    localStorage.setItem("tasks",JSON.stringify(finalList));
  }
  useEffect(() => {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
      // setList([...tasks]);
      setList(JSON.parse(tasks));
    }
  }, [])
  return (
    <>
      <section>
        <Header />
        <TaskList tasklist={list} updateList={handleUpdateList} />
        <button className="action-button" onClick={handleDialogAction}><FaPlus /></button>
        <FaSort className="side-icon sort" onClick={handleSortList} />
        <MdClearAll className="side-icon clear-all" onClick={handleClearList} />
      </section>
      <dialog ref={dialogRef}>
        <IoMdClose onClick={handleCloseDialog} />
        <form method="dialog">
          <input placeholder="type your task" value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
          <button onClick={(e) => { e.preventDefault(); handleAddTask() }}>Add</button>
        </form>
      </dialog>
    </>
  );
}
