import { useRouter } from "next/router";
import Link from "next/link";

export default function projets() {
  const router = useRouter();

  //   Methode

  return (
    <>
      <h1 style={{ marginBottom: "0.5rem" }}>{router.query.slug}</h1>

      <small>
        <Link href={`/perso`}>
          <a style={{ color: "#ee6c4d", textDecoration: "none" }}>
            Elrond
          </a>
        </Link>
      </small>
    </>
  );
}
