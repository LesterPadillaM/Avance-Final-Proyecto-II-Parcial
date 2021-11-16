var UrlGetArticulos ='http://localhost:80/G6_20/controller/Articulos.php?op=GetArticulos';
var urlpostArticulos = 'http://localhost:80/G6_20/controller/Articulos.php?op=InsertArticulos';
var UrlGetUno = 'http://localhost:80/G6_20/controller/Articulos.php?op=GetArticulo';
var UrlPutArticulo = 'http://localhost:80/G6_20/controller/Articulos.php?op=UpdateArticulos';
var UrlDeleteArticulo = 'http://localhost:80/G6_20/controller/Articulos.php?op=DeleteArticulos';
$(document).ready(function(){
    CargarArticulos();
});

function CargarArticulos(){
    $.ajax({
        url: UrlGetArticulos,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores='';

            for(i=0; i< MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+MiItems[i].Id+'</td>'+
                '<td>'+MiItems[i].Descripcion+'</td>'+
                '<td>'+MiItems[i].Unidad+'</td>'+
                '<td>'+MiItems[i].Costo+'</td>'+
                '<td>'+MiItems[i].Precio+'</td>'+
                '<td>'+MiItems[i].Aplica_Isv+'</td>'+
                '<td>'+MiItems[i].Porcentaje_Isv+'</td>'+
                '<td>'+MiItems[i].Estado+'</td>'+
                '<td>'+MiItems[i].ID_Socio+'</td>'+   
                '<td>'+
                '<button class="btn btn-warning" onclick="GetArticulo('+MiItems[i].ID+')">Editar</button>'+
                '<button class="btn btn-danger" onclick="EliminarArticulo('+MiItems[i].ID+')">Eliminar</button>'+      
                '<td>'+  
             '</tr>';
             $('.articulos').html(Valores);
            }
        }
    });
}
function AgregarArticulo(){
    var datosArticulos={
            Descripcion: $('#Descripcion').val(),
            Unidad: $('#Unidad').val(),
            Costo: $('#Costo').val(),
            Precio: $('#Precio').val(),
            Aplica_Isv: $('#Aplica_Isv').val(),
            Porcentaje_Isv: $('#Porcentaje_Isv').val(),
            ID_Socio: $('#ID_Socio').val()
    };
    var datosArticulosjson= JSON.stringify(datosArticulos);

    $.ajax({
       url:urlpostArticulos,
       type:'POST',
       data: datosArticulosjson,
       datatype: 'JSON',
       contentType: 'application/json',
       succes: function(response){
           console.log(response);
       }
    });
    alert("Articulo Agregado");
    location.reload()
}
function GetArticulo(idArticulo){
    var datosArticulo = {
        ID: IdArticulo
        };
   var datosArticulojson=JSON.stringify(datosArticulo);
    $.ajax({
        url:UrlGetUno,
        type: 'POST',
        data: datosArticulojson,
        datatype:'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems= response;
            $('#Descripcion').val(MiItems[0].DESCRIPCION);
            $('#Unidad').val(MiItems[0].UNIDAD);
            $('#Costo').val(MiItems[0].COSTO);
            $('#Precio').val(MiItems[0].PRECIO);
            $('#Aplica_Isv').val(MiItems[0].APLICA_ISV);
            $('#Porcentaje_Isv').val(MiItems[0].PORCENTAJE_ISV);
            $('#Id_Socio').val(MiItems[0].ID_SOCIO);
            var btnactulizar='<input type="submit" id="btn_Actualizar" onclick="ActualizarArticulo('+MiItems[0].ID+')" value="Actualizar Articulo" class="btn btn-primary"></input>';
            $('.btnagregar').html(btnactulizar);
        }
   });
}
function ActualizarArticulo(idArticulo){
    var datosArticulo={
        Descripcion: $('#Descripcion').val(),
            Unidad: $('#Unidad').val(),
            Costo: $('#Costo').val(),
            Precio: $('#Precio').val(),
            Aplica_Isv: $('#Aplica_Isv').val(),
            Porcentaje_Isv: $('#Porcentaje_Isv').val(),
        Estado: 'A',
        ID_Socio: $('#ID_Socio').val(),
        ID:IdArticulo
    };
    var datosArticulojson= JSON.stringify(datosArticulo);
    $.ajax({
        url: UrlPutArticulo,
        type: 'PUT',
        data: datosArticulojson,
        datatype:'JSON',
        contentType: 'application/json',
        success:function(response){
            console.log(response);
        }
    });
    alert("Articulo Actualizado");
}
function EliminarArticulo(idArticulo){
var datosArticulo={
    ID: IdArticulo
    };
var datosArticulojson=JSON.stringify(datosArticulo);
$.ajax({
    url:UrlDeleteArticulo,
    type:'DELETE',
    data: datosArticulojson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function(response){
        console.log(response);
    }
 });
 alert("Articulo Eliminado");
 CargarArticulos();
}