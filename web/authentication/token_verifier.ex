defmodule Me.TokenVerifier do
  alias Me.User
  alias Me.Repo

  import Me.Verifier.Facebook, only: [facebook_verifier: 2]

  def verify_and_login(provider, token, data) do
    case provider do
      "facebook" ->
        case facebook_verifier(token, data) do
          {:ok, user_data} -> get_or_create(user_data)
          {:error, error_message} -> {:error, error_message}
        end
    end
  end

  defp get_or_create(%{"email" => email} = data) do
    user = Repo.get_by(User, email: email)

    unless user do
      User.changeset(
        %User{},
        %{
          email: email,
          first_name: Map.get(data, "first_name"),
          last_name: Map.get(data, "last_name"),
          password: :crypto.strong_rand_bytes(32) |> Base.encode64
        }
      )
      |> Repo.insert
      |> Guardian.encode_and_sign(:api)
    else
      user |> Guardian.encode_and_sign(:api)
    end
  end
end
