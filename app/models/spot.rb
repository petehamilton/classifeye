class Spot < ActiveRecord::Base
  validates_uniqueness_of :reference, :message => "must be unique"
end
