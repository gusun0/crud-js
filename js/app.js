// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA4WUY4R23gvyQHZRqDUv36aU866YboZ9k",
    authDomain: "crud-f2dd6.firebaseapp.com",
    projectId: "crud-f2dd6",
    storageBucket: "crud-f2dd6.appspot.com",
    messagingSenderId: "108508101139",
    appId: "1:108508101139:web:624c51e199f58535b1dde6"
  };


const openModal = document.getElementById('openRegisterModal'); 
const modal = document.getElementById('modal');
const updateModal = document.getElementById('modal-update');
const updateForm = document.getElementById('update-form');
const closeUpdateModal = document.getElementById('closeUpdateModal');
const closeModal = document.getElementById('closeRegisterModal');
const registerForm = document.getElementById('register-form');
let studentsTable = document.getElementById('students-table');

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/* students es la coleccion */
const studentRef = firebase.database().ref('students'); 

/* MODAL */
const showRegisterModal = () => {
	modal.classList.toggle('is-active');
};


openModal.addEventListener('click', showRegisterModal);
closeModal.addEventListener('click', showRegisterModal);


const deleteStudent = (uid) => {
	firebase.database().ref(`students/${uid}`).remove();
}

const showUpdateModal = () => {
	updateModal.classList.toggle('is-active');
}

closeUpdateModal.addEventListener('click', showUpdateModal);

/* Ingresando datos de la tabla */
window.addEventListener('DOMContentLoaded', async (e) => {
	await studentRef.on('value', (students) => {
		studentsTable.innerHTML = '';
		students.forEach((student) => {
			let studentData = student.val();

			studentsTable.innerHTML += `<tr>
			<th>1</th>
			<td>${studentData.Nombre}</td>
			<td>${studentData.Apellido_Paterno}</td>
			<td>${studentData.Apellido_Materno}</td>
			<td>${studentData.Telefono}</td>
			<td>${studentData.Correo_Electronico}</td>
			<td>
			<button class="button is-warning" data-id="${studentData.Uid}">	
			<i class="fas fa-pencil-alt"></i>
			</button>
			<button class="button is-danger" data-id="${studentData.Uid}">
			<i class="fas fa-trash"></i>
			</button>
			</td>
			</tr>
			`;

			const updateButtons = document.querySelectorAll('.is-warning');
			updateButtons.forEach((button) => {
				button.addEventListener('click', (e) => {
					showUpdateModal();
					firebase.
						database().
						ref(`students/${e.target.dataset.id}`).
						once('value').
						then((student) => {
							const data = student.val();
							updateForm['nombre'].value = data.Nombre;
							updateForm['apePat'].value = data.Apellido_Paterno;
							updateForm['apeMat'].value = data.Apellido_Materno;
							updateForm['cel'].value = data.Telefono;
							updateForm['email'].value = data.Correo_Electronico;
							updateForm['desc'].value = data.Descripcion;
						})

					const uid = e.target.dataset.id;
					updateForm.addEventListener('submit',(e) => {
						e.preventDefault();

	const nombre = updateForm['nombre'].value;
	const apellidoPaterno = updateForm['apePat'].value;
	const apellidoMaterno = updateForm['apeMat'].value;
	const telefono = updateForm['cel'].value;
	const correoElectronico = updateForm['email'].value;
	const descripcion = updateForm['desc'].value;

						firebase.database().ref(`students/${uid}`).update({
		Nombre: nombre,
		Apellido_Paterno: apellidoPaterno,
		Apellido_Materno: apellidoMaterno,
		Telefono: telefono,
		Correo_Electronico: correoElectronico,
		Descripcion: descripcion,

						});
						showUpdateModal();
						
					})


				});
			})

			const deleteButtons = document.querySelectorAll('.is-danger');
			deleteButtons.forEach((button) => {
				button.addEventListener('click', (e) => {
					deleteStudent(e.target.dataset.id);
					
				})
			})	
		})
	})
});

registerForm.addEventListener('submit', (e) => {

	e.preventDefault();

	const nombre = registerForm['nombre'].value;
	const apellidoPaterno = registerForm['apePat'].value;
	const apellidoMaterno = registerForm['apeMat'].value;
	const telefono = registerForm['cel'].value;
	const correoElectronico = registerForm['email'].value;
	const descripcion = registerForm['desc'].value;


	const registerStudent = studentRef.push();
//	console.log(e);
//	console.log(registerStudent);
//	console.log(registerStudent.path.pieces_[1]);

	
	registerStudent.set({
		Uid: registerStudent.path.pieces_[1],
		Nombre: nombre,
		Apellido_Paterno: apellidoPaterno,
		Apellido_Materno: apellidoMaterno,
		Telefono: telefono,
		Correo_Electronico: correoElectronico,
		Descripcion: descripcion,
	});


	// cerramos el modal
	showRegisterModal();
	
});

