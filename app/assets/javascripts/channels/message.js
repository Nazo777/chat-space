$(function(){
  $('#new_message').on("submit",function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajex({
      url: url,
      type: 'POST',
      data: formData,
      datatype: 'json',
      processData: false,
      contentType: false
    })
  })
});