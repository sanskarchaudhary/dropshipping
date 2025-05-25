import { doc, setDoc } from "firebase/firestore"
import { db } from "./firebase"

export const makeUserAdmin = async (userId: string, email: string) => {
  try {
    await setDoc(
      doc(db, "users", userId),
      {
        uid: userId,
        email: email,
        role: "admin",
        displayName: "Admin User",
        createdAt: new Date(),
      },
      { merge: true },
    )

    console.log("User has been made admin successfully!")
  } catch (error) {
    console.error("Error making user admin:", error)
  }
}

// Call this function in the browser console with your user ID to make yourself admin
// Example: makeUserAdmin("your-user-id", "your-email@example.com")
