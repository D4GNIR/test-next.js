import { useRouter } from "next/router";
import CarteDeProjet from "../../components/CarteDeProjet/CarteDeProjet";
import FiltreDeClient from "../../components/FiltresDeClient/FiltresDeClient";
import { connectToDatabase } from "../../helpers/mongodb";

export default function ProjetsDuClient(props) {
  const router = useRouter();
  let nomDuClient = router.query.client;

  if (nomDuClient === "perso") {
    nomDuClient = "Projet personnels";
  } else {
    nomDuClient = `Projets de ${nomDuClient}`;
  }

  return (
    <>
      <h1>{nomDuClient}</h1>
      {/* Filtre */}
      <FiltreDeClient client={router.query.client} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        {props.projets.map((projet) => (
          <CarteDeProjet projet={projet} />
        ))}
      </div>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { client: "perso" } }],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  let projets;
  let client;
  const { params } = context;
  let clientParam = params.client;

  if (clientParam == "perso") {
    clientParam = "Projet personnel";
  }

  try {
    // connexion à mongoDB
    const client = await connectToDatabase();
    // connexion à bdd
    const db = client.db();
    // Récuperer les projets
    projets = await db
      .collection("projets")
      .find({ client: clientParam })
      .toArray();
  } catch (error) {
    projets = [];
  }
  return {
    props: {
      projets: JSON.parse(JSON.stringify(projets)),
    },
  };
}
