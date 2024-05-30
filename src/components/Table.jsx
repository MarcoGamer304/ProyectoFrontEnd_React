import DataTable from 'react-data-table-component';


const SelectedRows = (selectedRows) => {
    console.log(selectedRows.selectedRows);
}

const SelectedRow = (row) => {
    console.log(row.id);
};

const defaultTable = ({ columns, dataApi }) => {

    return (
        <DataTable
            title="Tabla"
            columns={columns}
            data={dataApi}
            pagination
            selectableRows
            onSelectedRowsChange={SelectedRows}
            onRowMouseEnter={(row) => SelectedRow(row)}
        />
    );

}

export default defaultTable