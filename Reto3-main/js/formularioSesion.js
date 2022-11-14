const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

//  clase usuario 
class UsuarioActivo {
	constructor(email, password) {
		this.email = email;
		this.password = password;
	}
}
// devuelve valor de campo pasado como parameter
function getUsuarioFurmulario(campo){
	return document.getElementById(campo).value;	
}
// devuelve usuario y contraseña  de almacedos en localStorage
function getUserLocalStorage() {
	return new UsuarioActivo(
		localStorage.getItem('correo'),
		localStorage.getItem('password')
	);
}

// expresiones regulares dentro de array
const expresiones = 
{
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	password: /^.{4,12}$/, 
}

// comprobar los campos de inicio sesion que esten correctos
const validarFormulario = (e) => 
{
	switch (e.target.name) {
	
        case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;

		case "password":
			validarCampo(expresiones.password, e.target, 'password');
		break;		
	}
}
// alterar color de los campos comprobando si han complido la validacion 
const validarCampo = (expresion, input, campo) => 
{
	if(expresion.test(input.value))
	{
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campo[campo] = true;
	} else 
	{
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campo[campo] = false;
	}
}

inputs.forEach((input) => 
{
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => 
{
	e.preventDefault();
	
	usuarioActivo = getUserLocalStorage();
	if 
	(
		getUsuarioFurmulario('correo')   == usuarioActivo.email &&
		getUsuarioFurmulario('password') ==  usuarioActivo.password
	)  

	{
       window.location.href = "Index.html";
		
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
			setTimeout(() => 
			{
				document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
			}, 50000);

			document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => 
			{
				icono.classList.remove('formulario__grupo-correcto');
			});
		
		}else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        }

});















