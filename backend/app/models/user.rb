class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  belongs_to :plan
  belongs_to :role
  has_many :user_lessons, dependent: :destroy
  has_many :lessons, through: :user_lessons

  after_create :update_access_token!

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :first_name_kana, presence: true
  validates :last_name_kana, presence: true
  validates :email, presence: true, uniqueness: { case_sensitive: true }, format: { with: VALID_EMAIL_REGEX }
  validates :birthday, presence: true
  validates :phone_number, presence: true

  def update_access_token!
    # 有効期限 14 日の access_token 作成
    self.access_token = "#{id}:#{Devise.friendly_token}"
    self.access_token_expire = Time.current.since(14.days)
    save
  end

  def access_token_expired?
    self.access_token_expire < Time.current
  end

  def name
    last_name + " " + first_name
  end

  def name_kana
    last_name_kana + " " + first_name_kana
  end

  def plan_name
    plan.name
  end

  def is_admin?
    self.role.admin?
  end

  def is_trial?
    self.role.trial?
  end
end