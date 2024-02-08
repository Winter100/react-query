import { Link } from "react-router-dom";
import styles from "./mainNavbar.module.css";

export default function MainNavBar() {
  return (
    <nav>
      <ul className={styles.ul}>
        <li>
          <Link to={"/"}>홈</Link>
        </li>
        <li>
          <Link to={"/query"}>기본 쿼리 페이지</Link>
        </li>
        <li>
          <Link to={"/infinite"}>무한 스크롤 페이지</Link>
        </li>
      </ul>
    </nav>
  );
}
