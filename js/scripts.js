//* ====== Elementos DOM ====== *//

const endPointUrl = 'https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/jonathanhernandez/';

addEventListener('DOMContentLoaded', pedir);

//* ====== GET ====== *//
function pedir() {
	fetch(endPointUrl)
		.then((response) => response.json())
		.then((data) => {
			let row = '';
			data.forEach((element) => {
				row +=
					'<tr><td>' +
					element._id +
					'</td> <td>' +
					element.nombre +
					'</td><td>' +
					element.edad +
					'</td></tr>';
			});

			document.querySelector('#tabla').innerHTML = row;
		});
}
//* ====== POST ====== *//

const btnPost = document.querySelector('#btnPost');

btnPost.addEventListener('click', enviar);

function enviar() {
	let name = document.querySelector('#nombre').value;
	let age = document.querySelector('#edad').value;
	fetch(endPointUrl, {
		headers: { 'Content-Type': 'application/json' },
		method: 'POST',
		body: JSON.stringify({
			nombre: name,
			edad: age,
		}),
	})
		.then((response) => response.json())
		.then((date) => {
			document.querySelector('#nombre').value = '';
			document.querySelector('#edad').value = '';
			pedir();
		});
}

//* ====== PUT ====== *//

const btnPut = document.querySelector('#btnPut');

btnPut.addEventListener('click', actualizar);

function actualizar() {
	let name = document.querySelector('#nombre').value;
	let age = document.querySelector('#edad').value;
	let id = document.querySelector('#id').value;
	fetch(endPointUrl + id, {
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
		method: 'PUT',
		body: JSON.stringify({
			nombre: name,
			edad: age,
		}),
	}).then((response) => {
		document.querySelector('#nombre').value = '';
		document.querySelector('#edad').value = '';
		document.querySelector('#id').value = '';
		pedir();
	});
}

//* ====== DELETE ====== *//

const btnDelete = document.querySelector('#btnDelete');

btnDelete.addEventListener('click', borrar);

function borrar() {
	let id = document.querySelector('#id').value;
	fetch(endPointUrl + id, {
		method: 'DELETE',
	})
		.then((response) => {
			if (response.ok) {
				pedir();
				document.querySelector('#id').value = '';
			}
		})

		.catch((error) => alert('ID incorrecto!'));
}
