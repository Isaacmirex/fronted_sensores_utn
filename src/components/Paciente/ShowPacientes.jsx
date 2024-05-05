import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Paciente from './Paciente';
import { show_alerta } from '../SignosVitales/Functions';
import { Result } from 'postcss';
// import { show_alerta } from './functions';
const ShowPacientes = () => {
    const url = 'https://web-production-8f98.up.railway.app/api/usuarios/';
    const [pacientes, setPacientes] = useState([]);
    const [id, setId] = useState('');
    const [edad, setEdad] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [genero, setGenero] = useState('');
    const [hijos, setHijos] = useState('');
    const [vive_solo, setViveSolo] = useState('');
    const [facultad, setFacultad] = useState('');
    const [trabaja, setTrabaja] = useState('');
    const [estres, setEstres] = useState('');
    const [operation,setOperation]= useState(1);
    useEffect(() => {
        getPacientes();
    }, [])
    const getPacientes = async () => {
        const respuesta = await axios.get(url);
        setPacientes(respuesta.data);
    }
    const openModal= (op,id,edad,peso,altura,genero,hijos,vive_solo,facultad,trabaja,estres)=>{
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
        setOperation(op);
        if(op==1){
         setTitle('Registrar Paciente');
        }else if(op==2){

            setTitle('Editar Paciente');
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
        window.setTimeout(function(){
            document.getElementById('id').focus();
        },500)

    };
    const validar = () => {
        // var parametros;
        // var metodo;
        // if (edad.trim() == ''){
        //     show_alerta('No se ingreso edad',warning);
        // } 
        //Asi con todos
        if(operation == 1){
            parametros  = {edad: edad, peso: peso, altura: altura, genero:genero.trim(), hijos: hijos, vive_solo : vive_solo, facultad: facultad.trim(), estres: estres}
             metodo = 'POST';
        }else{
            parametros  = {id:id,edad: edad, peso: peso, altura: altura, genero:genero.trim(), hijos: hijos, vive_solo : vive_solo, facultad: facultad.trim(), estres: estres}
            metodo = 'PUT';
        }
        enviarSolicitud(metodo,parametros);
    };
    const enviarSolicitud = async(metodo,parametros) =>{
        await axios({ method:metodo,url:url,data:parametros }).then(function(respuesta){
            var tipo = respuesta.data[0];
            var msj = respuesta.data[1];
            show_alerta(msj,tipo);
            if (tipo === 'succes') {
                document.getElementById('btnCerrar').click();
                getPacientes();
            }
        }).catch(function(error){
            show_alerta('Error en la solicutud','error');
            console.log(error);
        })
};
const deletePaciente = (id)=>{
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title:"Seguro quieres eliminar al paciente"+id+'?',
        icon:'question',text:'No se podra recuperar lo eliminado',
        showCancelButton:true,confirmButtonText:'Si,elminar',cancelButtonText:'Cancelar'
    }).then((result)=>{
        if (result.isConfirmed) {
            setId(id);
            enviarSolicitud('DELETE',{id:id});   
        }else{
            show_alerta('El paciente NO fue eleminido','info');
        }
    });
}
    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='d-grid mx-auto'></div>
                        <button onclick={()=> openModal(1)}className='btn btn-dark' data-bs-toggle='modal' data-bs-target='modalPacientes'>
                            <i className='fa-soild fa-cicle-plus'></i> Añadir
                        </button>

                    </div>
                </div>

            </div>
            <div className='row mt-3'>
                <div className='col-12 col-lg-8 offset-0 offset-lg-12'>
                    <div className='table-responsive'>
                        <table className='table table-bordered'>
                            <thead>
                                <tr><th>No</th><th>EDAD</th><th>PESO</th><th>ALTURA</th>
                                    <tr>GENERO</tr><tr>HIJOS</tr><tr>VIVE SOLO</tr><tr>FACULTAD</tr>
                                    <tr>TRABAJA</tr><tr>ESTRÉS</tr>
                                </tr>
                            </thead>
                            <tbody className='table-grup-divider'></tbody>
                            {
                                pacientes.map((pacientes, id) => {
                                    <tr key={pacientes.id}>
                                        <td>[paciente.id]</td>
                                        <td>$[paciente.edad]</td>{/* entero*/}
                                        <td>$[paciente.peso]</td> {/* desimal*/}
                                        <td>$[ paciente.altura]</td>{/* desimal*/}
                                        <td>[paciente.genero]</td>{/* Si es es M es masulino si es F es femenido si es N es neutral*/}
                                        <td>$[paciente.hijos]</td>{/* Tiene hijos , 0 no y 1 es si*/}
                                        <td>[paciente.vive_solo]</td>{/* vive solo, 0 no y 1 es si*/}
                                        <td>[paciente.facultad]</td>
                                        <td>$[paciente.trabaja]</td>{/* Trabaja , 0 es no 1 es si */}
                                        <td>$[ paciente.Estres]</td>{/* por defecto es 0% no puede ingresar el usuario esto*/}
                                        <td>
                                            <button onClick={()=> openModal(2,pacientes.id,pacientes.edad,pacientes.peso,pacientes.altura,pacientes.genero,pacientes.hijos,pacientes.vive_solo,pacientes.facultad,pacientes.trabaja,pacientes.estres)} className='btn btn-warning' data-bs-toggle="modal" data-bs-target='modalPacientes' >
                                                <i className='fa-solid fa edit'></i>
                                                &nbsp;
                                                <button onclick={()=>deletePaciente(pacientes.id)} className='btn btn-danger'>
                                                    <i className='fa-solid fa-trash'></i>
                                                </button>


                                            </button>
                                        </td>



                                    </tr>
                                })
                            }
                        </table>
                    </div>
                </div>


            </div>
            <div id='modalPacientes' className='modal fade' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'></div>
                    <div className='modal-header'>
                        <label className='h5'>{title}</label>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' arial-label='close'></button>
                    </div>
                    <div className='modal-body'>
                          <input type="hidden" id='id' />
                          <div className='input-grup mb-3'>
                            <span className='input-grup-tex' ><i className='fa-solid fa-gif'></i></span>
                            <input type="text" id='id' className='form-control' placeholder='usr_id'  value={id} onChange={(e)=> setId(e.target.value)}/>
                            <span className='input-grup-tex' ><i className='fa-solid fa-gif'></i></span>
                            <input type="int" id='edad' className='form-control' placeholder='Edad'  value={edad} onChange={(e)=> setEdad(e.target.value)}/>
                            <span className='input-grup-tex' ><i className='fa-solid fa-gif'></i></span>
                            <input type="float" id='peso' className='form-control' placeholder='Peso'  value={peso} onChange={(e)=> setPeso(e.target.value)}/>
                            <span className='input-grup-tex' ><i className='fa-solid fa-gif'></i></span>
                            <input type="float" id='altura' className='form-control' placeholder='Altura'  value={altura} onChange={(e)=> setAltura(e.target.value)}/>
                            <span className='input-grup-tex' ><i className='fa-solid fa-gif'></i></span>
                            <input type="text" id='genero' className='form-control' placeholder='Genero'  value={genero} onChange={(e)=> setGenero(e.target.value)}/>
                            <span className='input-grup-tex' ><i className='fa-solid fa-gif'></i></span>
                            <input type="int" id='hijos' className='form-control' placeholder='Hijos'  value={hijos} onChange={(e)=> setHijos(e.target.value)}/>
                            <span className='input-grup-tex' ><i className='fa-solid fa-gif'></i></span>
                            <input type="int" id='vive_solo' className='form-control' placeholder='Vive Solo'  value={vive_solo} onChange={(e)=> setViveSolo(e.target.value)}/>
                            <span className='input-grup-tex' ><i className='fa-solid fa-gif'></i></span>
                            <input type="text" id='facultad' className='form-control' placeholder='Facultad'  value={facultad} onChange={(e)=> setFacultad(e.target.value)}/>
                            <span className='input-grup-tex' ><i className='fa-solid fa-gif'></i></span>
                            <input type="int" id='trabaja' className='form-control' placeholder='Trabaja'  value={trabaja} onChange={(e)=> setTrabaja(e.target.value)}/>
                            <span className='input-grup-tex' ><i className='fa-solid fa-gif'></i></span>
                            <input type="int" id='estres' className='form-control' placeholder='Estres'  value={estres} onChange={(e)=> setEstres(e.target.value)}/>
                            </div> 
                            <div className='d-grid col-6 mx-auto'>
                                <button onclick={()=> validar()}className='btn btn-success'>
                                    <i className='fa-solid fa-floppy-disk'></i> Guardar
                                </button>
                                 </div>    
                            <div className='modal-footer'>
                            <button type='button' id='btnCerrar' className='btn btn-secondaty' data-bs-dismiss='modal'>cerrar</button>
                            </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ShowPacientes;
