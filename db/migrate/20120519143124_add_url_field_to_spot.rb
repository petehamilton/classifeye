class AddUrlFieldToSpot < ActiveRecord::Migration
  def change
    add_column :spots, :url, :string

  end
end
