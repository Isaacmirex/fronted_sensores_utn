import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import './SignosVitalesCSS.css';

const SignosVitales = () => {
  const url = 'https://web-production-8f98.up.railway.app/api/sensores/';
  const [sensores, setSensores] = useState([]);
  const [sen_id, setSen_id] = useState('');
  const [sen_emg, setSenEmg] = useState('');
  const [sen_temperatura, setSenTemperatura] = useState('');
  const [sen_freq_respiratoria, setSenFreqRespiratoria] = useState('');
  const [sen_freq_cardiaca, setSenFreqCardiaca] = useState('');
  const [usr, setUsr] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sensorsPerPage] = useState(7);

  useEffect(() => {
    cargarSensores();
  }, []);

  const cargarSensores = async () => {
    try {
      const response = await axios.get(url);
      const sortedSensores = response.data.sort((a, b) => a.sen_id - b.sen_id);
      setSensores(sortedSensores);
    } catch (error) {
      console.error('Error al cargar los sensores:', error);
    }
  };

  const handleGuardar = async () => {
    const nuevoSensor = {
      sen_id,
      sen_emg,
      sen_temperatura,
      sen_freq_respiratoria,
      sen_freq_cardiaca,
      usr
    };

    console.log('Datos a enviar:', nuevoSensor); // Log de datos antes de enviar

    try {
      let response;
      if (modalTitle === 'Editar Sensor') {
        const updateUrl = `${url}${sen_id}/`; // Asegúrate de que la URL termine con una barra
        response = await axios.put(updateUrl, nuevoSensor);
        console.log('Respuesta del servidor (PUT):', response);
      } else {
        response = await axios.post(url, nuevoSensor);
        console.log('Respuesta del servidor (POST):', response);
      }

      const sortedSensores = [...sensores, response.data].sort((a, b) => a.sen_id - b.sen_id);
      setSensores(sortedSensores);
      showSuccessAlert('Sensor guardado correctamente');
      clearInputs();
      closeModal();
      cargarSensores();
    } catch (error) {
      console.error('Error al guardar sensor:', error.response ? error.response.data : error.message);
      showErrorAlert('Hubo un error al guardar el sensor. Verifica la consola para más detalles.');
    }
  };

  const closeModal = () => {
    const modalElement = document.getElementById('modalSensores');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);

    if (modalInstance) {
      modalInstance.hide();
    }

    const backdropElements = document.querySelectorAll('.modal-backdrop');
    backdropElements.forEach(backdrop => {
      backdrop.remove();
    });

    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  const deleteSensor = (id) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: `¿Seguro que quieres eliminar el sensor ${id}?`,
      icon: 'question',
      text: 'No se podrá recuperar lo eliminado',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteUrl = `${url}${id}/`; // Asegúrate de que la URL termine con una barra
        enviarSolicitud('DELETE', deleteUrl);
      } else {
        //show_alerta('El sensor NO fue eliminado', 'info');
      }
    });
  };

  const enviarSolicitud = async (metodo, url) => {
    try {
      await axios({ method: metodo, url: url });
      showSuccessAlert('Sensor eliminado correctamente');
      cargarSensores();
    } catch (error) {
      showErrorAlert('Error en la solicitud');
      console.log(error.response ? error.response.data : error.message);
    }
  };

  const openModal = (op, id, emg, temperatura, freq_respiratoria, freq_cardiaca, usuario) => {
    clearInputs();
    if (op === 1) {
      setModalTitle('Registrar Sensor');
    } else if (op === 2) {
      setModalTitle('Editar Sensor');
      setSen_id(id ?? '');
      setSenEmg(emg ?? '');
      setSenTemperatura(temperatura ?? '');
      setSenFreqRespiratoria(freq_respiratoria ?? '');
      setSenFreqCardiaca(freq_cardiaca ?? '');
      setUsr(usuario ?? '');
    }
    window.setTimeout(function () {
      document.getElementById('sen_id').focus();
    }, 500);
  };

  const clearInputs = () => {
    setSen_id('');
    setSenEmg('');
    setSenTemperatura('');
    setSenFreqRespiratoria('');
    setSenFreqCardiaca('');
    setUsr('');
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: message
    }).then(() => {
      closeModal();
    });
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message
    });
  };

  const indexOfLastSensor = currentPage * sensorsPerPage;
  const indexOfFirstSensor = indexOfLastSensor - sensorsPerPage;
  const currentSensors = sensores.slice(indexOfFirstSensor, indexOfLastSensor);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>Signos Vitales</h1>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-md-4 offset-md-4'>
            <div className='d-grid mx-auto'>
              <button className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalSensores' onClick={() => openModal(1)}>
                <i className='fas fa-plus-circle'></i> Añadir
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='modal fade' id='modalSensores'>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{modalTitle}</h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close' onClick={closeModal}></button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='form-group'>
                  <label htmlFor='sen_id'>ID</label>
                  <input id='sen_id' type='text' className='form-control' value={sen_id} onChange={e => setSen_id(e.target.value)} placeholder='ID' />
                </div>
                <div className='form-group'>
                  <label htmlFor='sen_emg'>EMG</label>
                  <input id='sen_emg' type='text' className='form-control' value={sen_emg} onChange={e => setSenEmg(e.target.value)} placeholder='EMG' />
                </div>
                <div className='form-group'>
                  <label htmlFor='sen_temperatura'>Temperatura</label>
                  <input id='sen_temperatura' type='text' className='form-control' value={sen_temperatura} onChange={e => setSenTemperatura(e.target.value)} placeholder='Temperatura' />
                </div>
                <div className='form-group'>
                  <label htmlFor='sen_freq_respiratoria'>Frecuencia Respiratoria</label>
                  <input id='sen_freq_respiratoria' type='text' className='form-control' value={sen_freq_respiratoria} onChange={e => setSenFreqRespiratoria(e.target.value)} placeholder='Frecuencia Respiratoria' />
                </div>
                <div className='form-group'>
                  <label htmlFor='sen_freq_cardiaca'>Frecuencia Cardíaca</label>
                  <input id='sen_freq_cardiaca' type='text' className='form-control' value={sen_freq_cardiaca} onChange={e => setSenFreqCardiaca(e.target.value)} placeholder='Frecuencia Cardíaca' />
                </div>
                <div className='form-group'>
                  <label htmlFor='usr'>Usuario</label>
                  <input id='usr' type='text' className='form-control' value={usr} onChange={e => setUsr(e.target.value)} placeholder='Usuario' />
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal' onClick={closeModal}>Cerrar</button>
              <button type='button' className='btn btn-primary' onClick={handleGuardar}>
                <i className='fas fa-save'></i> Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
            <div className='table-responsive'>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>EMG</th>
                    <th>Temperatura</th>
                    <th>Frecuencia Respiratoria</th>
                    <th>Frecuencia Cardíaca</th>
                    <th>Usuario</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody className='table-group-divider'>
                  {currentSensors.map((sensor, index) => (
                    <tr key={index}>
                      <td>{sensor.sen_id}</td>
                      <td>{sensor.sen_emg}</td>
                      <td>{sensor.sen_temperatura}</td>
                      <td>{sensor.sen_freq_respiratoria}</td>
                      <td>{sensor.sen_freq_cardiaca}</td>
                      <td>{sensor.usr}</td>
                      <td>
                        <button onClick={() => openModal(2, sensor.sen_id, sensor.sen_emg, sensor.sen_temperatura, sensor.sen_freq_respiratoria, sensor.sen_freq_cardiaca, sensor.usr)} className='btn btn-warning' data-bs-toggle="modal" data-bs-target='#modalSensores'>
                          <i className='fa-solid fa-edit'></i>
                        </button>
                        <button onClick={() => deleteSensor(sensor.sen_id)} className='btn btn-danger'>
                          <i className='fa-solid fa-trash'></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <nav>
              <ul className='pagination'>
                {Array.from({ length: Math.ceil(sensores.length / sensorsPerPage) }, (_, i) => (
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
      <footer>
        <p>Desarrollado por Isaac Romero - 2024</p>
      </footer>
    </div>
  );
};

export default SignosVitales;
