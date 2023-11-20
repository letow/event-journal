import "./App.scss";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FilterMatchMode, PrimeReactProvider } from "primereact/api";
import { TabView, TabPanel } from "primereact/tabview";
import { useEffect, useState } from "react";
import Table from "./components/Table/Table";
import { observer } from "mobx-react-lite";
import { DataView } from "primereact/dataview";
import card from "./store/Events";
import CardItem from "./components/CardItem/CardItem";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";

const App = observer(() => {
    useEffect(() => {
        card.getEvents();

        const handleKeydown = (e: KeyboardEvent) => {
            if (e.code === "Space" && card.activeCard) {
                e.preventDefault();
                card.readEvent(card.activeCard);
            }
        };

        document.addEventListener("keydown", handleKeydown);

        return () => document.removeEventListener("keydown", handleKeydown);
    }, []);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGlobalFilterValue(e.target.value);
    };

    const onSearch = () => {
        const value = globalFilterValue;
        let _filters = { ...filters };

        _filters["global"].value = value;

        setFilters(_filters);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-start z-5 w-full static md:absolute md:justify-content-end">
                <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Введите запрос..."
                />
                <Button className="bg-primary ml-2" onClick={onSearch}>
                    Поиск
                </Button>
            </div>
        );
    };

    const header = renderHeader();

    return (
        <PrimeReactProvider>
            <div className="App">
                <Panel headerTemplate={header} className="relative">
                    {card.isError && <Message severity="error" text={card.error} />}
                    <TabView>
                        <TabPanel header="Таблица">
                            <Table
                                events={card.events}
                                filters={filters}
                                globalFilterFields={[
                                    "date",
                                    "importance",
                                    "ware",
                                    "message",
                                    "responsible",
                                ]}
                            />
                        </TabPanel>
                        <TabPanel header="Карточки">
                            <DataView
                                className="grid max-w-max"
                                value={card.events}
                                itemTemplate={(e) => <CardItem event={e} />}
                                paginator
                                rows={9}
                                emptyMessage="Нет результатов"
                            />
                        </TabPanel>
                    </TabView>
                </Panel>
            </div>
        </PrimeReactProvider>
    );
});

export default App;
