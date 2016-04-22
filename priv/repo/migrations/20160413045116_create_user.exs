defmodule Me.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :first_name, :string
      add :last_name, :string
      add :password_digest, :string
      add :email, :string
      add :last_login, :datetime

      timestamps
    end

    create unique_index(:users, [:email])
  end
end
