

const BACKEND_URL = import.meta.env.VITE_API_URL

async function createUserInDB(email: string, uuid: string) {
  const res = await fetch(`${BACKEND_URL}/add-user`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: {
        email,
        uuid,
        name: ''
      }
    }),
  })

  console.log({ res })

  return await res.json()
}

export async function registerNewUser(email: string, password: string) {
  try {
    const userCredential = await fetch(authentication, email, password)
    const userFromDB = await createUserInDB(email, userCredential.user.uid)
    const user = userCredential.user;
    return { user, userFromDB };

  } catch(error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {errorCode, errorMessage};
  }
}

export async function signIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(authentication, email, password)
    const user = userCredential.user;
    return { user };

  } catch(error) {
    const errorCode = error.code;
    const errorMessage = error.message;

    return {errorCode, errorMessage};
  }
}
