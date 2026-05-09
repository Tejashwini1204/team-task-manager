import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    assigned_to: "",
    status: "Pending",
    due_date: ""
  });

  useEffect(() => {

    fetchProjects();
    fetchTasks();
    fetchMembers();

  }, []);

  // =========================
  // FETCH PROJECTS
  // =========================

  const fetchProjects = async () => {

    try {

      const response = await API.get("/projects");

      setProjects(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // FETCH TASKS
  // =========================

  const fetchTasks = async () => {

    try {

      const response = await API.get("/tasks");

      setTasks(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // FETCH MEMBERS
  // =========================

  const fetchMembers = async () => {

    try {

      const response = await API.get("/members");

      setMembers(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {

    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // CREATE TASK
  // =========================

  const createTask = async (e) => {

    e.preventDefault();

    try {

      await API.post("/tasks", taskData);

      alert("Task Created Successfully");

      fetchTasks();

      setTaskData({
        title: "",
        description: "",
        assigned_to: "",
        status: "Pending",
        due_date: ""
      });

    } catch (error) {

      console.log(error);

      alert("Failed to create task");
    }
  };

  // =========================
  // DELETE TASK
  // =========================

  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  // =========================
  // ANALYTICS
  // =========================

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  );

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  );

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-5xl font-bold">
          Admin Dashboard
        </h1>

        <button
          onClick={() => {

            localStorage.clear();

            window.location.href = "/";
          }}
          className="bg-red-500 text-white px-5 py-3 rounded-lg"
        >
          Logout
        </button>

      </div>

      {/* ANALYTICS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold">
            Total Tasks
          </h2>

          <p className="text-4xl text-blue-500 mt-4">
            {tasks.length}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold">
            Completed Tasks
          </h2>

          <p className="text-4xl text-green-500 mt-4">
            {completedTasks.length}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-bold">
            Pending Tasks
          </h2>

          <p className="text-4xl text-yellow-500 mt-4">
            {pendingTasks.length}
          </p>

        </div>

      </div>

      {/* PROJECTS */}

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-3xl font-bold mb-6">
          Projects
        </h2>

        <div className="space-y-4">

          {
            projects.map((project) => (

              <div
                key={project._id}
                className="border p-5 rounded-lg"
              >

                <h3 className="text-2xl font-semibold">
                  {project.name}
                </h3>

                <p className="text-gray-600 mt-2">
                  {project.description}
                </p>

              </div>
            ))
          }

        </div>

      </div>

      {/* CREATE TASK */}

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-3xl font-bold mb-6">
          Create Task
        </h2>

        <form
          onSubmit={createTask}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            className="p-3 border rounded"
            value={taskData.title}
            onChange={handleChange}
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            className="p-3 border rounded"
            value={taskData.description}
            onChange={handleChange}
          />

          {/* MEMBER DROPDOWN */}

          <select
            name="assigned_to"
            className="p-3 border rounded"
            value={taskData.assigned_to}
            onChange={handleChange}
          >

            <option value="">
              Select Member
            </option>

            {
              members.map((member) => (

                <option
                  key={member.email}
                  value={member.email}
                >
                  {member.name} ({member.email})
                </option>

              ))
            }

          </select>

          <input
            type="date"
            name="due_date"
            className="p-3 border rounded"
            value={taskData.due_date}
            onChange={handleChange}
          />

          <button
            className="bg-blue-500 text-white p-3 rounded-lg"
          >
            Create Task
          </button>

        </form>

      </div>

      {/* TOP PERFORMERS */}

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-3xl font-bold mb-6">
          Top Performers
        </h2>

        {
          [...new Set(tasks.map(task => task.assigned_to))]
            .map(member => {

              const completed = tasks.filter(
                task =>
                  task.assigned_to === member &&
                  task.status === "Completed"
              ).length;

              return (

                <div
                  key={member}
                  className="flex justify-between border-b py-4"
                >

                  <p className="font-semibold">
                    {member}
                  </p>

                  <p className="text-green-500 font-bold">
                    {completed} Completed
                  </p>

                </div>
              );
            })
        }

      </div>

      {/* TASKS */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-3xl font-bold mb-6">
          All Tasks
        </h2>

        <div className="space-y-4">

          {
            tasks.map((task) => (

              <div
                key={task._id}
                className="border p-5 rounded-lg"
              >

                <h3 className="text-2xl font-semibold">
                  {task.title}
                </h3>

                <p className="text-gray-600 mt-2">
                  {task.description}
                </p>

                <p className="mt-3">
                  <span className="font-semibold">
                    Assigned To:
                  </span>{" "}

                  {task.assigned_to}
                </p>

                <p className="mt-2">

                  <span className="font-semibold">
                    Status:
                  </span>

                  <span
                    className={`ml-2 font-semibold ${
                      task.status === "Completed"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {task.status}
                  </span>

                </p>

                <p className="mt-2">

                  <span className="font-semibold">
                    Due Date:
                  </span>{" "}

                  {task.due_date || "Not Set"}

                </p>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 text-white px-5 py-2 rounded mt-4"
                >
                  Delete Task
                </button>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;