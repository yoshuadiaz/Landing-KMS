$(document).ready(function() {
	$("header .IniciarSesion").click(LightSesionIn);
	$("#loginScreen .fondolight").click(LightSesionOut);
	 
	$('#fullpage').fullpage({
		menu: "#myMenu",
		anchors:["home", "comofunciona", "pulsera", "app", "contacto"],
		resize: false,
		scrollOverflow: true,
		verticalCentered: false,
		fixedElements: "#imagenCelular"
	});
});


function LightSesionIn(){
	$("#loginScreen .contenidoLight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		console.log("Animacion terminada entrar");
	});
	$("#loginScreen").addClass("activo");
	$("#loginScreen .contenidoLight").addClass("animated flipInX");
}

function LightSesionOut(){
	$("#loginScreen .contenidoLight").removeClass("flipInX");
	$("#loginScreen .contenidoLight").addClass("fadeOutDown");
	$("#loginScreen .contenidoLight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		console.log("Animacion terminada para salir");
		$("#loginScreen").removeClass("activo");
		$("#loginScreen .contenidoLight").removeClass("animated fadeOutDown");
	});
	
}