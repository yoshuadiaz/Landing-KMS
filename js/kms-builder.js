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

$(document).ready(function() {
	$("header .IniciarSesion").click(LightSesionIn);
	$("#loginScreen .fondolight").click(LightSesionOut);
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
	}
	
	var $submit = $('#loginScreen form input[type=submit]');
	$submit.slideUp(0);
	
	$.get('login.php', { g: 'csrf'}).done(function(data) {
        console.log(data);
        
		$('#loginScreen form').append(
			$('<input />', {
				'type' : 'hidden',
				'name' : 'csrf_key'
			}),
			$('<input />', {
				'type' : 'hidden',
				'name' : 'csrf_secret'
			})
		);
        
        $('#loginScreen form input[name=csrf_key]').val(data.csrf_key);
        $('#loginScreen form input[name=csrf_secret]').val(data.csrf_secret);
        
		$submit.slideDown();
	});
});