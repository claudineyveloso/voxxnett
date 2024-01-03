# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_01_02_222302) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string "street", limit: 100, null: false
    t.string "complement", limit: 50
    t.string "neighborhood", limit: 50, null: false
    t.string "city", limit: 50, null: false
    t.string "state", limit: 2, null: false
    t.string "zip_code", limit: 15, null: false
    t.string "addressable_type", null: false
    t.bigint "addressable_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["addressable_type", "addressable_id"], name: "index_addresses_on_addressable"
  end

  create_table "customers", force: :cascade do |t|
    t.string "people_type", limit: 20
    t.string "phone", limit: 15
    t.string "cell_phone", limit: 15
    t.text "observation"
    t.string "email", limit: 100
    t.boolean "active", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "people", force: :cascade do |t|
    t.string "first_name", limit: 100, null: false
    t.string "last_name", limit: 100, null: false
    t.string "cpf_cnpj", limit: 15
    t.string "identity_municipal_registration", limit: 20
    t.string "dispatcher", limit: 20
    t.datetime "birthday_date", null: false
    t.string "personable_type", null: false
    t.bigint "personable_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["personable_type", "personable_id"], name: "index_people_on_personable"
  end

  create_table "users", force: :cascade do |t|
    t.string "user_name", limit: 100, null: false
    t.boolean "is_active", default: true
    t.string "user_type", limit: 30, null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jti", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["user_name"], name: "index_users_on_user_name", unique: true
  end

end
