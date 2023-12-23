import React, { Component } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Button from '@mui/material/Button';


const URI = "http://localhost:300/autos/vehiculos/";
const URI1 = "http://localhost:300/autos/vehiculo/";

class Vehiculo extends Component {
  state = {
    data: [],
    modalInsert: false,
    modalDelete: false,
    form: {
      id: '',
      placa: '',
      modelo: '',
      marca: '',
      año: '',
      color: ""
    }
  }

  callGet = () => {
    axios.get(URI).then(response => {
      this.setState({ data: response.data });
    }).catch(error => {
      console.log(error.message);
    })
  }
  callPost = async () => {
    delete this.state.form.id;
    await axios.post(URI1, this.state.form).then(response => {
      this.modalInsert();
      this.callGet();
    }).catch(error => {
      console.log(error.message);
    })
  }

  callPut = () => {
    axios.put(URI + this.state.form.id, this.state.form).then(response => {
      this.modalInsert();
      this.callGet();
    })
  }

  callDelete = () => {
    axios.delete(URI + this.state.form.id).then(response => {
      this.setState({ modalDelete: false });
      this.callGet();
    })
  }
  modalInsert = () => {
    this.setState({ modalInsert: !this.state.modalInsert });
  }
  selectVehiculo = (vehiculo) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: vehiculo.id,
        placa: vehiculo.placa,
        modelo: vehiculo.modelo,
        marca: vehiculo.marca,
        año: vehiculo.año,
        color: vehiculo.color
      }
    })
  }
  captureData = async data => {
    data.persist();
    await this.setState({
      form: {
        ...this.state.form,
        [data.target.name]: data.target.value
      }
    });
    console.log(this.state.form);
  }
  componentDidMount() {
    this.callGet();
  }
  render() {
    const { form } = this.state;
    return (
      <div className="App">
        <h2 className="titulo-crud">CRUD DE VEHICULOS</h2>
        <div className="table-responsive-md">
          <table className="table ">
            <thead>
              <tr>
                <th>Placa</th>
                <th>Modelo</th>
                <th>Marca</th>
                <th>Año</th>
                <th>Color</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(vehiculo => {
                return (
                  <tr>
                    <td>{vehiculo.placa}</td>
                    <td>{vehiculo.modelo}</td>
                    <td>{vehiculo.marca}</td>
                    <td>{vehiculo.año}</td>
                    <td>{vehiculo.color}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => { this.selectVehiculo(vehiculo); this.modalInsert() }}><FontAwesomeIcon icon={faEdit} /></button>
                      {"   "}
                      <button className="btn btn-danger" onClick={() => { this.selectVehiculo(vehiculo); this.setState({ modalDelete: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <Modal isOpen={this.state.modalInsert}>
          <ModalHeader style={{ display: 'block' }}>
            <span style={{ float: 'right' }} onClick={() => this.modalInsert()}>X</span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="placa">placa</label>
              <input className="form-control" type="text" name="placa" id="placa" onChange={this.captureData} value={form ? form.placa : ""} />
              <br />
              <label htmlFor="marca">marca</label>
              <input className="form-control" type="text" name="marca" id="marca" onChange={this.captureData} value={form ? form.marca : ''} />
              <br />
              <label htmlFor="modelo">modelo</label>
              <input className="form-control" type="text" name="modelo" id="modelo" onChange={this.captureData} value={form ? form.modelo : ''} />
              <br />
              <label htmlFor="año">año</label>
              <input className="form-control" type="number" name="año" id="año" onChange={this.captureData} value={form ? form.año : ''} />
              <br />
              <label htmlFor="color">color</label>
              <input className="form-control" type="text" name="color" id="color" onChange={this.captureData} value={form ? form.color : ''} />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.tipoModal === 'insertar' ?
              <button className="btn btn-success" onClick={() => this.callPost()}>
                Insertar
              </button> : <button className="btn btn-primary" onClick={() => this.callPut()}>
                Actualizar
              </button>
            }
            <button className="btn btn-danger" onClick={() => this.modalInsert()}>Cancelar</button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalDelete}>
          <ModalBody>
            Estás seguro que deseas eliminar el vehiculo: {form && form.placa}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => this.callDelete()}>Sí</button>
            <button className="btn btn-secundary" onClick={() => this.setState({ modalDelete: false })}>No</button>
          </ModalFooter>
        </Modal>
        <Button
          className='login'
          fullWidth
          variant="contained"
          style={{ color: 'white', backgroundColor: "#69c15d" }}
          onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsert() }}
        >
          <strong><p>Añadir vehiculo</p></strong>
        </Button>
      </div>
    );
  }
}
export default Vehiculo;