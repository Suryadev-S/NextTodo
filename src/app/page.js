"use client"

import { useRef, useState } from "react"
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
    setList([...list, { task: inputVal, done: false }])
  }

  const handleUpdateList = (index) => {
    let temp = [...list];
    temp[index].done = !temp[index].done;
    setList([...temp]);
  }
  const handleClearList = () => {
    let temp = [...list];
    setList([...temp.filter((item) => item.done===false)]);
  }
  const handleSortList = () => {
    let temp = [...list];
    let doneList = temp.filter((task) => task.done===true);
    let yetList = temp.filter((task) => task.done===false);
    setList([...yetList,...doneList]);
  }
  return (
    <>
      <section>
        <Header />
        <TaskList tasklist={list} updateList={handleUpdateList} />
        <button className="action-button" onClick={handleDialogAction}><FaPlus /></button>
        <FaSort className="side-icon sort" onClick={handleSortList}/>
        <MdClearAll className="side-icon clear-all" onClick={handleClearList}/>
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
