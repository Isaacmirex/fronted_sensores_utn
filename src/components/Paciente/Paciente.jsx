import React, { useState, useEffect } from "react";
import axios from 'axios';

const Paciente = () => {
  const [pacientes, setPacientes] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [datos, setDatos] = useState({
    usr_id: 1,
    usr_edad: 23,
    usr_peso: 63.0,
    usr_altura: 167.0,
    usr_genero: "M",
    usr_hijos: 0,
    usr_vive_solo: 0,
    usr_facultad: "FICA",
    usr_trabaja: 0,
    usr_estres: 20
  });
  const [searchId, setSearchId] = useState("");

  const fetchData = () => {
    // Llamada a la API para obtener la lista de pacientes
    axios.get('https://web-production-8f98.up.railway.app/api/usuarios/')
      .then(response => {
        setPacientes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener pacientes:', error.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []); // Se ejecuta solo una vez al cargar el componente

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setDatos({
      ...datos,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDialog(true);
  };

  const handleConfirmation = () => {
    axios.post('https://web-production-8f98.up.railway.app/api/usuarios/', datos)
      .then(response => {
        console.log('Datos enviados:', response.data);
        setShowDialog(false);
        fetchData(); // Actualizar la lista de pacientes después de agregar uno nuevo
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  };

  const handleSearch = () => {
    // Realizar búsqueda por ID
    if (searchId !== "") {
      axios.get(`https://web-production-8f98.up.railway.app/api/usuarios/${searchId}`)
        .then(response => {
          setPacientes([response.data]); // Mostrar solo el paciente encontrado
        })
        .catch(error => {
          console.error('Error al buscar paciente:', error.message);
        });
    } else {
      fetchData(); // Si no se proporciona un ID, cargar todos los pacientes
    }
  };

  return (
    <div className="home-container" style={{backgroundImage: "url('https://images.pexels.com/photos/7176325/pexels-photo-7176325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"}}>
      <div className="content">
        <h1 className="text-3xl font-bold mb-4 text-center">Paciente</h1>
        <div className="flex justify-center">
          <input
            type="number"
            placeholder="Buscar por ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="form-input mr-4"
          />
          <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">Buscar</button>
        </div>
        <Formulario datos={datos} setDatos={setDatos} handleChange={handleChange} handleSubmit={handleSubmit} />
        {showDialog && (
          <Dialog handleConfirmation={handleConfirmation} setShowDialog={setShowDialog} />
        )}
        <TablaPacientes pacientes={pacientes} fetchData={fetchData} />
      </div>
      <footer className="text-center text-sm bg-gray-800 text-white py-2">
        <p>Desarrollado por Isaac Romero - 2024</p>
      </footer>
    </div>
  );
};

const Formulario = ({ datos, setDatos, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg bg-white p-6 rounded-lg shadow-md mt-8">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">
            Edad:
            <input
              type="number"
              name="usr_edad"
              value={datos.usr_edad}
              onChange={handleChange}
              className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          {/* Agregar más campos del formulario aquí */}
        </div>
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4 shadow-md">Enviar</button>
    </form>
  );
};

const Dialog = ({ handleConfirmation, setShowDialog }) => {
  const handleConfirm = () => {
    handleConfirmation();
  };

  const handleClose = () => {
    setShowDialog(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p>¿Está de acuerdo con las normas y contrato de la toma de estrés?</p>
        <div className="flex justify-end mt-4">
          <button onClick={handleClose} className="mr-2 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md">No</button>
          <button onClick={handleConfirm} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">Sí</button>
        </div>
      </div>
    </div>
  );
};

const TablaPacientes = ({ pacientes, fetchData }) => {
  const handleDelete = (id) => {
    // Lógica para eliminar un paciente por su ID
    axios.delete(`https://web-production-8f98.up.railway.app/api/usuarios/${id}`)
      .then(() => {
        fetchData(); // Actualizar la lista de pacientes después de eliminar uno
      })
      .catch(error => {
        console.error('Error al eliminar paciente:', error.message);
      });
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Lista de Pacientes</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>Edad</th>
            <th>Peso</th>
            <th>Altura</th>
            <th>Género</th>
            <th>Número de Hijos</th>
            <th>Vive Solo</th>
            <th>Facultad</th>
            <th>Trabaja</th>
            <th>Nivel de Estrés</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map(paciente => (
            <tr key={paciente.id}>
              <td>{paciente.usr_id}</td>
              <td>{paciente.usr_edad}</td>
              <td>{paciente.usr_peso}</td>
              <td>{paciente.usr_altura}</td>
              <td>{paciente.usr_genero}</td>
              <td>{paciente.usr_hijos}</td>
              <td>{paciente.usr_vive_solo ? 'Sí' : 'No'}</td>
              <td>{paciente.usr_facultad}</td>
              <td>{paciente.usr_trabaja ? 'Sí' : 'No'}</td>
              <td>{paciente.usr_estres}</td>
              <td>
                <button onClick={() => handleDelete(paciente.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md mr-2">Eliminar</button>
                {/* Agregar botones para editar u otras acciones aquí */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Paciente;
