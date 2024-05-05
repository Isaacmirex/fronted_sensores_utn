import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const SignosVitales = () => {
    const url = 'https://web-production-8f98.up.railway.app/api/sensores/';
    const [sensores, setSensores] = useState([]); 
    const [sen_id, setSen_id] = useState('');
    const [senEmg, setSenEmg] = useState('');
    const [senTemperatura, setSenTemperatura] = useState('');
    const [senFreqRespiratoria, setSenFreqRespiratoria] = useState('');
    const [senFreqCardiaca, setSenFreqCardiaca] = useState('');
    const [usr, setUsr] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [sensorToEdit, setSensorToEdit] = useState(null);

    useEffect(() => {
        cargarSensores();
    }, []);

    const cargarSensores = async () => {
        try {
            const response = await axios.get(url);
            console.log('Datos recibidos del servidor:', response.data);
            setSensores(response.data);
        } catch (error) {
            console.error('Error al cargar los sensores:', error);
        }
    };

    const enviarSolicitud = async () => {
        const parametros = {
            sen_id: sen_id,
            sen_emg: senEmg,
            sen_temperatura: senTemperatura,
            sen_freq_respiratoria: senFreqRespiratoria,
            sen_freq_cardiaca: senFreqCardiaca,
            usr: usr
        };

        try {
            const response = await axios.post(url, parametros);
            const tipo = response.data[0];
            const msj = response.data[1];
            show_alerta(msj, tipo);
            cargarSensores();
        } catch (error) {
            show_alerta('Error en la solicitud', 'error');
            console.error('Error al enviar la solicitud:', error);
        }
    };

    const actualizarSensor = async () => {
        const parametros = {
            sen_id: sensorToEdit.sen_id,
            sen_emg: senEmg,
            sen_temperatura: senTemperatura,
            sen_freq_respiratoria: senFreqRespiratoria,
            sen_freq_cardiaca: senFreqCardiaca,
            usr: usr
        };

        try {
            const response = await axios.put(`${url}${sensorToEdit.sen_id}`, parametros);
            const tipo = response.data[0];
            const msj = response.data[1];
            show_alerta(msj, tipo);
            cargarSensores();
            setEditModalOpen(false);
        } catch (error) {
            show_alerta('Error al actualizar el sensor', 'error');
            console.error('Error al actualizar el sensor:', error);
        }
    };

    const eliminarSensor = async (sensorId) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`${url}${sensorId}`);
                const tipo = response.data[0];
                const msj = response.data[1];
                show_alerta(msj, tipo);
                cargarSensores();
            } catch (error) {
                show_alerta('Error al eliminar el sensor', 'error');
                console.error('Error al eliminar el sensor:', error);
            }
        }
    };

    const show_alerta = (message, type) => {
        Swal.fire({
            text: message,
            icon: type
        });
    };

    const handleEditClick = (sensor) => {
        setSensorToEdit(sensor);
        setSenEmg(sensor.sen_emg);
        setSenTemperatura(sensor.sen_temperatura);
        setSenFreqRespiratoria(sensor.sen_freq_respiratoria);
        setSenFreqCardiaca(sensor.sen_freq_cardiaca);
        setEditModalOpen(true);
    };

    return (
        <div>
            <h1>Signos Vitales</h1>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <button className='btn btn-primary' onClick={() => setModalOpen(true)}>Añadir Sensor</button>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>EMG</th>
                                    <th>Temperatura</th>
                                    <th>Frecuencia Respiratoria</th>
                                    <th>Frecuencia Cardíaca</th>
                                    <th>Operaciones</th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {sensores.map((sensor, index) => (
                                    <tr key={index}>
                                        <td>{sensor.sen_id}</td>
                                        <td>{sensor.sen_emg}</td>
                                        <td>{sensor.sen_temperatura}</td>
                                        <td>{sensor.sen_freq_respiratoria}</td>
                                        <td>{sensor.sen_freq_cardiaca}</td>
                                        <td>
                                            <button className='btn btn-primary btn-sm mr-2' onClick={() => handleEditClick(sensor)}>Editar</button>
                                            <button className='btn btn-danger btn-sm' onClick={() => eliminarSensor(sensor.sen_id)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {modalOpen && (
                <div className='modal' tabIndex='-1' role='dialog' style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className='modal-dialog' role='document'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>Añadir Sensor</h5>
                                <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={() => setModalOpen(false)}>
                                    <span aria-hidden='true'>&times;</span>
                                </button>
                            </div>
                            <div className='modal-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>ID:</label>
                                        <input type='text' className='form-control' value={sen_id} onChange={e => setSen_id(e.target.value)} placeholder='Ingrese el ID del sensor' />
                                    </div>
                                    <div className='form-group'>
                                        <label>EMG:</label>
                                        <input type='text' className='form-control' value={senEmg} onChange={e => setSenEmg(e.target.value)} placeholder='Ingrese el valor de EMG' />
                                    </div>
                                    <div className='form-group'>
                                        <label>Temperatura:</label>
                                        <input type='text' className='form-control' value={senTemperatura} onChange={e => setSenTemperatura(e.target.value)} placeholder='Ingrese la temperatura' />
                                    </div>
                                    <div className='form-group'>
                                        <label>Frecuencia Respiratoria:</label>
                                        <input type='text' className='form-control' value={senFreqRespiratoria} onChange={e => setSenFreqRespiratoria(e.target.value)} placeholder='Ingrese la frecuencia respiratoria' />
                                    </div>
                                    <div className='form-group'>
                                        <label>Frecuencia Cardíaca:</label>
                                        <input type='text' className='form-control' value={senFreqCardiaca} onChange={e => setSenFreqCardiaca(e.target.value)} placeholder='Ingrese la frecuencia cardíaca' />
                                    </div>
                                </form>
                            </div>
                            <div className='modal-footer'>
                                <button type='button' className='btn btn-secondary' data-dismiss='modal' onClick={() => setModalOpen(false)}>Cerrar</button>
                                <button type='button' className='btn btn-primary' onClick={enviarSolicitud}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {editModalOpen && (
                <div className='modal' tabIndex='-1' role='dialog' style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className='modal-dialog' role='document'>
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>Editar Sensor</h5>
                                <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={() => setEditModalOpen(false)}>
                                    <span aria-hidden='true'>&times;</span>
                                </button>
                            </div>
                            <div className='modal-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>ID:</label>
                                        <input type='text' className='form-control' value={sensorToEdit?.sen_id} disabled />
                                    </div>
                                    <div className='form-group'>
                                        <label>EMG:</label>
                                        <input type='text' className='form-control' value={senEmg} onChange={e => setSenEmg(e.target.value)} placeholder='Ingrese el valor de EMG' />
                                    </div>
                                    <div className='form-group'>
                                        <label>Temperatura:</label>
                                        <input type='text' className='form-control' value={senTemperatura} onChange={e => setSenTemperatura(e.target.value)} placeholder='Ingrese la temperatura' />
                                    </div>
                                    <div className='form-group'>
                                        <label>Frecuencia Respiratoria:</label>
                                        <input type='text' className='form-control' value={senFreqRespiratoria} onChange={e => setSenFreqRespiratoria(e.target.value)} placeholder='Ingrese la frecuencia respiratoria' />
                                    </div>
                                    <div className='form-group'>
                                        <label>Frecuencia Cardíaca:</label>
                                        <input type='text' className='form-control' value={senFreqCardiaca} onChange={e => setSenFreqCardiaca(e.target.value)} placeholder='Ingrese la frecuencia cardíaca' />
                                    </div>
                                </form>
                            </div>
                            <div className='modal-footer'>
                                <button type='button' className='btn btn-secondary' data-dismiss='modal' onClick={() => setEditModalOpen(false)}>Cerrar</button>
                                <button type='button' className='btn btn-primary' onClick={actualizarSensor}>Actualizar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignosVitales;