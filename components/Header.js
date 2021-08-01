import { useContext } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Link from "next/link";
import styles from "@/styles/Header.module.css";
import Search from "./Search";
import AuthContext from "@/context/AuthContext";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>MarWebEducationCenter</a>
        </Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            {" "}
            <Link href='/seminars'>
              <a>Seminars</a>
            </Link>
          </li>
          {user ? (
            //If user logged in
            <>
              <li>
                {" "}
                <Link href='/seminars/add'>
                  <a>Add New Seminar</a>
                </Link>
              </li>
              <li>
                {" "}
                <Link href='/account/dashboard'>
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => logout()}
                  className='btn-secondary btn-icon'
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </li>
            </>
          ) : (
            //If user logged out
            <>
              <li>
                {" "}
                <Link href='/account/login'>
                  <a className='btn-secondary btn-icon'>
                    <FaSignInAlt />
                    Sign In
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
