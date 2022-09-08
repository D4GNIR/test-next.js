import CarteDeProjet from "../components/CarteDeProjet/CarteDeProjet";
import { connectToDatabase } from "../helpers/mongodb";
import Head from "next/head";
import Image from "next/image";
import { getSession, signOut } from "next-auth/client";
import { useState } from "react";

export default function Index(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const onDeleteClick = async () => {
    if (!isLoading) {
      setIsLoading(true);
      setError(null);

      //Envoyer la demande de suppression
      const response = await fetch("api/utilisateur/supprimer", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const fetchedData = await response.json();
      if (!response.ok) {
        setIsLoading(false);
        setError(fetchedData.message || "Une erreur est survenue");
      } else {
        setIsLoading(false);
        signOut();
      }
    }
  };
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
            {props.utilisateur && (
              <button
                style={{
                  background: "#ee6c4d",
                  color: "white",
                  marginLeft: "30px",
                  border: "none",
                  padding: "10px 15px 10px 15px",
                  borderRadius: "5px",
                }}
                onClick={onDeleteClick}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  style={{ width: "15px", height: "15px" }}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                  />
                </svg>
              </button>
            )}
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
