import MyButton from "../../components/UI/Button/MyButton";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Error from "../../components/UI/Error/Error";
import { SpinnerDotted } from "spinners-react";
import { getSession } from "next-auth/client";

export default function Inscription() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // UseState
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isRegister, setIsRegister] = useState(false);

  //   Methode
  const onFormSubmit = async (data) => {
    if (!isLoading) {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/inscription", {
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
        setIsRegister(fetchedData.utilisateur);
      }
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "35px" }}>
        Inscription
      </h1>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <main style={{ backgroundColor: "#f3f3f3", padding: "30px" }}>
          {error && <Error>{error}</Error>}
          {isRegister ? (
            <div>
              Félicitations ! Vous pouvez vous connecter{" "}
              {isRegister.pseudo}.
            </div>
          ) : (
            <form onSubmit={handleSubmit(onFormSubmit)}>
              <p>
                <label htmlFor='pseudo'>Pseudo</label>
                <input
                  type='text'
                  placeholder='Pseudo'
                  {...register("pseudo", {
                    required: true,
                  })}
                />
                {errors.pseudo && (
                  <small>Veuillez renseigner ce champ</small>
                )}
              </p>
              <p>
                <label htmlFor='email'>Addresse email</label>
                <input
                  type='email'
                  placeholder='email'
                  {...register("email", {
                    required: true,
                    pattern:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  })}
                />
                {errors.email && errors.email.type === "required" && (
                  <small>Veuillez renseigner ce champ</small>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <small>
                    Votre adresse E-mail n'est pas correct
                  </small>
                )}
              </p>
              <p>
                <label htmlFor='password'>Mot de passe</label>
                <input
                  type='password'
                  placeholder='Mot de passe'
                  {...register("password", {
                    required: true,
                  })}
                />
                {errors.password && (
                  <small>Veuillez renseigner ce champ</small>
                )}
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
                    "Je m'inscris"
                  )}
                </MyButton>
              </div>
            </form>
          )}
        </main>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/connexion",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
