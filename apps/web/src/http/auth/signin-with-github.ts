import { api } from '../api-client'

interface SignInWithGithubRequest {
  email: string
  password: string
}

interface SignInWithGithubResponse {
  token: string
}

export async function signInWithGithub({
  email,
  password,
}: SignInWithGithubRequest) {
  const { token } = await api
    .post('session/credentials', {
      json: {
        email,
        password,
      },
    })
    .json<SignInWithGithubResponse>()

  return token
}
