//javascript
// funcion para obtener el valor del parametro de la url
function getGET()
	{
		// capturamos la url
		var loc = document.location.href;
		// si existe el interrogante
		if(loc.indexOf('?')>0)
		{
			// cogemos la parte de la url que hay despues del interrogante
			var getString = loc.split('?')[1];
			// obtenemos un array con cada clave=valor
			var GET = getString.split('&');
			var get = {};
			//var tmp = getString.split('=');
			//var get = tmp[1];
			// recorremos todo el array de valores
            for(var i = 0; i < GET.length; i++){
                var tmp = GET[i].split('=');
                get[tmp[0]] = unescape(decodeURI(tmp[1]));
            }
			
            return get;
		}
	}			
	
function Grupos()
{
                       
	if(navigator.connection.type == Connection.NONE  || navigator.connection.type == Connection.UNKNOWN )
	{ 

		$(document).ready(function() 
		{
			
			// Obtengo los datos del achivo .json cuando la aplicacion está sin conexión
			// Carga inicial.
			$("#"+getGET()['genero']).addClass('ui-btn-active'); // activamos el boton del menu pulsado
			$.getJSON('json/'+getGET()['genero']+'.json',function(data) {
				$.each(data, function(indice, valor) {
	
					$('#lista-grupos ul').append("<li id='"+data[indice].CodBand+"' class='filGru ui-li-has-thumb ui-first-child Loff'><a class='grupos ui-btn ui-btn-icon-right ui-icon-carat-r'  href='#' ><img class='imgGru' src='img/thumbnail_2/"+ data[indice].Imagen+"'><h2>" + data[indice].Grupo+ "</h2<p>"+data[indice].Pais+"</p></a></li>");
	
				});
			});
			
			// Cuando pulsamos el menu |rock|pop|latino|dance|rap|
			// cargamos los datos obtenidos de un archivo .json.
			$("#navbar").on( "click","a",function(e) {
				e.preventDefault();

				$id = $(this).attr("id");
				$('#lista-grupos ul li').remove();

				$.getJSON('json/'+$id+'.json',function(data) {
					$.each(data, function(indice, valor) {

						$('#lista-grupos ul').append("<li id='"+data[indice].CodBand+"' class='filGru ui-li-has-thumb ui-first-child Loff'><a class='grupos ui-btn ui-btn-icon-right ui-icon-carat-r'  href='biografia.html' ><img class='imgGru' src='img/thumbnail_2/"+ data[indice].Imagen+"'><h2>" + data[indice].Grupo+ "</h2<p>"+data[indice].Pais+"</p></a></li>");

					});
				});
			});
			
		
		});
	  
	}
	else
	{
		// Cuando la aplicacion está online ( tiene conexión a internet).  
		// Carga inicial.
		$(document).ready(function() 
		{

			$("#"+getGET()['genero']).addClass('ui-btn-active'); // activamos el boton del menu pulsado 
			$.getJSON('http://topvideomusic.es/ANDROID/grupos.php?genero='+getGET()['genero'],function(data) {
	
				$.each(data, function(indice, valor) {
	
					$('#lista-grupos ul').append("<li id='"+data[indice].CodBand+"' class='filGru ui-li-has-thumb ui-first-child'><a rel='external' class='grupos ui-btn ui-btn-icon-right ui-icon-carat-r'  href='biografia.html?banda="+data[indice].CodBand+"'><img class='imgGru' src='http://topvideomusic.es/img/grupos/thumbnail_2/"+ data[indice].Imagen+"'><h2>" + data[indice].Grupo+ "</h2<p>"+data[indice].Pais+"</p></a></li>");
	
				});
			}).fail(function() {
				$('#lista-grupos li').remove();
				$('#lista-grupos ul').append("<li style='text-align:center; color:red;'>No hay conexión a internet.</li>");
			});

			// Cuando pulsamos el menu |rock|pop|latino|dance|rap|
			// cargamos los datos obtenidos del servidor.
			$("#navbar").on( "click","a",function(e) {
				e.preventDefault();

				$id = $(this).attr("id");
				
				$('#lista-grupos ul li').remove();

				$.getJSON('http://topvideomusic.es/ANDROID/grupos.php?genero='+$id,function(data) {
					$.each(data, function(indice, valor) {
	
						$('#lista-grupos ul').append("<li id='"+data[indice].CodBand+"' class='filGru ui-li-has-thumb ui-first-child'><a rel='external' class='grupos ui-btn ui-btn-icon-right ui-icon-carat-r'  href='biografia.html?banda="+data[indice].CodBand+"'><img class='imgGru' src='http://topvideomusic.es/img/grupos/thumbnail_2/"+ data[indice].Imagen+"'><h2>" + data[indice].Grupo+ "</h2<p>"+data[indice].Pais+"</p></a></li>");
	
					});
				}).fail(function() {
					$(".ui-filterable").hide();
					$('#lista-grupos li').remove();
					$('#lista-grupos ul').append("<li style='text-align:center; color:red;'>No hay conexión a internet.</li>");
				});
			});

		  });
			  
	  }
  }
function info()
{
	$(document).ready(function() {
		$.getJSON('http://www.topvideomusic.es/ANDROID/biografia.php?banda='+getGET()['banda'],function(data) {
			$.each(data, function(indice, valor) {
				$('#biografia').append("<div id='info'>" + data[indice].Bio+ "<div>");
			});
		});
	});
	
	$(document).ready(function() {
		$.getJSON('http://www.topvideomusic.es/ANDROID/videos.php?banda='+getGET()['banda'],function(data) {
			$('#cInf').before("<h2 class='titV ui-collapsible-heading-toggle ui-btn  ui-btn-inherit'>"+data[0].Grupo+"</h2>");
			
			$.each(data, function(indice, valor) {
				$Tit = data[indice].Tit + " - " + data[indice].Grupo + " - " + data[indice].DateVid ;
				$('#videos ul').append("<li id='"+data[indice].CodBand+"' class='filGru ui-li-has-thumb ui-first-child Loff'><a rel='external' class='grupos ui-btn ui-btn-icon-right ui-icon-carat-r'  href='videos.html?CodVideo="+data[indice].CodVideo+"&Tit="+$Tit+"'><img class='imgGru' src='http://img.youtube.com/vi/"+ data[indice].Youtube+"/3.jpg'><h2>" +data[indice].Tit+"</h2<p>"+ data[indice].Grupo+"</p></a></li>");
			});
		});
	}); 

}
  	
function verVideos()
{  
	$(function() {

		$url ="http://www.topvideomusic.es/ANDROID/verVideos.php?CodVideo="+getGET()['CodVideo']+"&Tit="+getGET()['Tit']; 
		$('#videos').attr('src', $url)
		$('#videos').before("<h2 class='titV1 ui-collapsible-heading-toggle ui-btn  ui-btn-inherit'>"+getGET()['Tit']+" </h2>");
		 
	}); 
}