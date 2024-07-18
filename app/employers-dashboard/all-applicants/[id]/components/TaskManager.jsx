import Paper from "@/components/common/Paper";

const TaskManager = () => {
    return(
        <Paper>
            <div>
            <div className="d-flex justify-content-between">
               <h5>Task Manager</h5>
               <div>
                <button className="theme-btn btn-style-one small">Add</button>
               </div>
            </div>

            </div>
        </Paper>
    )
}

export default TaskManager;