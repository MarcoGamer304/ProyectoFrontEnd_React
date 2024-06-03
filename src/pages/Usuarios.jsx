import React, { useState, useEffect } from 'react';
import '../sources/Usuarios.css';
import { Button } from 'reactstrap';
import { MdDeleteOutline } from "react-icons/md";
import { RiExchange2Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import DataTable from 'react-data-table-component';
import Modal from '../components/Modal';

const columns = (deleteApi, openModalPatch) => [
    {
        name: 'User',
        selector: row => row.user,
        sortable: true,
    },
    {
        name: 'Password',
        selector: row => row.password,
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

const ModalPatch = ({ isOpenModal, closeModal, user, password, handleInputChange, handleSubmit }) => (
    <Modal open={isOpenModal} close={closeModal}>
        <div>
            <form onSubmit={handleSubmit}>
                <h4 className='titleModal'> Editar Usuario</h4>
                <div className='inputsModal'>
                    <div className='input'>
                        <input className='inputText' type="text" placeholder='username' value={user} onChange={(e) => handleInputChange(e, 'user')} required />
                    </div>
                    <div className='input'>
                        <input className='inputText' type="password" placeholder='password' value={password} onChange={(e) => handleInputChange(e, 'password')} required />
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
        await fetch('http://localhost:8080/login/' + id, {
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
        const response = await fetch('http://localhost:8080/login/allUsers');
        const data = await response.json();
        setDataApi(data);
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
};
//PATCH
const patchtApi = async (id, user, password, setDataApi, setIsOpenModalPatch) => {
    try {
        const response = await fetch('http://localhost:8080/login/allUsers');
        const data = await response.json();

        const userFind = data.find(findUser => findUser.user === user);

        if (userFind) {
            console.log('Usuario ya existente:', userFind);
        } else {
            const response = await fetch('http://localhost:8080/login', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, user, password })
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
const postApi = async (event, user, password, setDataApi, setIsOpen) => {
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:8080/login/allUsers');
        const data = await response.json();

        const userFind = data.find(findUser => findUser.user === user);

        if (userFind) {
            console.log('Usuario ya existente:', userFind);
        } else {
            const postResponse = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user, password })
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

const UserTableModule = () => {
    const [dataApi, setDataApi] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenModalPatch, setIsOpenModalPatch] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        getSubmit(setDataApi);
    }, []);

    const handleInputChange = (e, field) => {
        if (field === 'user') setUser(e.target.value);
        if (field === 'password') setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            patchtApi(currentUserId, user, password, setDataApi, setIsOpenModalPatch);
        } else {
            postApi(e, user, password, setDataApi, setIsOpen);
        }
    };

    const openModalPatch = (row) => {
        setCurrentUserId(row.id);
        setUser(row.user);
        setPassword(row.password);
        setIsOpenModalPatch(true);
        setIsEditing(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setIsOpenModalPatch(false);
        setUser('');
        setPassword('');
        setIsEditing(false);
    };

    if (dataApi === null) {
        return <div className='containerTableUsers'>Cargando...</div>;
    }

    return (
        <div className='containerTableUsers'>
            <div className='tableUsers'>
                <ModalPatch isOpenModal={isOpenModalPatch} closeModal={closeModal} user={user} password={password} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />
                <div className='divModal'>
                    <button className='buttonModal' onClick={() => { setIsOpen(true); setIsEditing(false); }}><IoMdAdd /> Agregar Usuario</button>
                </div>
                <Modal open={isOpen} close={closeModal}>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <h4 className='titleModal'> Agregar Usuario</h4>
                            <div className='inputsModal'>
                                <div className='input'>
                                    <input className='inputText' type="text" placeholder='username' value={user} onChange={(e) => handleInputChange(e, 'user')} required />
                                </div>
                                <div className='input'>
                                    <input className='inputText' type="password" placeholder='password' value={password} onChange={(e) => handleInputChange(e, 'password')} required />
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

export default UserTableModule;
