import { connectToDatabase } from "../../helpers/mongodb";
import { hashPassword } from "../../helpers/auth";

export default async function handler(req, res) {
  // On vérifie qu'on recoit bien un post
  if (req.method == "POST") {
    // Toutes les infos qu'on recupere de l'api
    const { pseudo, email } = req.body;
    let { password } = req.body;
    // On vérifie que tous les champs soit rempli
    if (!pseudo || !email || !password) {
      // Si il manque un élément
      res.status(422).json({
        message: "Champ du formulaire manquant.",
      });
      // On envoi return pour ne pas envoyer le reste du code
      return;
    }

    // Hash password
    password = await hashPassword(password);

    //On Stocke le nouvel utilsateur
    const nouvelUtilisateur = {
      pseudo,
      email,
      password,
    };

    // Vérifier la syntaxe de l'email
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(email)) {
      res.status(406).json({
        message: "Votre adresse email est invalide",
      });
      // On envoi return pour ne pas envoyer le reste du code
      return;
    }

    //Connexion à MongoDB
    let clientMongoDB;

    try {
      clientMongoDB = await connectToDatabase();
    } catch (error) {
      res.status(500).json({
        message: "Impossible d'effectuer la requête.",
      });
      return;
    }
    // On recup la bdd
    const db = clientMongoDB.db();
    let emailDejaUtilise;

    // Vérifier que l'adresse email n'est pas déjà utilisé
    try {
      emailDejaUtilise = await db
        .collection("utilisateurs")
        .findOne({ email: email });
    } catch (error) {
      // On ferme la bdd
      clientMongoDB.close();
      res.status(500).json({
        message: "Un problème est survenu",
      });
      return;
    }

    if (emailDejaUtilise) {
      clientMongoDB.close();
      res.status(403).json({
        message: "Cette adresse email est déjà utilisée",
      });
      return;
    }

    //Insérer un nouvel utilsateur
    try {
      // On injecte dans la table utilisateur le nouvel utilisateur
      await db
        .collection("utilisateurs")
        .insertOne(nouvelUtilisateur);
    } catch (error) {
      // On ferme la bdd
      clientMongoDB.close();
      res.status(500).json({
        message: "Un problème est survenu",
      });
      return;
    }

    //Succès
    clientMongoDB.close();
    res.status(201).json({
      message: "Utilisateur ajouter avec succès",
      utilisateur: nouvelUtilisateur,
    });
    // Si on ne recoit pas un post on envoi une erreur
  } else {
    res.status(405).json({
      message: "Une erreur est survenue",
    });
  }
}
