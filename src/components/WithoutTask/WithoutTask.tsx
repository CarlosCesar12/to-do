import WithoutTaskImg from "../../assets/images/Clipboard.svg";

import styles from "./WithoutTask.module.css";

export function WithoutTask() {
  return (
    <section className={styles.withoutTaskContainer}>
      <img src={WithoutTaskImg} alt="Without task" />
      <span>Você ainda não tem tarefas cadastradas</span>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </section>
  );
}
