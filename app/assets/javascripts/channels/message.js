$(function(){

      function buildHTML(message){
        if ( message.image ) {
          var html =
          `<div class="main-message">
          <div class="main-message__up-user">
            <p class="main-message__up-user__up-name">
              ${message.user_name}
            </p>
            <p class="main-message__up-user__up-day">
              ${message.created_at}
            </p>
          </div>
            <img class="main-message__image" src=${message.image}>
        </div>`
          return html;
        } else {
          var html =
          `<div class="main-message">
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
        console.log(this);
      })
  });
});