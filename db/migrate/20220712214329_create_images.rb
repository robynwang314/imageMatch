class CreateImages < ActiveRecord::Migration[6.1]
  def change
    create_table :images do |t|
      t.string :label
      t.string :host_url
      t.string :image_url
      t.text :comments

      t.timestamps
    end
  end
end
