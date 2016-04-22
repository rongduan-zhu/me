defmodule Me.UserController do
  use Me.Web, :controller

  import Me.TokenVerifier, only: [verify_and_login: 3]

  def create(conn, %{"token" => token, "provider" => provider} = data) do
    case verify_and_login(provider, token, data) do
      {:ok, user} -> send_resp(conn, 200, user.email)
      {:error, _} -> send_resp(conn, 400, "Unable to register/login")
    end
  end
  def create(conn, %{"form" => _form} = data) do

  end
end
