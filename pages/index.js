import CarteDeProjet from "../components/CarteDeProjet/CarteDeProjet";
import { connectToDatabase } from "../helpers/mongodb";
import Head from "next/head";
import Image from "next/image";
import { getSession } from "next-auth/client";

export default function Index(props) {
  return (
    <main>
      <Head>
        <title>Portfolio - Dagnir</title>
      </Head>
      <h1>
        Bienvenue
        {props.utilisateur
          ? `${props.utilisateur.name} sur mon portfolio`
          : "sur mon portfolio"}
      </h1>
      <div
        style={{
          border: "2px solid #ee6c4d",
          padding: "30px",
          borderRadius: "15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <div>
          <h2 style={{ fontWeight: "lighter" }}>
            Je m'appelle <b>Dagnir</b>
          </h2>
          <p>
            Je suis dévellopeur full-stack, je maîtise de nombreuses
            technologies. Envie de collaborer avec moi?
          </p>
          <p>
            <a
              href='mailto:moi@gmail.com'
              style={{
                display: "inline-block",
                background: "#ee6c4d",
                color: "white",
                textDecoration: "none",
                padding: "10px 15px 10px 15px",
                borderRadius: "5px",
              }}
            >
              Contactez-moi!
            </a>
          </p>
        </div>
        <div>
          <div
            style={{
              borderRadius: "50%",
              overflow: "hidden",
              lineHeight: "0",
            }}
          >
            <Image
              src='/dagnir.png'
              alt='Dagnir'
              width={150}
              height={150}
              layout='fixed'
              loading='eager'
            />
          </div>
        </div>
      </div>
      <div>
        <h2 style={{ marginTop: "45px" }}>Mes derniers projets</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
          }}
        >
          {props.projets.map((projet) => (
            <CarteDeProjet projet={projet} key={projet._id} />
          ))}
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  // Variables
  let projets;
  // permet de recupérer la requete
  const session = await getSession({ req: context.req });
  let utilisateur = null;

  if (session) {
    utilisateur = session.user;
    // console.log(utilisateur);
  }

  try {
    const client = await connectToDatabase();
    const db = client.db();

    // Récupérer les projets
    projets = await db
      .collection("projets")
      .find()
      .sort({ dateDePublication: "desc" })
      .limit(3)
      .toArray();
  } catch (error) {
    projets = [];
  }

  return {
    props: {
      projets: JSON.parse(JSON.stringify(projets)),
      utilisateur: utilisateur,
    },
  };
}
