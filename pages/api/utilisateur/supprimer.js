import { connectToDatabase } from "../../helpers/mongodb";
import { getSession } from "next-auth/client";

export async function handler(req, res) {
  if (req.method == "DELETE") {
    const session = await getSession({ req: req });

    if (!session) {
      res
        .status(401)
        .json({ message: "Impossible de vous authentifier." });
      return;
    }
  } else {
    res.status(403).json({ message: "Votre requête est invalidée" });
    return;
  }
}
