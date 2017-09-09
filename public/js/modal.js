function openModal(e){

  var id;
  var activeImovel;

  for(i = 0; i<e.path.length; i++){
    if(e.path[i].className == 'cardm'){
      id = e.path[i].dataset.id;
      break;
    }
  }

  for(i = 0; i<imoveis.length; i++){
    if(imoveis[i].id == id){
      activeImovel = imoveis[i];
      break;
    }
  }

  var size = {
    width: window.innerWidth || document.body.clientWidth,
    height: window.innerHeight || document.body.clientHeight
  }

  var modal = document.getElementById("modal");
  modal.style.display = 'block';
  modal.style.left = ((size.width/2) - (400)) + "px";

  var img = document.getElementById("image-modal");
  img.src="public/img/imoveis/400" + activeImovel.img;

  var tam = document.getElementById("tamanho-modal");
  tam.textContent = activeImovel.tamanho + " m²";

  var stars = document.getElementById("stars-row");
  stars.innerHTML = '';
  stars.appendChild(buildRanking(activeImovel.silencio));

  var opacity = document.getElementById("opacity");
  opacity.style.display = 'block';
}

function closeModal(){
  var modal = document.getElementById("modal");
  modal.style.display = 'none';
  var opacity = document.getElementById("opacity");
  opacity.style.display = 'none';
}


function buildRanking(n){

  //filter available stars value
  if(n > 10 || n < 0){ return; }

  //recognize number of stars and half stars
  var numberOfStars = parseInt(n/2);
  var numberOfHalfStars = (n % 2 == 0) ? 0 : 1;

  //build container
  var container = document.createElement('div');
  container.className = 'span12';
  container.style.float = 'none';
  container.style.margin = '0 auto';

  //inserting stars
  for(var i = 0; i < numberOfStars; i++){
    container.appendChild(createStar(true, false));
  }

  //inserting half stars
  if(numberOfHalfStars != 0){
    container.appendChild(createStar(true, true));
  }

  //inserting none stars
  while(container.childNodes.length < 5){
    container.appendChild(createStar(false));
  }

  return container;
}

function createStar(valuable, half){
  var star = document.createElement('i');
  star.className = 'material-icons stars-modal';
  star.appendChild(document.createTextNode(valuable ? (half ? 'star_half' : 'star'): 'star_border'));
  return star;
}
