defmodule Me.RoomChannel do
  use Phoenix.Channel

  import Guardian.Phoenix.Socket

  def join("rooms:lobby", %{"jwt" => jwt}, socket) do
    case sign_in(socket, jwt) do
      {:ok, authed_socket, _guardian_params} ->
        send(self, :after_join)
        {:ok, authed_socket}
      {:error, reason} ->
        {:error, reason}
    end
  end

  def join("rooms:" <> _private_room_id, _params, _socket) do
    {:error, %{reason: "unauthorized"}}
  end

  def handle_in("new_message", %{"body" => body}, socket) do
    broadcast! socket, "new_message", %{body: body}
    {:noreply, socket}
  end

  def handle_info(:after_join, socket) do
    broadcast! socket, "new_user", %{}
    {:noreply, socket}
  end

  intercept ["new_message"]

  def handle_out("new_message", payload, socket) do
    push socket, "new_message", payload
    {:noreply, socket}
  end
end
