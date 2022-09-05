import { useRouter } from "next/router";
import Link from "next/link";

export default function Projets() {
  // Variable
  const router = useRouter();

  return (
    <>
      <h1 style={{ marginBottom: ".5rem" }}>{router.query.slug}</h1>
      <small>
        <Link href='/perso'>
          <a
            style={{
              color: "#ee6c4d",
              textDecoration: "none",
            }}
          >
            Projet personnel
          </a>
        </Link>
      </small>
    </>
  );
}
