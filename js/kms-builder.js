function menuInvocador(){
	$("nav > ul").toggleClass("fadeInLeft activo");
}

function LightSesionIn(){
	$("#loginContent").addClass("activo");
	$("#loginScreen .contenidoLight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		console.log("Animacion terminada entrar");
	});
	$("#loginScreen").addClass("activo");
	$("#loginScreen .contenidoLight").addClass("animated bounceIn");
}
function SoftwareIn(){
	$("#softwareContent").addClass("activo");
	$("#loginScreen .contenidoLight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		console.log("Animacion terminada entrar");
	});
	$("#loginScreen").addClass("activo");
	$("#loginScreen .contenidoLight").addClass("animated bounceIn");
}

function pulseraCarrusel(){
	$(".pulseraActivador").click(function(){
		activadorCarrusel("pulsera")
	});
	$(".innerActivador").click(function(){
		activadorCarrusel("inner")
	});
	$(".cargadorActivador").click(function(){
		activadorCarrusel("cargador")
	});
}

function activadorCarrusel(seleccionado){
	console.log("se selecciono:"+seleccionado)
	$(".izquierda .activo, .derecha .activo").removeClass("activo");
	if(seleccionado == "pulsera"){
		$(".pulseraActivador, .pulseraPlasticaDetail").addClass("activo");
	}
	if(seleccionado == "inner"){
		$(".innerActivador, .innerDetail").addClass("activo");
	}
	if(seleccionado == "cargador"){
		$(".cargadorActivador, .cargadorDetail").addClass("activo");
	}

}

function cerrarLight(){
	$("#loginScreen .contenidoLight").removeClass("bounceIn");
	$("#loginScreen .contenidoLight").addClass("fadeOutDown");
	$("#loginScreen .contenidoLight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		console.log("Animacion terminada para salir");
		$("#loginScreen").removeClass("activo");
		$("#loginScreen .contenidoLight").removeClass("animated fadeOutDown");
		$("#loginContent, #softwareContent").removeClass("activo");
	});
}

$(document).ready(function() {
	$("header .IniciarSesion").click(LightSesionIn);
	$("header .Software").click(SoftwareIn);
	$("#loginScreen .fondolight").click(cerrarLight);
	$(".menuInvocador").click(menuInvocador);
	//$('#fullpage').fullpage({
	//	menu: "#myMenu",
	//	anchors:["home", "comofunciona", "pulsera", "app", "contacto"],
	//	resize: false,
	//	scrollOverflow: true,
	//	verticalCentered: false,
	//	fixedElements: "#imagenCelular"
	//});

  if ( location.hash == "#loginfailed" ) {
		$('#loginScreen .failed').fadeIn();
    LightSesionIn();
	} else if ( location.hash == "#login" ) {
		LightSesionIn();
	} else if ( location.hash == "#software" ) {
	  SoftwareIn();
	}

	var $submit = $('#loginScreen form input[type=submit]');
	$submit.slideUp(0);

	$.getJSON('login.php', { g: 'csrf'}, function(data) {
        $('#loginScreen form input[name=csrf_key]').val(data.csrf_key);
        $('#loginScreen form input[name=csrf_secret]').val(data.csrf_secret);

		$submit.slideDown();
	});
});
