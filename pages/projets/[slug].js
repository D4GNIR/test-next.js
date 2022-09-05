import Link from "next/link";
import { connectToDatabase } from "../../helpers/mongodb";

export default function Projet(props) {
  // Variable
  const { titre, description, client, annee, slug } = props.projet;
  let ClientDisplay;
  if (client == "Projet personnel") {
    ClientDisplay = "perso";
  }

  return (
    <>
      <h1 style={{ marginBottom: ".5rem" }}>{titre}</h1>
      <small style={{ display: "flex", gap: "15px" }}>
        <Link href={`/${ClientDisplay}`}>
          <a
            style={{
              color: "#ee6c4d",
              textDecoration: "none",
            }}
          >
            {client}
          </a>
        </Link>
        <div>Projet réalisée en {annee}</div>
      </small>
      <p>{description}</p>
    </>
  );
}
export async function getStaticPaths() {
  let projets;

  try {
    const client = await connectToDatabase();
    const db = client.db();

    projets = await db.collection("projets").find().toArray();
  } catch (error) {
    projets = [];
  }

  const dynamicPaths = projets.map((projet) => ({
    params: { slug: projet.slug },
  }));

  return {
    paths: dynamicPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  // Variables
  let projetRecup;
  let { params } = context;
  const slug = params.slug;

  try {
    const client = await connectToDatabase();
    const db = client.db();

    // Récupérer les projets
    projetRecup = await db
      .collection("projets")
      .find({ slug: slug })
      .sort({ annee: "desc" })
      .toArray();
  } catch (error) {
    projetRecup = [];
  }

  return {
    props: {
      projet: JSON.parse(JSON.stringify(projetRecup))[0],
    },
  };
}
