import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FC } from "react";
import { Event_ } from "../../types/Event_";

interface TableProps {
    events: Event_[];
}

const Table: FC<TableProps> = ({ events }) => {
    return (
        <DataTable
            value={events}
            size="small"
            showGridlines
            stripedRows
            paginator
            rows={10}
            tableStyle={{ minWidth: "10rem" }}
        >
            <Column field="date" header="Дата"></Column>
            <Column field="importance" header="Важность"></Column>
            <Column field="ware" header="Оборудование"></Column>
            <Column field="message" header="Сообщения" sortable></Column>
            <Column field="responsible" header="Ответственный" sortable></Column>
        </DataTable>
    );
};

export default Table;
