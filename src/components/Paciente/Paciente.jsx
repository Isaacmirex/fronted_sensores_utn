import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import withReactContent from 'sweetalert2';
import { show_alerta } from './Functions';

const Paciente = () => {
  const url = 'https://web-production-8f98.up.railway.app/api/usuarios/';
  const [pacientes, setPacientes] = useState([]);
  const [usr_id, setId] = useState('');
  const [usr_edad, setEdad] = useState('');
  const [usr_peso, setPeso] = useState('');
  const [usr_altura, setAltura] = useState('');
  const [usr_genero, setGenero] = useState('');
  const [usr_hijos, setHijos] = useState('');
  const [usr_vive_solo, setViveSolo] = useState('');
  const [usr_facultad, setFacultad] = useState('');
  const [usr_trabaja, setTrabaja] = useState('');
  const [usr_estres, setEstres] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [patientsPerPage] = useState(7); // Cambiado a 7

  useEffect(() => {
    getPacientes();
  }, []);

  const getPacientes = async () => {
    try {
      const respuesta = await axios.get(url);
      setPacientes(respuesta.data);
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
    }
  };

  const handleGuardar = async () => {
    const nuevoPaciente = {
      usr_id,
      usr_edad,
      usr_peso,
      usr_altura,
      usr_genero,
      usr_hijos,
      usr_vive_solo,
      usr_facultad,
      usr_trabaja,
      usr_estres
    };

    try {
      const respuesta = await axios.post(url, nuevoPaciente);
      setPacientes([...pacientes, respuesta.data]);
      setId('');
      setEdad('');
      setPeso('');
      setAltura('');
      setGenero('');
      setHijos('');
      setViveSolo('');
      setFacultad('');
      setTrabaja('');
      setEstres('');
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Paciente agregado correctamente'
      });
    } catch (error) {
      console.error('Error al guardar paciente:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al guardar el paciente'
      });
    }
  };

  const deletePaciente = (id) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Seguro que quieres eliminar al paciente " + id + "?",
      icon: 'question',
      text: 'No se podrá recuperar lo eliminado',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        enviarSolicitud('DELETE', { id: id });
      } else {
        show_alerta('El paciente NO fue eliminado', 'info');
      }
    });
  };

  const enviarSolicitud = async (metodo, parametros) => {
    try {
      await axios({ method: metodo, url: url, data: parametros });
      show_alerta('Paciente eliminado correctamente', 'success');
      getPacientes();
    } catch (error) {
      show_alerta('Error en la solicitud', 'error');
      console.log(error);
    }
  };

  const openModal = (op, id, edad, peso, altura, genero, hijos, vive_solo, facultad, trabaja, estres) => {
    setId('');
    setEdad('');
    setPeso('');
    setAltura('');
    setGenero('');
    setHijos('');
    setViveSolo('');
    setFacultad('');
    setTrabaja('');
    setEstres('');
    if (op === 1) {
      setModalTitle('Registrar Paciente');
    } else if (op === 2) {
      setModalTitle('Editar Paciente');
      setId(id);
      setEdad(edad);
      setPeso(peso);
      setAltura(altura);
      setGenero(genero);
      setHijos(hijos);
      setViveSolo(vive_solo);
      setFacultad(facultad);
      setTrabaja(trabaja);
      setEstres(estres);
    }
    window.setTimeout(function () {
      document.getElementById('id').focus();
    }, 500)
  };

  // Get current patients
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = pacientes.slice(indexOfFirstPatient, indexOfLastPatient);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>Hola Mundo</h1>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-grid mx-auto'>
              <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalPacientes'>
                <i className='fas fa-plus-circle'></i> Añadir
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='modal fade' id='modalPacientes'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{modalTitle}</h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='form-group'>
                  <label htmlFor='usr_id'>ID</label>
                  <input id='usr_id' type='text' className='form-control' value={usr_id} onChange={e => setId(e.target.value)} placeholder='ID' />
                </div>
                <div className='form-group'>
                  <label htmlFor='usr_edad'>Edad</label>
                  <input id='usr_edad' type='text' className='form-control' value={usr_edad} onChange={e => setEdad(e.target.value)} placeholder='Edad' />
                </div>
                <div className='form-group'>
                  <label htmlFor='usr_peso'>Peso</label>
                  <input id='usr_peso' type='text' className='form-control' value={usr_peso} onChange={e => setPeso(e.target.value)} placeholder='Peso' />
                </div>
                <div className='form-group'>
                  <label htmlFor='usr_altura'>Altura</label>
                  <input id='usr_altura' type='text' className='form-control' value={usr_altura} onChange={e => setAltura(e.target.value)} placeholder='Altura' />
                </div>
                <div className='form-group'>
                  <label htmlFor='usr_genero'>Género</label>
                  <input id='usr_genero' type='text' className='form-control' value={usr_genero} onChange={e => setGenero(e.target.value)} placeholder='Género' />
                </div>
                <div className='form-group'>
                  <label htmlFor='usr_hijos'>Hijos</label>
                  <input id='usr_hijos' type='text' className='form-control' value={usr_hijos} onChange={e => setHijos(e.target.value)} placeholder='Hijos' />
                </div>
                <div className='form-group'>
                  <label htmlFor='usr_vive_solo'>Vive Solo</label>
                  <input id='usr_vive_solo' type='text' className='form-control' value={usr_vive_solo} onChange={e => setViveSolo(e.target.value)} placeholder='Vive Solo' />
                </div>
                <div className='form-group'>
                  <label htmlFor='usr_facultad'>Facultad</label>
                  <input id='usr_facultad' type='text' className='form-control' value={usr_facultad} onChange={e => setFacultad(e.target.value)} placeholder='Facultad' />
                </div>
                <div className='form-group'>
                  <label htmlFor='usr_trabaja'>Trabaja</label>
                  <input id='usr_trabaja' type='text' className='form-control' value={usr_trabaja} onChange={e => setTrabaja(e.target.value)} placeholder='Trabaja' />
                </div>
                <div className='form-group'>
                  <label htmlFor='usr_estres'>Estrés</label>
                  <input id='usr_estres' type='text' className='form-control' value={usr_estres} onChange={e => setEstres(e.target.value)} placeholder='Estrés' />
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
              <button type='button' className='btn btn-primary' onClick={handleGuardar}>
                <i className='fas fa-save'></i> Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-12 col-lg-8 offset-0 offset-lg-12'>
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Edad</th>
                    <th>Peso</th>
                    <th>Altura</th>
                    <th>Género</th>
                    <th>Hijos</th>
                    <th>Vive Solo</th>
                    <th>Facultad</th>
                    <th>Trabaja</th>
                    <th>Estrés</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  {currentPatients.map((paciente, id) => (
                    <tr key={id}>
                      <td>{paciente.usr_id}</td>
                      <td>{paciente.usr_edad}</td>
                      <td>{paciente.usr_peso}</td>
                      <td>{paciente.usr_altura}</td>
                      <td>{paciente.usr_genero}</td>
                      <td>{paciente.usr_hijos}</td>
                      <td>{paciente.usr_vive_solo}</td>
                      <td>{paciente.usr_facultad}</td>
                      <td>{paciente.usr_trabaja}</td>
                      <td>{paciente.usr_estres}</td>
                      <td>
                        <button onClick={() => openModal(2, paciente.id, paciente.edad, paciente.peso, paciente.altura, paciente.genero, paciente.hijos, paciente.vive_solo, paciente.facultad, paciente.trabaja, paciente.estres)} className='btn btn-warning' data-bs-toggle="modal" data-bs-target='modalPacientes'>
                          <i className='fa-solid fa-edit'></i>
                        </button>
                        &nbsp;
                        <button onClick={() => deletePaciente(paciente.id)} className='btn btn-danger'>
                          <i className='fa-solid fa-trash'></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <nav>
              <ul className='pagination'>
                {Array.from({ length: Math.ceil(pacientes.length / patientsPerPage) }, (_, i) => (
                  <li key={i} className='page-item'>
                    <button onClick={() => paginate(i + 1)} className='page-link'>
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paciente;
