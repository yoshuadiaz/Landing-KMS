$(document).ready(function() {
	$("header .IniciarSesion").click(LightSesionIn);
	$("#loginScreen .fondolight").click(LightSesionOut);
	$(".menuInvocador").click(menuInvocador);
	$('#fullpage').fullpage({
		menu: "#myMenu",
		anchors:["home", "comofunciona", "pulsera", "app", "contacto"],
		resize: false,
		scrollOverflow: true,
		verticalCentered: false,
		fixedElements: "#imagenCelular"
	});
	
	if ( location.hash == "#loginfailed" ) {
		LightSesionIn();
		$('#loginScreen .failed').css('display', 'inline-block');
	} else if ( location.hash == "#login" ) {
		LightSesionIn();
	}
});

function menuInvocador(){
	$("nav > ul").toggleClass("fadeInLeft activo");
}
function LightSesionIn(){
	$("#loginScreen .contenidoLight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		console.log("Animacion terminada entrar");
	});
	$("#loginScreen").addClass("activo");
	$("#loginScreen .contenidoLight").addClass("animated bounceIn");
}

function LightSesionOut(){
	$("#loginScreen .contenidoLight").removeClass("bounceIn");
	$("#loginScreen .contenidoLight").addClass("fadeOutDown");
	$("#loginScreen .contenidoLight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		console.log("Animacion terminada para salir");
		$("#loginScreen").removeClass("activo");
		$("#loginScreen .contenidoLight").removeClass("animated fadeOutDown");
	});
	
}