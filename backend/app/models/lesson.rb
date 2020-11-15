class Lesson < ApplicationRecord
  class AlreadyJoinedError < StandardError; end
  class CantJoinedError < StandardError; end
  class NoCountError < StandardError; end
  class NotJoinedError < StandardError; end
  class CantLeaveError < StandardError; end

  belongs_to :lesson_class
  has_many :user_lessons, dependent: :destroy
  has_many :users, through: :user_lessons

  validates :start_at, presence: true
  validates :end_at, presence: true

  def class_name
    if lesson_class
      lesson_class.name
    end
  end

  def class_memo
    if lesson_class
      lesson_class.description
    end
  end

  def color
    if lesson_class
      lesson_class.color
    end
  end

  def joined?(user)
    users.include? user
  end

  def join(user, admin=false)
    # 参加済みのレッスンへ再度参加した場合
    if joined?(user) then raise AlreadyJoinedError end
    # 今月の参加可能数が 0 である場合
    if user.remaining_monthly_count < 1 then raise NoCountError end

    if !admin
      # 参加しようとしているレッスンの開始時刻が過去である場合
      if Time.current > start_at then raise CantJoinedError end
    end

    users << user
  end

  def leave(user, admin=false)
    # 参加取り消し済みのレッスンへ再度参加取り消しをした場合
    unless joined?(user) then raise NotJoinedError end

    if !admin
      # 参加取り消ししようとしているレッスンの開始時刻が過去である場合
      if Time.current > start_at then raise CantLeaveError end
    end

    user_lessons.find_by(user_id: user.id).destroy
  end

  def leave_all
    ul = user_lessons.where(lesson_id: id)
    if ul
      ul.destroy_all
    end
  end
end
