# frozen_string_literal: true

# CreatePeople
class CreatePeople < ActiveRecord::Migration[7.1]
  def change
    create_table :people do |t|
      t.string :first_name, limit: 100, null: false
      t.string :last_name, limit: 100, null: false
      t.string :cpf_cnpj, limit: 15
      t.string :identity_municipal_registration, limit: 20
      t.string :dispatcher, limit: 20
      t.datetime :birthday_date, null: false
      t.references :personable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
