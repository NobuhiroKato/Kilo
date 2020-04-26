module ControllerHelper
  def find_admin_user
    User.find_by(role: Role.admin)
  end

  def find_normal_user
    User.find_by(role: Role.normal)
  end

  def find_trial_user
    User.find_by(role: Role.trial)
  end
end
