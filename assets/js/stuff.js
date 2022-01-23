
// Carrega a função depois da pagina dar load
document.addEventListener("DOMContentLoaded", function() {
      calculate_age();
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


function loadInfo(projeto){

	var infoPanel = document.getElementById("info");

	$.ajax({

		type: 'GET',
		url: 'assets/json/info.json',
		contentType:"application/json; charset=utf-8",
		dataType : 'json',
		success : function(data){

			let content;

			for(let i = 0; i < data.length; i++){

				if(projeto === data[i].titulo) content = data[i];
	
			}
			
			let htmlText = `<a href="#work"><img src="images/back_button.png" height="50px" width="50px"></a>
									<div align="center"><h4>${content.titulo}</h4><p class="infoParah">${content.Descrição}</p></div>`;


			infoPanel.innerHTML = htmlText;

			for(let i = 0; i < content.Imagens.length; i++){

				infoPanel.innerHTML += `<div class="infoMargin" align="center"><img class="infoPic" src="${content.Imagens[i].src}" ></div>`;

			}

		},
		error : function(request, status,error){

			alert(error);

		}

	});
}

