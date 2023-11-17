import "./App.scss";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

const App = () => {
    return (
        <PrimeReactProvider>
            <div className="App">
                <div className="surface-0">
                    <TabView>
                        <TabPanel header="Header I">
                            <DataTable
                                value={[
                                    {
                                        date: new Date().toLocaleString("ru-RU"),
                                        importance: "a",
                                        ware: "asdaf",
                                        message: 4,
                                        responsible: "saodiajs",
                                    },
                                    {
                                        date: new Date().toLocaleString("ru-RU"),
                                        importance: "a",
                                        ware: "asdaf",
                                        message: 4,
                                        responsible: "saodiajs",
                                    },
                                    {
                                        date: new Date().toLocaleString("ru-RU"),
                                        importance: "a",
                                        ware: "asdaf",
                                        message: 4,
                                        responsible: "saodiajs",
                                    },
                                    {
                                        date: new Date().toLocaleString("ru-RU"),
                                        importance: "a",
                                        ware: "asdaf",
                                        message: 4,
                                        responsible: "saodiajs",
                                    },
                                    {
                                        date: new Date().toLocaleString("ru-RU"),
                                        importance: "a",
                                        ware: "asdaf",
                                        message: 4,
                                        responsible: "saodiajs",
                                    },
                                ]}
                                size="small"
                                showGridlines
                                stripedRows
                                paginator
                                rows={10}
                                tableStyle={{ minWidth: "50rem" }}
                            >
                                <Column field="date" header="Дата"></Column>
                                <Column field="importance" header="Важность"></Column>
                                <Column field="ware" header="Оборудование"></Column>
                                <Column field="message" header="Сообщения"></Column>
                                <Column field="responsible" header="Ответственный"></Column>
                            </DataTable>
                        </TabPanel>
                        <TabPanel header="Header II">
                            <p className="m-0">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                quae ab illo inventore veritatis et quasi architecto beatae vitae
                                dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                                aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
                                eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
                                velit, sed quia non numquam eius modi.
                            </p>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </PrimeReactProvider>
    );
};

export default App;
