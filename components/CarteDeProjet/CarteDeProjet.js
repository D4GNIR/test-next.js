import classes from "./carteDeProjet.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

export default function CarteDeProjet(props) {
  const router = useRouter();
  const { titre, description, annee, slug, client } = props.projet;

  //   Methode
  // const cardClickHandler = () => {
  //   router.push({
  //     pathname: "/projets/[slug]",
  //     query: {
  //       slug: "Maze",
  //     },
  //   });
  // };

  return (
    <Link href={`/projets/${slug}`}>
      <a className={classes.CarteDeProjet}>
        <h3>{titre}</h3>
        <p>{description}</p>
      </a>
    </Link>
  );
}
