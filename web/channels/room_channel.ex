defmodule Me.RoomChannel do
  use Phoenix.Channel

  def join("rooms:lobby", _message, socket) do
    send(self, :after_join)
    {:ok, socket}
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
