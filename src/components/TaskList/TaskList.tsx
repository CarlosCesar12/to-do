import { Circle, CheckCircle, Trash } from "phosphor-react";

import styles from "./TaskList.module.css";

type TaskListProps = {
  onCheckTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  task: { id: number; task: string; check: boolean };
};

export function TaskList({ onCheckTask, onDeleteTask, task }: TaskListProps) {
  function handleCheckTask() {
    onCheckTask(task.id);
  }

  function handleDeleteTask() {
    onDeleteTask(task.id);
  }

  return (
    <div className={styles.TaskListContainer} key={task.id}>
      <button className={styles.TaskListButtonCheck} onClick={handleCheckTask}>
        {task.check ? (
          <CheckCircle className={styles.TaskListButtonCheckTrue} size={24} />
        ) : (
          <Circle className={styles.TaskListButtonCheckFalse} size={24} />
        )}
      </button>
      <p
        className={
          task.check ? styles.TaskListTextTrue : styles.TaskListTextFalse
        }
      >
        {task.task}
      </p>
      <button
        className={styles.TaskListButtonTrashContainer}
        onClick={handleDeleteTask}
      >
        <Trash className={styles.TaskListButtonTrash} size={20} />
      </button>
    </div>
  );
}
