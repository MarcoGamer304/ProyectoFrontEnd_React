import React, { useState, useEffect } from 'react';
import '../sources/ManagerActividades.css';
import { Button } from 'reactstrap';
import { MdDeleteOutline } from "react-icons/md";
import { RiExchange2Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import DataTable from 'react-data-table-component';
import Modal from '../components/Modal';

const columns = (deleteApi, openModalPatch) => [
    {
        name: 'Nombre',
        selector: row => row.nombre,
        sortable: true,
    },
    {
        name: 'Descripcion',
        selector: row => row.descripcion,
        sortable: true,
    },
    {
        name: 'Fecha realizar',
        selector: row => row.fecha_hora_realizar,
        sortable: true,
    },
    {
        name: 'Fecha registro',
        selector: row => row.fecha_hora_registro,
        sortable: true,
    },
    {
        name: 'Imagen',
        selector: row => row.imagen,
        sortable: true,
    },
    {
        name: 'Estado',
        selector: row => row.estado,
        sortable: true,
    },
    {
        button: true,
        cell: row => (
            <div>
                <Button onClick={() => openModalPatch(row)}><RiExchange2Line /></Button>
                <Button onClick={() => deleteApi(row.id)} style={{ margin: '3px' }}><MdDeleteOutline /></Button>
            </div>
        )
    },
];

const ModalPatch = ({ isOpenModal, closeModal, nombre, descripcion, fecha_hora_realizar, fecha_hora_registro, imagen, estado, handleInputChange, handleSubmit }) => (
    <Modal open={isOpenModal} close={closeModal}>
        <div>
            <form onSubmit={handleSubmit}>
                <h4 className='titleModal'> Editar Actividad</h4>
                <div className='inputsModal'>
                    <div className='input'>
                        <input className='inputText' type="text" placeholder='nombre' value={nombre} onChange={(e) => handleInputChange(e, 'nombre')} required />
                    </div>
                    <div className='input'>
                        <input className='inputText' type="text" placeholder='descripcion' value={descripcion} onChange={(e) => handleInputChange(e, 'descripcion')} required />
                    </div>
                    <div className='input'>
                        <input className='inputText' type="text" placeholder='fecha_hora_realizar' value={fecha_hora_realizar} onChange={(e) => handleInputChange(e, 'fecha_hora_realizar')} required />
                    </div>
                    <div className='input'>
                        <input className='inputText' type="text" placeholder='fecha_hora_registro' value={fecha_hora_registro} onChange={(e) => handleInputChange(e, 'fecha_hora_registro')} required />
                    </div>
                    <div className='input'>
                        <input className='inputText' type="text" placeholder='imagen' value={imagen} onChange={(e) => handleInputChange(e, 'imagen')} required />
                    </div>
                    <div className='input'>
                        <input className='inputText' type="text" placeholder='estado' value={estado} onChange={(e) => handleInputChange(e, 'estado')} required />
                    </div>
                </div>
                <div className='buttonsModal'>
                    <button type='Submit'> Guardar </button>
                    <button type='button' onClick={closeModal}>Volver</button>
                </div>
            </form>
        </div>
    </Modal>
);

const SelectedRows = (selectedRows) => {
    console.log(selectedRows.selectedRows);
};

const SelectedRow = (row) => {
    console.log('Row selected: ', row);
};
//DELETE
const deleteApi = async (id, setDataApi) => {
    try {
        await fetch('http://localhost:8080/actividad/' + id, {
            method: 'DELETE',
        });
        getSubmit(setDataApi);
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
};
//GET
const getSubmit = async (setDataApi) => {
    try {
        const response = await fetch('http://localhost:8080/actividad/allActividad');
        const data = await response.json();
        setDataApi(data);
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
};
//PATCH
const patchtApi = async (id, nombre, descripcion, fecha_hora_realizar, fecha_hora_registro, imagen, estado, setDataApi, setIsOpenModalPatch) => {
    try {
        const response = await fetch('http://localhost:8080/actividad/allActividad');
        const data = await response.json();

        const nombreFind = data.find(findNombre => findNombre.nombre === nombre);

        if (nombreFind===false) {
            console.log('Actividad no existente:', nombreFind);
        } else {
            const response = await fetch('http://localhost:8080/actividad', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, nombre, descripcion, fecha_hora_realizar, fecha_hora_registro, imagen, estado })
            });
            const data = await response.json();
            getSubmit(setDataApi);
            setIsOpenModalPatch(false);
            console.log('Datos enviados satisfactoriamente', data);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
//POST
const postApi = async (event, nombre, descripcion, fecha_hora_realizar, fecha_hora_registro, imagen, estado, setDataApi, setIsOpen) => {
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:8080/actividad/allActividad');
        const data = await response.json();

        const nombreFind = data.find(findNombre => findNombre.nombre === nombre);

        if (nombreFind) {
            console.log('Actividad ya existente:', nombreFind);
        } else {
            const postResponse = await fetch('http://localhost:8080/actividad', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, descripcion, fecha_hora_realizar, fecha_hora_registro, imagen, estado })
            });

            if (postResponse.ok) {
                const postData = await postResponse.json();
                console.log('Datos enviados satisfactoriamente', postData);
                getSubmit(setDataApi);
                setIsOpen(false);
            } else {
                const postData = await postResponse.json();
                console.log('Failed: ', postData);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

const ActividadesModule = () => {
    const [dataApi, setDataApi] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenModalPatch, setIsOpenModalPatch] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha_hora_realizar, setFecha_hora_realizar] = useState('');
    const [fecha_hora_registro, setFecha_hora_registro] = useState('');
    const [imagen, setImagen] = useState('');
    const [estado, setEstado] = useState('');
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        getSubmit(setDataApi);
    }, []);

    const handleInputChange = (e, field) => {
        if (field === 'nombre') setNombre(e.target.value);
        if (field === 'descripcion') setDescripcion(e.target.value);
        if (field === 'fecha_hora_realizar') setFecha_hora_realizar(e.target.value);
        if (field === 'fecha_hora_registro') setFecha_hora_registro(e.target.value);
        if (field === 'imagen') setImagen(e.target.value);
        if (field === 'estado') setEstado(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            patchtApi(currentUserId, nombre, descripcion, fecha_hora_realizar, fecha_hora_registro, imagen, estado, setDataApi, setIsOpenModalPatch);
        } else {
            postApi(e, nombre, descripcion, fecha_hora_realizar, fecha_hora_registro, imagen, estado, setDataApi, setIsOpen);
        }
    };

    const openModalPatch = (row) => {
        setCurrentUserId(row.id);
        setNombre(row.nombre);
        setDescripcion(row.descripcion);
        setFecha_hora_realizar(row.fecha_hora_realizar);
        setFecha_hora_registro(row.fecha_hora_registro);
        setImagen(row.imagen);
        setEstado(row.estado);
        setIsOpenModalPatch(true);
        setIsEditing(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setIsOpenModalPatch(false);
        setNombre('');
        setDescripcion('');
        setFecha_hora_realizar('');
        setFecha_hora_registro('');
        setImagen('');
        setEstado('');
        setIsEditing(false);
    };

    if (dataApi === null) {
        return <div className='containerTableActividades'>Cargando...</div>;
    }

    return (
        <div className='containerTableActividades'>
            <div className='tableActividades'>
                <ModalPatch isOpenModal={isOpenModalPatch} closeModal={closeModal} nombre={nombre} descripcion={descripcion} fecha_hora_realizar={fecha_hora_realizar} fecha_hora_registro={fecha_hora_registro} imagen={imagen} estado={estado} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
                <div className='divModal'>
                    <button className='buttonModal' onClick={() => { setIsOpen(true); setIsEditing(false); }}><IoMdAdd /> Agregar Actividad</button>
                </div>
                <Modal open={isOpen} close={closeModal}>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <h4 className='titleModal'> Agregar Actividad</h4>
                            <div className='inputsModal'>
                                <div className='input'>
                                    <input className='inputText' type="text" placeholder='nombre' value={nombre} onChange={(e) => handleInputChange(e, 'nombre')} required />
                                </div>
                                <div className='input'>
                                    <input className='inputText' type="text" placeholder='descripcion' value={descripcion} onChange={(e) => handleInputChange(e, 'descripcion')} required />
                                </div>
                                <div className='input'>
                                    <input className='inputText' type="text" placeholder='fecha_hora_realizar' value={fecha_hora_realizar} onChange={(e) => handleInputChange(e, 'fecha_hora_realizar')} required />
                                </div>
                                <div className='input'>
                                    <input className='inputText' type="text" placeholder='fecha_hora_registro' value={fecha_hora_registro} onChange={(e) => handleInputChange(e, 'fecha_hora_registro')} required />
                                </div>
                                <div className='input'>
                                    <input className='inputText' type="text" placeholder='imagen' value={imagen} onChange={(e) => handleInputChange(e, 'imagen')} required />
                                </div>
                                <div className='input'>
                                    <input className='inputText' type="text" placeholder='estado' value={estado} onChange={(e) => handleInputChange(e, 'estado')} required />
                                </div>
                            </div>
                            <div className='buttonsModal'>
                                <button type='Submit'> Guardar </button>
                                <button type='button' onClick={closeModal}>Volver</button>
                            </div>
                        </form>
                    </div>
                </Modal>
                <DataTable
                    title="Tabla"
                    columns={columns((id) => deleteApi(id, setDataApi), openModalPatch)}
                    data={dataApi}
                    pagination
                    selectableRows
                    responsive
                    onSelectedRowsChange={SelectedRows}
                    onRowMouseEnter={(row) => SelectedRow(row)}
                />
            </div>
        </div>
    );
};

export default ActividadesModule;
