import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import styles from "@/styles/DashboardEvent.module.css";

export default function DashboardEvent({ seminar, handleDelete }) {
  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/seminars/${seminar.slug}`}>
          <a>{seminar.name}</a>
        </Link>
      </h4>
      <Link href={`/seminars/edit/${seminar.id}`}>
        <a className={styles.edit}>
          <FaPencilAlt />
          <span>Edit Seminar</span>
        </a>
      </Link>
      <a
        href='#'
        className={styles.delete}
        onClick={() => handleDelete(seminar.id)}
      >
        <FaTimes />
        <span>Delete</span>
      </a>
    </div>
  );
}
