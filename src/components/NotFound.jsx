import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h2>Ошибка 404</h2>
      <p>Что-то пошло не так</p>
      <Link to="/">Вернуться на главную</Link>
    </div>
  );
};

export default NotFound;
