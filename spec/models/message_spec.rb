require 'rails_helper.rb'
describe Message do
  describe '#create' do
    it 'メッセージがあれば保存できる' do
      message = build(:message, image:nil)
      expect(message).to be_valid
    end

    it '画像があれば保存できる' do
      image = build(:message, text:nil)
      expect(image).to be_valid
    end

    it 'メッセージと画像があれば保存できる' do
      message = build(:message)
      expect(message).to be_valid
    end
    
    it 'メッセージも画像もないと保存できない' do
      message = build(:message, text: nil, image: nil)
      message.valid?
      expect(message.errors[:text]).to include('を入力してください')
    end

    it 'group_idがないと保存ができない' do
      message = build(:message, group_id: nil)
      message.valid?
      expect(message.errors[:group]).to include('を入力してください')
    end

    it 'user_idがないと保存ができない' do
      message = build(:message, user_id: nil)
      message.valid?
      expect(message.errors[:user]).to include('を入力してください')
    end
  end
end