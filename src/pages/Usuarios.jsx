import React, { useState, useEffect } from 'react';
import '../sources/Usuarios.css'
import { Button } from 'reactstrap';
import { MdDeleteOutline } from "react-icons/md";
import { RiExchange2Line } from "react-icons/ri";
import DataTable from 'react-data-table-component';

let id;

const columns = (deleteApi) => [
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
        cell: () => (
            <div>
                <Button onClick={""} style={{ margin: '3px' }}><RiExchange2Line /></Button>
                <Button onClick={deleteApi} style={{ margin: '3px' }}><MdDeleteOutline /></Button>
            </div>
        )
    },
];

const SelectedRows = (selectedRows) => {
    console.log(selectedRows.selectedRows);
}

const SelectedRow = (row) => {
    id = row.id;
};

const deleteApi = async (event, setDataApi) => {
    try {
        await fetch('http://localhost:8080/login/' + id, {
            method: 'DELETE',
        });
        getSubmit(setDataApi);
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
};

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
                <DataTable
                    title="Tabla"
                    columns={columns((event) => deleteApi(event, setDataApi))}
                    data={dataApi}
                    pagination
                    selectableRows
                    onSelectedRowsChange={SelectedRows}
                    onRowMouseEnter={(row) => SelectedRow(row)}
                />
            </div>
        </div>
    );
}

export default UserTableModule;