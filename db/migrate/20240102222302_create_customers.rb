# frozen_string_literal: true

# CreateCustomers
class CreateCustomers < ActiveRecord::Migration[7.1]
  def change
    create_table :customers do |t|
      t.string :people_type, limit: 20, null: false
      t.string :phone, limit: 15
      t.string :cell_phone, limit: 15
      t.text :observation
      t.string :email, limit: 100, null: false
      t.boolean :active, null: false, default: true

      t.timestamps
    end
  end
end
