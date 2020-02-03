#chatspace DB設計

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false,foreign_key: true|
|nickname|string|null: false|
|email|string|null: false,unique: true|
|password|string|null: false|
### Association
  has_many :messages
  
  has_many :groups,through: :user_groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false,foreign_key: true|
|name|string|null: false|
### Association
has_many :messages

has_many :users,through: :user_groups

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null:false,foreign_key: true|
|text|string|
|image|string|
|user_id|integer|
|group_id|integer|
### Association
  belong_to :user

  belong_to :group

## user_groupsテーブル
|Cloumn|Type|Options|
|------|----|-------|
|id|integer|null:false|
|user_id|integer|
|group_id|integer|
### Association
  belong_to :user

  belong_to :group