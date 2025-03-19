import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./TaskPage.module.css";

const API_URL = "http://localhost:5000/todos";

const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    axios.get(`${API_URL}/${id}`).then((response) => {
      setTask(response.data);
      setEditText(response.data.title);
    });
  }, [id]);

  const handleEdit = () => {
    axios.put(`${API_URL}/${id}`, { title: editText }).then(() => {
      navigate("/");
    });
  };

  const handleDelete = () => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      navigate("/");
    });
  };

  if (!task) return <p>Загрузка...</p>;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        ← Назад
      </button>
      <h2>Задача</h2>
      <textarea
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        className={styles.textarea}
      />
      <div className={styles.buttons}>
        <button onClick={handleEdit}>Сохранить</button>
        <button onClick={handleDelete} className={styles.deleteButton}>
          Удалить
        </button>
      </div>
    </div>
  );
};

export default TaskPage;
