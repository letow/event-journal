import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { FC } from "react";
import { Event_ } from "../../types/Event_";

interface TableProps {
    events: Event_[];
    globalFilterFields: string[];
    filters: DataTableFilterMeta;
}

const Table: FC<TableProps> = ({ events, globalFilterFields, filters }) => {
    return (
        <DataTable
            value={events}
            size="small"
            showGridlines
            stripedRows
            paginator
            rows={10}
            filters={filters}
            tableStyle={{ minWidth: "10rem" }}
            globalFilterFields={globalFilterFields}
        >
            <Column field="date" header="Дата" filterField="date"></Column>
            <Column field="importance" header="Важность" filterField="importance"></Column>
            <Column field="ware" header="Оборудование" filterField="ware"></Column>
            <Column field="message" header="Сообщения" filterField="message" sortable></Column>
            <Column
                field="responsible"
                header="Ответственный"
                filterField="responsible"
                sortable
            ></Column>
        </DataTable>
    );
};

export default Table;
