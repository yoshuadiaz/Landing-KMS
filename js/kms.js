function menuInvocador(){$("nav > ul").toggleClass("fadeInLeft activo")}function LightSesionIn(){$("#loginContent").addClass("activo"),$("#loginScreen .contenidoLight").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){console.log("Animacion terminada entrar")}),$("#loginScreen").addClass("activo"),$("#loginScreen .contenidoLight").addClass("animated bounceIn")}function SoftwareIn(){$("#softwareContent").addClass("activo"),$("#loginScreen .contenidoLight").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){console.log("Animacion terminada entrar")}),$("#loginScreen").addClass("activo"),$("#loginScreen .contenidoLight").addClass("animated bounceIn")}function cerrarLight(){$("#loginScreen .contenidoLight").removeClass("bounceIn"),$("#loginScreen .contenidoLight").addClass("fadeOutDown"),$("#loginScreen .contenidoLight").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){console.log("Animacion terminada para salir"),$("#loginScreen").removeClass("activo"),$("#loginScreen .contenidoLight").removeClass("animated fadeOutDown"),$("#loginContent, #softwareContent").removeClass("activo")})}$(document).ready(function(){$("header .IniciarSesion").click(LightSesionIn),$("header .Software").click(SoftwareIn),$("#loginScreen .fondolight").click(cerrarLight),$(".menuInvocador").click(menuInvocador),"#loginfailed"==location.hash?($("#loginScreen .failed").fadeIn(),LightSesionIn()):"#login"==location.hash&&LightSesionIn();var n=$("#loginScreen form input[type=submit]");n.slideUp(0),$.getJSON("login.php",{g:"csrf"},function(o){$("#loginScreen form input[name=csrf_key]").val(o.csrf_key),$("#loginScreen form input[name=csrf_secret]").val(o.csrf_secret),n.slideDown()})});