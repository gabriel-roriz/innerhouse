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

  var opacity = document.getElementById("opacity");
  opacity.style.display = 'block';
}

function closeModal(){
  var modal = document.getElementById("modal");
  modal.style.display = 'none';
  var opacity = document.getElementById("opacity");
  opacity.style.display = 'none';
}


function showImoveis(imo){


  imo.length;
  if(imo.length == 0){
    return;
  }

  var element = document.getElementById("div2");

  element.innerHTML = "<div class=\"bar-of-results\"><span class=\"number-of-results\">" + imo.length + " resultados encontrados</span></div>";


  for(i = 0; i < imo.length; i++){
    var card = document.createElement("div");
    card.setAttribute('data-id', imo[i].id);
    card.className = 'cardm';
    card.onclick = openModal;

    var imageCard = document.createElement("div");
    imageCard.className = 'image-card';

    var img = document.createElement('img');
    img.src = "public/img/imoveis/200" + imo[i].img;
    img.className = "image-base";
    imageCard.appendChild(img);

    card.appendChild(imageCard);

    var title = document.createElement("span");
    title.className = 'titleTextCard';
    title.appendChild(document.createTextNode(imo[i].nome));
    card.appendChild(title);

    var rua = document.createElement("span");
    rua.className = 'locateTextCard';
    rua.appendChild(document.createTextNode(imo[i].rua));
    card.appendChild(rua);

    var locate = document.createElement("h3");
    locate.className = 'locateTextCard';
    locate.appendChild(document.createTextNode(imo[i].cidade + ' - ' + imo[i].estado));
    card.appendChild(locate);

    var price = document.createElement("span");
    price.className = 'priceTextCard';
    price.appendChild(document.createTextNode('R$ ' + numberWithCommas(imo[i].valor)));
    card.appendChild(price);

    element.appendChild(card);
  }
}


function search(){

  var filteredImoveis = [];

  var nome = document.getElementById("form-name").value;
  var nomeFiltered = [];

  //step-1 filtering by name
  if(nome.length == 0){
    for (var i in imoveis)
      nomeFiltered[i] = imoveis[i];

  } else {
    for(i = 0; i < imoveis.length; i++){
      if(imoveis[i].nome.includes(nome)){
        nomeFiltered.push(imoveis[i]);
        continue;
      }
    }
  }


  var estado = document.getElementById("form-estado").value;
  var estadoFiltered = [];

  //step-2 filtering by estado
  if(estado.length == 0){
    for (var i in nomeFiltered)
      estadoFiltered[i] = nomeFiltered[i];

  } else {
    for(i = 0; i < nomeFiltered.length; i++){
      if(nomeFiltered[i].estado.includes(estado)){
        estadoFiltered.push(nomeFiltered[i]);
        continue;
      }
    }
  }


  var cidade = document.getElementById("form-cidade").value;
  var cidadeFiltered = [];

  //step-3 filtering by cidade
  if(cidade.length == 0){
    for (var i in estadoFiltered)
      cidadeFiltered[i] = estadoFiltered[i];

  } else {
    for(i = 0; i < estadoFiltered.length; i++){
      if(estadoFiltered[i].cidade.includes(cidade)){
        cidadeFiltered.push(estadoFiltered[i]);
        continue;
      }
    }
  }

  var tamanho = document.getElementById("form-tamanho").value;
  var tamanhoFiltered = [];

  //step-4 filtering by tamanho
  if(tamanho.length == 0){
    for (var i in cidadeFiltered)
      tamanhoFiltered[i] = cidadeFiltered[i];

  } else {
    for(i = 0; i < cidadeFiltered.length; i++){
      if(cidadeFiltered[i].tamanho <= tamanho){
        tamanhoFiltered.push(cidadeFiltered[i]);
        continue;
      }
    }
  }

  var valor = document.getElementById("form-valor").value;
  var valorFiltered = [];

  //step-5 filtering by valor
  if(valor.length == 0){
    for (var i in tamanhoFiltered)
      valorFiltered[i] = tamanhoFiltered[i];

  } else {
    for(i = 0; i < tamanhoFiltered.length; i++){
      if(tamanhoFiltered[i].valor <= tamanho){
        tamanhoFiltered.push(tamanhoFiltered[i]);
        continue;
      }
    }
  }

  // var tipo = CAPTURAR TIPO AQUI

  var restaurante = document.getElementById("form-rest").checked;
  var padaria = document.getElementById("form-pada").checked;
  var mercado = document.getElementById("form-merc").checked;
  var hospitais = document.getElementById("form-hosp").checked;
  var escola = document.getElementById("form-esco").checked;

  showImoveis(valorFiltered);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
