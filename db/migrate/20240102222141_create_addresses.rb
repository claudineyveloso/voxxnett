# frozen_string_literal: true

# CreateAddresses
class CreateAddresses < ActiveRecord::Migration[7.1]
  def change
    create_table :addresses do |t|
      t.string :street, limit: 100, null: false
      t.string :complement, limit: 50
      t.string :neighborhood, limit: 50, null: false
      t.string :city, limit: 50, null: false
      t.string :state, limit: 2, null: false
      t.string :zip_code, limit: 15, null: false
      t.references :addressable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
