
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




