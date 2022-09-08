import classes from "./Header.module.css";
import Link from "next/link";
import { signOut } from "next-auth/client";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const onLogoutClickedHandler = () => {
    signOut();
    router.push("/");
  };

  return (
    <header className={classes.Header}>
      <div
        className='container'
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link href='/'>
          <h1 style={{ margin: 0 }} className={classes.title}>
            Dagnir
          </h1>
        </Link>

        <nav>
          <ul
            style={{
              display: "flex",
              listStyleType: "none",
              margin: 0,
              padding: 0,
              gap: "15px",
            }}
          >
            <li>
              <Link href='/'>Accueil</Link>
            </li>
            <li>
              <Link href='/projets'>Projets</Link>
            </li>
            <li>
              <Link href='/ajouter'>Ajouter</Link>
            </li>
            <li>
              <Link href='/connexion'>Connexion</Link>
            </li>
            <li>
              <Link href='/inscription'>Inscription</Link>
            </li>
            <li>
              <a
                style={{ cursor: "pointer" }}
                onClick={onLogoutClickedHandler}
              >
                Déconnexion
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
