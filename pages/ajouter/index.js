import { useForm } from "react-hook-form";
import Head from "next/head";
import { SpinnerDotted } from "spinners-react";
import { useState } from "react";
import Error from "../../components/UI/Error/Error";
import { useRouter } from "next/router";
import MyButton from "../../components/UI/Button/MyButton";

export default function Ajouter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // UseState
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const router = useRouter();

  // method
  const formSubmit = async (data) => {
    if (!isLoading) {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/projet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const fetchedData = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(fetchedData.message || "Une erreur est survenue");
      } else {
        setIsLoading(false);
        router.replace(`/projets/${fetchedData.projet.slug}`);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Ajouter un projet</title>
      </Head>
      <h1 style={{ textAlign: "center", marginTop: "35px" }}>
        Ajouter un projet
      </h1>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <main style={{ backgroundColor: "#f3f3f3", padding: "30px" }}>
          {(errors.titre ||
            errors.slug ||
            errors.client ||
            errors.annee ||
            errors.description ||
            errors.contenu) && (
            <Error>Rempli tous les champs du formulaire</Error>
          )}
          {error && <Error>{error}</Error>}
          <form onSubmit={handleSubmit(formSubmit)}>
            <p>
              <label htmlFor='titre' style={{ display: "block" }}>
                Titre
              </label>
              <input
                id='titre'
                placeholder='Entre un titre'
                {...register("titre", {
                  required: true,
                })}
              />
            </p>
            <p>
              <label htmlFor='slug' style={{ display: "block" }}>
                Slug
              </label>
              <input
                id='slug'
                placeholder='Entre un slug'
                {...register("slug", {
                  required: true,
                })}
              />
            </p>
            <p>
              <label htmlFor='client' style={{ display: "block" }}>
                Client
              </label>
              <input
                id='client'
                placeholder='Entre un client'
                {...register("client", {
                  required: true,
                })}
              />
            </p>
            <p>
              <label htmlFor='annee' style={{ display: "block" }}>
                Année
              </label>
              <input
                id='annee'
                placeholder='Entre une anneé'
                {...register("annee", {
                  required: true,
                })}
              />
            </p>
            <p>
              <label
                htmlFor='description'
                style={{ display: "block" }}
              >
                Description
              </label>
              <textarea
                id='description'
                placeholder='Entre une description'
                rows='5'
                style={{
                  display: "block",
                  width: "400px",
                  border: "1px solid gray",
                  padding: "10px 15px 10px 15px",
                  borderRadius: "5px",
                  marginTop: "5px",
                  fontFamily: "Arial",
                }}
                {...register("description", {
                  required: true,
                })}
              ></textarea>
            </p>
            <p>
              <label htmlFor='contenu' style={{ display: "block" }}>
                Contenu
              </label>
              <textarea
                id='contenu'
                placeholder='Entre un contenu'
                rows='5'
                style={{
                  display: "block",
                  width: "400px",
                  border: "1px solid gray",
                  padding: "10px 15px 10px 15px",
                  borderRadius: "5px",
                  marginTop: "5px",
                  fontFamily: "Arial",
                }}
                {...register("contenu", {
                  required: true,
                })}
              ></textarea>
            </p>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <MyButton>
                {isLoading ? (
                  <SpinnerDotted
                    size={15}
                    thickness={100}
                    speed={100}
                    color='#ffffff'
                  />
                ) : (
                  "Ajouter"
                )}
              </MyButton>
            </div>
          </form>
        </main>
      </section>
    </>
  );
}
