
const TaskList = ({tasklist, updateList}) => {
    return (
        <>
            <ul className="task-list">
                {/* <li>
                    <span>Task</span>
                    <span></span>
                </li> */}
                {tasklist.map((item, index)=>{
                    return(
                        <li key={index} onClick={()=> updateList(index)}>
                            <span>{item.task}</span>
                            <span className={item.done?"done": ""}></span>
                        </li>
                    )
                })}
            </ul>
        </>
    );
}

export default TaskList;