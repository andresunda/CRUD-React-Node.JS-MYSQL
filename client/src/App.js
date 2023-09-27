import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



function App() {

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anos, setAnos] = useState(0);
  const [id, setId] = useState(0);

  const notificacionActualizar = withReactContent(Swal) //Sweet alert
  const notificacionAgregar = withReactContent(Swal) //Sweet alert
  const notificacionEliminar = withReactContent(Swal) //Sweet alert


  //LISTA DE EMPLEADOS
  const [empleadosList, setEmpleados] = useState([]);
  //EDITAR EMPLEADOS
  const [editar, setEditarEmpleado] = useState(false);


  //==================FUNCION PARA INSERTAR LOS DATOS ================//
  const create = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anos: anos,
    }).then(() => {  //PROMESAS
      notificacionAgregar.fire({
        title: <strong>Agregado exitoso!</strong>,
        html: <i>El usuario <strong>{nombre}</strong> ha sido agregado!</i>,
        icon: 'success',
        timer: 3000
      })
      getEmpleados();
      limpiarCampos();
    });
  }
  //======================================================//

  //==========FUNCION GET PARA EXTRAER/LEER LOS EMPLEADOS========//
  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados")
      .then((response) => {   //PROMESAS
        setEmpleados(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener empleados:", error);
      });
  };
  getEmpleados();
  //===============================================//
  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anos: anos,
    }).then(() => {  //PROMESAS
      getEmpleados();
      limpiarCampos();
      notificacionActualizar.fire({
        title: <strong>Actualizado exitoso!</strong>,
        html: <i>El usuario <strong>{nombre}</strong> ha sido actualizado!</i>,
        icon: 'success',
        timer: 5000
      })
    });
  }
  //===================FUNCION BOTON PARA CANCELAR==============//
  const limpiarCampos = () => {
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnos("");
    setId("");
    setEditarEmpleado(false);
  }
  //===========================================================//
  //==========FUNCION PARA INSERTAR LOS DATOS DE LOS EMPLEADOS Y PROCEDER A EDITARLOS========//
  const editarEmpleado = (val) => {

    setEditarEmpleado(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnos(val.anos);
    setId(val.id);
  };
  //===============================================//
  //===============FUNCION PARA ELIMINAR================================//
  const deleteEmpleado = (val) => {
    Swal.fire({
      title: 'Confirmar eliminar?',
      html: "<i>Estas seguro de eliminar al usuario <strong>"+val.nombre+"</strong>?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`,).then(() => {  //MANDAMOS EL ID VIA URL
          getEmpleados();
          limpiarCampos();
        });
        Swal.fire(
          'Eliminado!',
          'El usuario ' + val.nombre + ' a sido eliminado!',
          'success',
           5000
        )
      }
    }).catch(function(error){  //Try catch de error ejemplo de red
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se logro eliminar el empleado!',
        footer: JSON.parse(JSON.stringify(error)).message==="Error de servidor"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message
      })
    });
  }
  //===============================================//

  return (
    <div className="container">
      <div className="App">

        <div className="card" style={{ margin: '5%', textAlign: 'center', }}>
          <div className="card-header">
            Gestion de empleados
          </div>

          <div className="card-body">

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Nombre:</span>
              <input type="text"
                onChange={(event) => {
                  setNombre(event.target.value);
                }}
                className="form-control" value={nombre} placeholder="Ingrese un nombre" aria-label="Username" ></input>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Edad:</span>
              <input type="number"
                onChange={(event) => {
                  setEdad(event.target.value);
                }}
                className="form-control" value={edad} placeholder="Ingrese una edad" aria-label="Username" ></input>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Pais:</span>
              <input type="text"
                onChange={(event) => {
                  setPais(event.target.value);
                }}
                className="form-control" value={pais} placeholder="Ingrese un pais" aria-label="Username" ></input>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Cargo:</span>
              <input type="text"
                onChange={(event) => {
                  setCargo(event.target.value);
                }}
                className="form-control" value={cargo} placeholder="Ingrese un cargo" aria-label="Username" ></input>
            </div>

            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Años de experiencia:</span>
              <input type="number"
                onChange={(event) => {
                  setAnos(event.target.value);
                }}
                className="form-control" value={anos} placeholder="Ingrese años" aria-label="Username" ></input>

            </div>

            {
              editar == true ?  //condicional if else
                <div>
                  <button className="btn btn-warning" onClick={update}>Actualizar</button>
                  <button className="btn btn-info" onClick={limpiarCampos} style={{ margin: '5px', }}>Cancelar</button>
                </div>
                : <button className="btn btn-success" onClick={create}>Registrar</button>
            }
          </div>

        </div>

        <table className="table table-striped">
          <thead>
            <tr >
              <th scope="col">Id</th>
              <th scope="col">Nombre</th>
              <th scope="col">Edad</th>
              <th scope="col">Pais</th>
              <th scope="col">Cargo</th>
              <th scope="col">Años de exp</th>
              <th scope="col">Acciones</th>

            </tr>
          </thead>
          <tbody>
            {
              empleadosList.map((val, key) => {
                return <tr key={val.id}>
                  <th scope="row">{val.id}</th>
                  <td>{val.nombre}</td>
                  <td>{val.edad}</td>
                  <td>{val.pais}</td>
                  <td>{val.cargo}</td>
                  <td>{val.anos}</td>
                  <td>
                    <div className='btn-group' role="group" aria-label='Basi example'>
                      <button type="button"
                        onClick={() => {
                          editarEmpleado(val) //al poner val, nos referimos que mandaremos cada unos de los valores (todos los campos)
                        }}
                        className='btn btn-primary' style={{ margin: '5px', }}>Editar</button>
                      <button type="button" onClick={() => {
                        deleteEmpleado(val);
                      }}
                        className='btn btn-danger' style={{ margin: '5px', }}>Eliminar</button>

                    </div>
                  </td>
                </tr>
              })
            }

          </tbody>
        </table>




      </div>
    </div>
  );
}

export default App;
