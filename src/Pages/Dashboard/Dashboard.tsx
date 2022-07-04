import { PlusCircle } from "phosphor-react";
import { ChangeEvent, useState } from "react";

import { Header } from "../../components/Header/Header";
import { TaskList } from "../../components/TaskList/TaskList";
import { WithoutTask } from "../../components/WithoutTask/WithoutTask";

import styles from "./Dashboard.module.css";

type TaskProps = {
  id: number;
  task: string;
  check: boolean;
};

export function Dashboard() {
  const [newId, setNewId] = useState(0);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  function checkTask(id: number) {
    const taskCheck = tasks.findIndex((task) => {
      return task.id === id;
    });

    const tempTasks = [...tasks];
    tempTasks[taskCheck].check = !tempTasks[taskCheck].check;
    setTasks(tempTasks);
  }

  function deleteTask(id: number) {
    const taskWithoutDeleteOne = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(taskWithoutDeleteOne);
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleSubmitTask(event: React.FormEvent) {
    event.preventDefault();

    const newtask: TaskProps = {
      id: newId,
      task: newTask,
      check: false,
    };

    setTasks([...tasks, newtask]);

    setNewTask("");
    setNewId((state) => state + 1);
  }

  let amountTaskCheck = tasks.reduce((amount, tasks) => {
    if (tasks.check === true) {
      return amount + 1;
    }
    return amount;
  }, 0);

  return (
    <>
      <Header />
      <main className={styles.dashboardContainer}>
        <section className={styles.dashboardCreateTaskContainer}>
          <form
            className={styles.dashboardCreateTask}
            onSubmit={handleSubmitTask}
          >
            <input
              onChange={handleNewTaskChange}
              value={newTask}
              type="text"
              className={styles.dashboardCreateTaskInput}
              placeholder="Adicione uma tarefa"
            />
            <button
              type="submit"
              className={styles.dashboardCreateTaskButton}
              disabled={newTask.length === 0}
            >
              Criar
              <span>
                <PlusCircle size={20} />
              </span>
            </button>
          </form>
        </section>

        <section className={styles.dashboardTaskContainer}>
          <div className={styles.dashboardTaskHeader}>
            <aside className={styles.dashboardTaskHeaderCreated}>
              <p>Tarefas criadas</p>
              <span>{tasks.length}</span>
            </aside>

            <aside className={styles.dashboardTaskHeaderCompleted}>
              <p>Concluídas</p>
              <span>
                {tasks.length === 0
                  ? 0
                  : `${amountTaskCheck} de ${tasks.length}`}
              </span>
            </aside>
          </div>
          {tasks.length === 0 && <WithoutTask />}

          {tasks.map((task) => {
            return (
              <TaskList
                key={task.id}
                task={task}
                onCheckTask={checkTask}
                onDeleteTask={deleteTask}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}
