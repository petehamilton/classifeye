class CreateSpots < ActiveRecord::Migration
  def change
    create_table :spots do |t|
      t.string :reference

      t.timestamps
    end
  end
end
