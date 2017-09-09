window.onload = function(){
  var doc = document.querySelector('link[rel="import"]').import;
  var text = doc.querySelector('.modal-template');

  var documentBody = document.body;
  
  documentBody.insertBefore(text.cloneNode(true), documentBody.childNodes[0]);

}
