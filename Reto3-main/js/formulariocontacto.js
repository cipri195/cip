// clase datos contacto
class ConsultaFormulario {
    constructor(nombre, apellido, email, telefono,select ,mensaje){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.select = select;
        this.mensaje = mensaje;
    }
    
}
// funcion validar datos del formulario 
function validar() {
 // parametros del formulario
    var todo_correcto = true;
    var error="";
    var expresion = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/;
    var email = document.getElementById('email').value;
    var telefono=   /^\d{7,14}$/
    var numero = document.getElementById('telefono').value ;

    // validacion de campos
    if (document.getElementById('textarea').value.length < 1) 
    {
        todo_correcto = false;
        error="\n Escribe tu comentario";
    }
    if (document.getElementById('select').value == '') 
    {
        todo_correcto = false;
        error="\n Selecciona un servicio";
    }

    if (!expresion.test(email)) 
    {
        todo_correcto = false;
        error="\n Vuelve a revisar los valores del email \n Tiene que tener la sintaxis de un gmail @";
    }
    if (!telefono.test(numero))
    {
        todo_correcto = false;
        error="\n Vuelve a revisar los valores del telefono \n Tiene que tener entre 7 14 numeros";
    }
    if (document.getElementById('apellidos').value.length < 3) 
    {
        todo_correcto = false;
        error="\n Vuelve a revisar los valores del apellido \n Tiene un minimo de 2 caracteres";
    }
    if (document.getElementById('nombre').value.length < 2)
    {
        todo_correcto = false;
        error="\n Vuelve a revisar los valores del nombre \n Tiene un minimo de 2 caracteres "; 
    }
    if(!todo_correcto) {
        alert('Algunos campos no están correctos, vuelva a revisarlos'+ error);
    }
    return todo_correcto;
}

// guarda los datos de contacto en objeto datos 
function getDataFormulario() 
{
    return new ConsultaFormulario(
        document.getElementById('nombre').value,
        document.getElementById('apellidos').value,
        document.getElementById('email').value, 
        document.getElementById('telefono').value,
        document.getElementById('select').value,
        document.getElementById('textarea').value
        );
}

// guarda datos contacto en localstorage y muestra ventana de confirmacion
function addToLocalStorage()
{
    if (validar()){
        const obj = getDataFormulario();
        const json = JSON.stringify(obj);
        var ver =localStorage.setItem('datos', json);   
    openWindow();  
    }
}

// ventana de confirmacion de datos 
function openWindow(){
    var ventana = window.open("contacto", "Ventana Contacto", "width=899, height=200");
    ventana.document.write("<head><title>conforme</title></head><h1>nuevos datos</h1><p>"+localStorage.getItem('datos').toString()+"</p>");
}


