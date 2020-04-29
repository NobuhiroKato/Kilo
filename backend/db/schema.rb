# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_29_062350) do

  create_table "lesson_classes", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "lesson_rule"
  end

  create_table "lessons", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.bigint "lesson_class_id"
    t.datetime "start_at"
    t.datetime "end_at"
    t.bigint "user_id"
    t.index ["lesson_class_id"], name: "index_lessons_on_lesson_class_id"
    t.index ["user_id"], name: "index_lessons_on_user_id"
  end

  create_table "plans", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "name"
    t.integer "price"
    t.integer "monthly_lesson_count", default: 0, null: false
    t.boolean "for_children", default: false, null: false
  end

  create_table "roles", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "name"
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", force: :cascade do |t|
    t.string "school_grade"
    t.bigint "plan_id"
    t.string "access_token"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "role_id"
    t.string "first_name"
    t.string "last_name"
    t.string "first_name_kana"
    t.string "last_name_kana"
    t.date "birthday"
    t.string "phone_number"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["plan_id"], name: "index_users_on_plan_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["role_id"], name: "index_users_on_role_id"
  end

  add_foreign_key "users", "roles"
end
