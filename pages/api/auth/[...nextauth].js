import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectToDatabase } from "../../../helpers/mongodb";
import { verifyPassword } from "../../../helpers/auth";

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        // Email et mdp
        const { email, password } = credentials;

        // Connexion à mongoDB
        const clientMongoDB = await connectToDatabase();
        // 1ere étape : l'utilisateur existe?
        const utilisateur = await clientMongoDB
          .db()
          .collection("utilisateurs")
          .findOne({ email: email });

        if (!utilisateur) {
          clientMongoDB.close();
          throw new Error("Impossible de vous authentifier 1 ");
        }
        // 2eme etape : mot de passe ok
        const isValid = await verifyPassword(
          password,
          utilisateur.password
        );

        if (!isValid) {
          clientMongoDB.close();
          throw new Error("Impossible de vous authentifier");
        }

        // 3eme etape succès
        clientMongoDB.close();
        return {
          email: utilisateur.email,
          name: utilisateur.pseudo,
        };
      },
    }),
  ],
});
