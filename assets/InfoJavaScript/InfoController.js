var isInEnglish = false


// Carrega a função depois da pagina dar load
document.addEventListener("DOMContentLoaded", function() {
	addEventListeners();
	chooseJSONByLanguage();
  });


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

			//Percurso Profissional Timeline
			case 8:
				loadCareerTrajectory(data,i)
				break;

			default:
				break;
		}	
		

	}


}



