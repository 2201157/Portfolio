var isInEnglish = false


// Carrega a função depois da pagina dar load
document.addEventListener("DOMContentLoaded", function() {
	chooseJSONByLanguage();
  });

//Calcula a idade
function calculate_age(){

	var birthday = new Date("2001-08-14");
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); 
    var diff = Math.abs(ageDate.getUTCFullYear() - 1970);

	
	var idadeDiv = document.getElementById("idade").innerHTML = diff;

}


document.getElementById("gmail").addEventListener("click", function(){

window.open("mailto:rodrigoperesum@gmail.com", '_blank');

}, false);



document.getElementById("whatsapp").addEventListener("click", function(){

window.open("https://wa.me/+351914594573", '_blank');

}, false);

//Carrega a imagem
function loadImg(srcPath){

    document.getElementById("imageModal").src=srcPath;
    var modal = document.getElementById("infoImageModal");
   
}

//Carrega a informação para os projetos do portfolio
function loadInfo(projeto){

	var infoPanel = document.getElementById("info");
	var file
	!isInEnglish ? file = 'info.json' : file = "info_eng.json"
	
	$.ajax({

		type: 'GET',
		url: `assets/json/${file}`,
		contentType:"application/json; charset=utf-8",
		dataType : 'json',
		success : function(data){

			let content;
			for(let i = 0; i < data.length; i++) if(projeto === data[i].titulo) content = data[i];

			if(content == null)return;

			let htmlText = `<a href="#work"><img class="m-2" src="images/back_button.png" height="50px" width="50px"></a>
									<div align="center"><h4>${content.titulo}</h4><p class="infoParah">${content.Descrição}</p></div>`;

			infoPanel.innerHTML = htmlText;

			for(let i = 0; i < content.Imagens.length; i++){

				infoPanel.innerHTML += `<div align="center"><div class="card m-3 max_width">
              <div class="infoMargin" align="center"><img data-toggle="modal" data-target="#infoImageModal" onclick="loadImg('${content.Imagens[i].src}')" class="infoPic" src="${content.Imagens[i].src}" ></div>
              <h5 class="card-title text-center m-1">${content.Imagens[i].titulo}</h5>
              <div class="card-body backgroundImg text-center">
                <p class="card-text">${content.Imagens[i].Descrição}</p>
              </div>
            </div>
            </div>`;

			}

		},
		error : function(request, status,error){

			alert(error);

		}

	});
}

//Escolhe o idioma para carregar a informação total do site
function chooseJSONByLanguage(){

	var userLang = navigator.language || navigator.userLanguage; 
	userLang === "pt-PT" ? loadWebsiteInfo("webSite_pt",userLang) : loadWebsiteInfo("webSite_eng")

}

// Ajax que vai carregar a informação
function loadWebsiteInfo(filename,userLang){

	$.ajax({

		type: 'GET',
		url: `assets/json/${filename}.json`,
		contentType:"application/json; charset=utf-8",
		dataType : 'json',
		success: function(data){

			userLang != "pt-PT" ? isInEnglish = true :isInEnglish = false
			setInformation(data,userLang)

		},
		error : function(request, status,error){
			alert(error)
		}

	})

}

//Dá set da informação vinda do json
function setInformation(data,userLang){


	for (let i = 0; i < data.length; i++){

		switch(i){

			//Botões de navegação
			case 0:
				loadNavButtons(data,i)
				break;

			//Cargo na Pagina Home
			case 1:
				loadActualJobHome(data,i)
				break;

			//Texto geral do portfolio
			case 2:
				loadPortfolio(data,i)
				break;

			//Lista de projetos
			case 3:
				loadWorksList(data,i)
				break;

			//Info pessoal e titulos
			case 4:
				loadPersonalInfo(data,i)
				break;

			//Notas do Tesp
			case 5:
				loadTespGrades(data,i)
				break;

			//Percurso Escolar Timeline
			case 6:
				loadSchoolTrajectory(data,i)
				break;

			//Titulo dos contactos
			case 7:
				loadContactsTitle(data,i)
				break;


			default:
				break;
		}	
		

	}

	

	

}

//Carrega o html dos botões da navBar
function loadNavButtons(data,i){

	let navBar = document.getElementById("nav")
	navBar.innerHTML = ""

	for(let j=0; j < data[i].length;j++){
		navBar.innerHTML += `<a href="${data[i][j].href}" class="${data[i][j].ico}"><span>${data[i][j].Descrição}</span></a>`
	}
}

//Carrega o html do cargo atual na pagina home
function loadActualJobHome(data,i){

	let headerHome = document.getElementById("headerHome")
	headerHome.innerHTML = ""
	headerHome.innerHTML += `<h1>Rodrigo Peres</h1>`
	headerHome.innerHTML += `<p>${data[i].Descrição}</p>`

}


//Carrega o portfolio
function loadPortfolio(data,i){

	let article = document.getElementById("work")

	article.innerHTML = ""
	article.innerHTML = `<header id="workHeader"></header>`

	for(let j = 0; j < data[i].length; j++){

		switch (data[i][j].titulo){

			case "Trabalhos":
				let header = document.getElementById("workHeader")
				header.innerHTML = `<h2>${data[i][j].Descrição}</h2>`
				break;

			case "Descrição da secção":
				article.innerHTML += `<p>${data[i][j].Descrição}</p>`
				break;

			case "Aviso":
				article.innerHTML += `<b>${data[i][j].Descrição}</b>`
				break;

			default:
				break;
		}

	} 

	article.innerHTML += `<section class="m-1">
          <div class="row" id="worksList">
          </div>
        </section>`


}

//Carrega a lista de projetos
function loadWorksList(data,i){

	let row = document.getElementById("worksList")

	for(let j = 0; j < data[i].length;j++){

		row.innerHTML += `<div class="col-4 col-6-medium col-12-small card m-2" style="width: 18rem;">
              <a href="#info" onclick="loadInfo('${data[i][j].titulo}')" class="image fit"><img class="card-img-top" src="${data[i][j].image}"></a>
              <h5 class="card-title text-center m-1">${data[i][j].titulo}</h5>
              <div class="card-body backgroundImg text-center">
                <p class="card-text">${data[i][j].Descrição}</p>
              </div>
            </div>`

	}

}

//Carrega alguma info pessoal e alguns titulos
function loadPersonalInfo(data,i){

	let curricumArticle = document.getElementById("Curriculum")

	curricumArticle.innerHTML = ""
	curricumArticle.innerHTML = `<div class="page-content">
                    <div class="container">
            <div class="cover shadow-lg bg-white">
                <div class="row">
                </div>     
              <div class="about-section pt-4 px-3 px-lg-4 mt-1">
                <div class="row">
                  <div class="col-md-5">
                    <div class="row mt-2">
                      <div class="col-sm-4" id="idadeDiv">
                      </div>
                      <div class="col-sm-8">
                        <div id="idade" class="pb-1 text-secondary"></div>
                      </div>
                      <div class="col-sm-4" id="moradaDiv">
                      </div>
                      <div class="col-sm-8" id="EndereçoDiv">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="d-print-none"/>
              <div class="skills-section px-3 px-lg-4" id="notasCurricularesDiv">
              </div>
              <hr class="d-print-none"/>
              <div class="page-break"></div>
              <div class="education-section px-3 px-lg-4 pb-4" id="percursoDiv">
              </div>

            </div>
          </div>
        </div>`

	let idadeDiv = document.getElementById("idadeDiv")
	let moradaDiv = document.getElementById("moradaDiv")
	let enderecoDiv = document.getElementById("EndereçoDiv")
	let notasDiv = document.getElementById("notasCurricularesDiv")
	let percursoDiv = document.getElementById("percursoDiv")

	for(let j = 0; j < data[i].length; j++){

		switch (data[i][j].titulo){

			case "idade":
				idadeDiv.innerHTML = `<div class="pb-1">${data[i][j].Descrição}</div>`
				calculate_age()
				break;

			case "Morada":
				moradaDiv.innerHTML = `<div class="pb-1">${data[i][j].Descrição}</div>`
				break;

			case "Endereço":
				enderecoDiv.innerHTML = `<div class="pb-1 text-secondary">${data[i][j].Descrição}</div>`
				break;

			case "Notas Curriculares":
				notasDiv.innerHTML += `<h2 class="h3 mb-3">${data[i][j].Descrição}</h2>`
				notasDiv.innerHTML += `<div class="row">
                  <div class="col-md-6" id="NotasTespColuna1">
                  </div>
                  <div class="col-md-6" id="NotasTespColuna2">
                  </div>
                </div>`
				break;

			case "Percurso Escolar":
				percursoDiv.innerHTML += `<h2 class="h3 mb-4">${data[i][j].Descrição}</h2>`
				percursoDiv.innerHTML += `<div class="timeline" id="percursoEscolarTimeline">
                </div>`
				break;

			default:
				break;

		}

	}

}


//Carrega as notas do Tesp
function loadTespGrades(data,i){

	let coluna1 = document.getElementById("NotasTespColuna1")
	let coluna2 = document.getElementById("NotasTespColuna2")


	for (let j = 0; j < data[i].length; j++){

		if(j % 2 == 0){

			coluna1.innerHTML += `<div class="mb-2">
                      <span>${data[i][j].titulo}</span>
                      <div class="pb-1 text-secondary">${data[i][j].Descrição}</div>
                    </div>`

		}else{
			coluna2.innerHTML += `<div class="mb-2">
                      <span>${data[i][j].titulo}</span>
                      <div class="pb-1 text-secondary">${data[i][j].Descrição}</div>
                    </div>`

		}

	}
}

//Carrega a timeline da trajetoria escolar
function loadSchoolTrajectory(data,i){

	let timelineDiv = document.getElementById("percursoEscolarTimeline")

	for(let j = 0; j < data[i].length; j++){

		timelineDiv.innerHTML += `<div class="timeline-card timeline-card-success card shadow-sm">
                    <div class="card-body">
                      <div class="h5 mb-1">${data[i][j].titulo}</div>
                      <div class="text-muted text-small mb-2 m-1">${data[i][j].Descrição}</div>
                      <div class="text-muted text-small mb-2 m-1">${data[i][j].Ano}</div>
                    </div>
                  </div>`

	}

}

//Carrega o titulo dos contactos
function loadContactsTitle(data,i){

	let headerContact = document.getElementById("contactHeader")
	headerContact.innerHTML = `<h2 class="text-center">${data[i].Descrição}</h2>`

}

