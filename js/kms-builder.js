$(document).ready(function() {
	$('#fullpage').fullpage({
		menu: "#myMenu",
		anchors:["home", "comofunciona", "pulsera", "app", "contacto"],
		resize: false,
		scrollOverflow: true,
		verticalCentered: false,
		fixedElements: "#imagenCelular"
	});
});

