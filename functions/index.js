const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});


admin.initializeApp();
admin.firestore().settings({ignoreUndefinedProperties: true});

exports.createUser = functions.https.onCall(async (data, context) => {
  console.log("Received data:", data);
  const {email, password} = data;

  try {
    // Create the user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    // Create a corresponding document in Firestore
    await admin.firestore().collection("users").doc(userRecord.uid).set({
      email: email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: "new",
    });

    // Return the UID of the new user
    return {uid: userRecord.uid, message: "User successfully created!"};
  } catch (error) {
    console.error("Error creating user:", error);
    throw new functions.https.HttpsError("internal", error.message);
  }
});


exports.loginUser = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    try {
      const {email} = req.body;
      const user = await admin.auth().getUserByEmail(email);
      const token = await admin.auth().createCustomToken(user.uid);
      res.status(200).json({token});
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  });
});

exports.logoutUser = functions.https.onRequest( async ( req, res ) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    try {
      // No need to handle logout on the backend for Firebase auth
      res.status(200).json({message: "Logout successful"});
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  });
});
