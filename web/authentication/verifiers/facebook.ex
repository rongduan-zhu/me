defmodule Me.Verifier.Facebook do
  def facebook_verifier(token, data) do
    case HTTPoison.get(
      "https://graph.facebook.com/debug_token?" <>
      "input_token=" <> Map.get(data, "accessToken") <>
      "&access_token=" <> Map.get(data, "accessToken")
    ) do
      {:ok, %HTTPoison.Response{body: response}} ->
        Poison.decode!(response)
        |> Map.get("data", nil)
        |> is_response_valid
        |> is_valid_user(data)
        |> is_valid_app
        |> user_info(Map.get(data, "accessToken"))
      _ -> {:error}
    end
  end

  defp user_info(data, access_token) do
    case HTTPoison.get(
      "https://graph.facebook.com/" <> Map.get(data, "user_id") <>
      "?access_token=" <> access_token <>
      "&fields=email,first_name,last_name"
    ) do
      {:ok, %HTTPoison.Response{body: response}} -> {:ok, Poison.decode!(response)}
      _ -> {:error}
    end
  end

  defp is_response_valid(data) do
    cond do
      Map.get(data, "is_valid", false) -> data
      true -> invalid_token!
    end
  end

  defp is_valid_user(data, request_data) do
    cond do
      Map.get(data, "user_id") === Map.get(request_data, "userId") -> data
      true -> invalid_token!
    end
  end

  defp is_valid_app(data) do
    cond do
      Map.get(data, "app_id") === Application.fetch_env!(:me, :facebook_app_id) -> data
      true -> invalid_token!
    end
  end

  defp invalid_token!() do
    raise ArgumentError, message: "Invalid token"
  end
end
