$(document).ready(function() {
	$("header .IniciarSesion, #loginScreen .fondolight ").click(LightSesion);
	$('#fullpage').fullpage({
		menu: "#myMenu",
		anchors:["home", "comofunciona", "pulsera", "app", "contacto"],
		resize: false,
		scrollOverflow: true,
		verticalCentered: false,
		fixedElements: "#imagenCelular"
	});
});


function LightSesion(){
	$("#loginScreen").toggleClass("activo");
	$("#loginScreen .contenidoLight").toggleClass("animated flipInX");
}