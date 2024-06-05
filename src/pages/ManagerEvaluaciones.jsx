import React, { useState, useEffect } from 'react';
import '../sources/ManagerEvaluaciones.css';
import { Button } from 'reactstrap';
import { MdDeleteOutline } from "react-icons/md";
import { RiExchange2Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import DataTable from 'react-data-table-component';
import Modal from '../components/Modal';

const columns = (deleteApi, openModalPatch) => [
    {
        name: 'Porcentaje',
        selector: row => row.porcentaje,
        sortable: true,
    },
    {
        name: 'Tipo evaluacion',
        selector: row => row.tipo_evaluacion,
        sortable: true,
    },
    {
        name: 'Tiempo estimado',
        selector: row => row.tiempo_estimado,
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

const ModalPatch = ({ isOpenModal, closeModal, porcentaje, tipo_evaluacion, tiempo_estimado, handleInputChange, handleSubmit }) => (
    <Modal open={isOpenModal} close={closeModal}>
        <div>
            <form onSubmit={handleSubmit}>
                <h4 className='titleModal'> Editar Evaluacion</h4>
                <div className='inputsModal'>
                    <div className='input'>
                        <input className='inputText' type="text" placeholder='porcentaje' value={porcentaje} onChange={(e) => handleInputChange(e, 'porcentaje')} required />
                    </div>
                    <div className='input'>
                        <input className='inputText' type="text" placeholder='tipo_evaluacion' value={tipo_evaluacion} onChange={(e) => handleInputChange(e, 'tipo_evaluacion')} required />
                    </div>
                    <div className='input'>
                        <input className='inputText' type="text" placeholder='tiempo_estimado' value={tiempo_estimado} onChange={(e) => handleInputChange(e, 'tiempo_estimado')} required />
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
        await fetch('http://localhost:8080/evaluacion/' + id, {
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
        const response = await fetch('http://localhost:8080/evaluacion/allEvaluacion');
        const data = await response.json();
        setDataApi(data);
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
};
//PATCH
const patchtApi = async (id, porcentaje, tipo_evaluacion, tiempo_estimado, setDataApi, setIsOpenModalPatch) => {
    try {
        const response = await fetch('http://localhost:8080/evaluacion/allEvaluacion');
        const data = await response.json();

        const porcentajeFind = data.find(findPorcentaje => findPorcentaje.porcentaje === porcentaje);

        if (porcentajeFind === false) {
            console.log('Evaluacion no existente:', porcentajeFind);
        } else {
            const response = await fetch('http://localhost:8080/evaluacion', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, porcentaje, tipo_evaluacion, tiempo_estimado })
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
const postApi = async (event, porcentaje, tipo_evaluacion, tiempo_estimado, setDataApi, setIsOpen) => {
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:8080/evaluacion/allEvaluacion');
        const data = await response.json();

        const porcentajeFind = data.find(findPorcentaje => findPorcentaje.porcentaje === porcentaje);

        if (porcentajeFind) {
            console.log('Evaluacion ya existente:', porcentajeFind);
        } else {
            const postResponse = await fetch('http://localhost:8080/evaluacion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ porcentaje, tipo_evaluacion, tiempo_estimado })
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

const CategoriasModule = () => {
    const [dataApi, setDataApi] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenModalPatch, setIsOpenModalPatch] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [porcentaje, setPorcentaje] = useState('');
    const [tipo_evaluacion, setTipo_evaluacion] = useState('');
    const [tiempo_estimado, setTiempo_estimado] = useState('');
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        getSubmit(setDataApi);
    }, []);

    const handleInputChange = (e, field) => {
        if (field === 'porcentaje') setPorcentaje(e.target.value);
        if (field === 'tipo_evaluacion') setTipo_evaluacion(e.target.value);
        if (field === 'tiempo_estimado') setTiempo_estimado(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            patchtApi(currentUserId, porcentaje, tipo_evaluacion, tiempo_estimado, setDataApi, setIsOpenModalPatch);
        } else {
            postApi(e, porcentaje, tipo_evaluacion, tiempo_estimado, setDataApi, setIsOpen);
        }
    };

    const openModalPatch = (row) => {
        setCurrentUserId(row.id);
        setPorcentaje(row.porcentaje);
        setTipo_evaluacion(row.tipo_evaluacion);
        setTiempo_estimado(row.tiempo_estimado);
        setIsOpenModalPatch(true);
        setIsEditing(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setIsOpenModalPatch(false);
        setPorcentaje('');
        setTipo_evaluacion('');
        setTiempo_estimado('');
        setIsEditing(false);
    };

    if (dataApi === null) {
        return <div className='containerTableUsers'>Cargando...</div>;
    }

    return (
        <div className='containerTableEvaluaciones'>
            <div className='tableEvaluaciones'>
                <ModalPatch isOpenModal={isOpenModalPatch} closeModal={closeModal} porcentaje={porcentaje} tipo_evaluacion={tipo_evaluacion} tiempo_estimado={tiempo_estimado} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
                <div className='divModal'>
                    <button className='buttonModal' onClick={() => { setIsOpen(true); setIsEditing(false); }}><IoMdAdd /> Agregar Evaluacion</button>
                </div>
                <Modal open={isOpen} close={closeModal}>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <h4 className='titleModal'> Agregar Evaluacion</h4>
                            <div className='inputsModal'>
                                <div className='input'>
                                    <input className='inputText' type="text" placeholder='porcentaje' value={porcentaje} onChange={(e) => handleInputChange(e, 'porcentaje')} required />
                                </div>
                                <div className='input'>
                                    <input className='inputText' type="text" placeholder='tipo_evaluacion' value={tipo_evaluacion} onChange={(e) => handleInputChange(e, 'tipo_evaluacion')} required />
                                </div>
                                <div className='input'>
                                    <input className='inputText' type="text" placeholder='tiempo_estimado' value={tiempo_estimado} onChange={(e) => handleInputChange(e, 'tiempo_estimado')} required />
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

export default CategoriasModule;
