import { useRouter } from "next/router";
import CarteDeProjet from "../../components/CarteDeProjet/CarteDeProjet";
import FiltreDeClient from "../../components/FiltresDeClient/FiltresDeClient";
import { connectToDatabase } from "../../helpers/mongodb";
import Head from "next/head";

export default function ProjetsDuClient(props) {
  // Variables
  const router = useRouter();
  let nomDuClient = router.query.client;

  if (nomDuClient === "perso") {
    nomDuClient = "Projets personnels";
  } else {
    nomDuClient = `Projets de ${nomDuClient}`;
  }

  return (
    <>
      <Head>
        <title>{nomDuClient}</title>
      </Head>
      <h1>{nomDuClient}</h1>

      {/* Filtres */}
      <FiltreDeClient
        client={router.query.client}
        annees={props.annees}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        {props.projets.map((projet) => (
          <CarteDeProjet projet={projet} key={projet._id} />
        ))}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  // Connexion à MongoDB
  const client = await connectToDatabase();
  const db = client.db();

  // Récupérer les projets
  const projets = await db.collection("projets").find().toArray();

  let arrayPaths = projets.map((projet) => {
    if (projet.client == "Projet personnel") {
      return "perso";
    } else {
      return projet.client;
    }
  });

  arrayPaths = [...new Set(arrayPaths)];

  const dynamicPaths = arrayPaths.map((path) => ({
    params: { client: path },
  }));

  console.log(dynamicPaths);

  return {
    paths: dynamicPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  // Variables
  let projets;
  let annees;
  const { params } = context;
  let clientParam = params.client;

  if (clientParam == "perso") {
    clientParam = "Projet personnel";
  }

  try {
    const client = await connectToDatabase();
    const db = client.db();

    // Récupérer les projets
    projets = await db
      .collection("projets")
      .find({ client: clientParam })
      .sort({ annee: "asc" })
      .toArray();
    projets = JSON.parse(JSON.stringify(projets));

    annees = projets.map((projet) => projet.annee);
    annees = [...new Set(annees)];
  } catch (error) {
    projets = [];
  }

  return {
    props: {
      projets: projets,
      annees: annees,
    },
    revalidate: 3600,
  };
}
