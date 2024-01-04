# frozen_string_literal: true

# CreateCustomersUsers
class CreateCustomersUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :customers_users do |t|
      t.references :customer, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
