$(function(){

      function buildHTML(message){
        if ( message.image ) {
          var html =
          `<div class="main-message" data-message-id="${message.id}">
            <div class="main-message__up-user">
              <p class="main-message__up-user__up-name">
                ${message.user_name}
              </p>
              <p class="main-message__up-user__up-day">
                ${message.created_at}
              </p>
            </div>
              <p class="main-message__text">
                ${message.text}
              </p>
              <img class="main-message__image" src=${message.image}>
          </div>`
          return html;
        } else {
          var html =
          `<div class="main-message" data-message-id="${message.id}">
            <div class="main-message__up-user">
              <p class="main-message__up-user__up-name">
                ${message.user_name}
              </p>
              <p class="main-message__up-user__up-day">
                ${message.created_at}
              </p>
            </div>
              <p class="main-message__text">
                ${message.text}
              </p>
          </div>`
          return html;
        };
      }

  $('#new_message').on("submit",function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.main-messages').append(html).animate({ scrollTop: $('.main-messages')[0].scrollHeight});
        $('form')[0].reset();
        $('.input-btn').prop( 'disabled', false );
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
    });
  });
  var reloadMessages = function(){
    var last_message_id = $('.main-message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function (messages) { 
      if (messages.length !== 0) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message); 
        });
        $('.main-messages').append(insertHTML);
        $('.main-messages').animate({ scrollTop: $('.main-messages')[0].scrollHeight});
      }
    })
    .fail(function(){
      alert("error");
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});