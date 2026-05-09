import { useEffect, useState } from "react";
import API from "../services/api";

function MemberDashboard() {

  const [tasks, setTasks] = useState([]);

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {

    try {

      const response = await API.get("/tasks");

      // Show only assigned tasks
      const myTasks = response.data.filter(
        (task) => task.assigned_to === userEmail
      );

      setTasks(myTasks);

    } catch (error) {

      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {

    try {

      await API.put(`/tasks/${id}`, {
        status: status
      });

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Member Dashboard
        </h1>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="bg-red-500 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-6">
          My Tasks
        </h2>

        {
          tasks.length === 0 ? (

            <p className="text-gray-500">
              No tasks assigned
            </p>

          ) : (

            <div className="space-y-4">

              {
                tasks.map((task) => (

                  <div
                    key={task._id}
                    className="border p-5 rounded-lg"
                  >

                    <h3 className="text-xl font-semibold">
                      {task.title}
                    </h3>

                    <p className="text-gray-600 mt-1">
                      {task.description}
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

                    <p className="mt-1">
                      <span className="font-semibold">
                        Due Date:
                      </span>{" "}
                      {task.due_date || "Not Set"}
                    </p>

                    <div className="mt-4 flex gap-3">

                      <button
                        onClick={() =>
                          updateStatus(task._id, "Completed")
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded"
                      >
                        Mark Completed
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(task._id, "Pending")
                        }
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                      >
                        Mark Pending
                      </button>

                    </div>

                  </div>
                ))
              }

            </div>
          )
        }

      </div>

    </div>
  );
}

export default MemberDashboard;