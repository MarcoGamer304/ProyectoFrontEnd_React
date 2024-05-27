import React, { useState, useEffect } from 'react';
import Table from '../components/Table'
import '../sources/Usuarios.css'
import { Button } from 'reactstrap';
import { MdDeleteOutline } from "react-icons/md";
import { RiExchange2Line } from "react-icons/ri";
import { IoMdStarOutline } from "react-icons/io";

const columns = [
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
        cell: () => <div>       
            <Button style={{margin: '3px'}}><RiExchange2Line /></Button>
            <Button style={{margin: '3px'}}><IoMdStarOutline /></Button>
            <Button style={{margin: '3px'}}><MdDeleteOutline /></Button>        
        </div>
    },
];

const getSubmit = async (setDataApi) => {
    try {
        const response = await fetch('http://localhost:8080/login/allUsers');
        const data = await response.json();
        setDataApi(data);
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
};

const UserTableModule = () => {
    const [dataApi, setDataApi] = useState(null);

    useEffect(() => {
        getSubmit(setDataApi);
    }, []);

    
    if (dataApi === null) {
        return <div className='containerTableUsers'>Cargando...</div>;
    }

    return (
        <div className='containerTableUsers'>
            <div className='tableUsers'>
                <Table dataApi={dataApi} columns={columns}></Table>
            </div>
        </div>
    )
}

export default UserTableModule