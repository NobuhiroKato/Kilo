module V1
  class PlanSerializer < ActiveModel::Serializer
    attributes :name, :price, :monthly_lesson_count, :for_children
  end
end
