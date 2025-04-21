import { api } from '../api-client'

interface SignInWithCredentialsRequest {
  email: string
  password: string
}

interface SignInWithCredentialsResponse {
  token: string
}

export async function signInWithCredentials({
  email,
  password,
}: SignInWithCredentialsRequest) {
  const { token } = await api
    .post('sessions/credentials', {
      json: {
        email,
        password,
      },
    })
    .json<SignInWithCredentialsResponse>()

  return { token }
}
