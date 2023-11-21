import "./App.scss";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FilterMatchMode, PrimeReactProvider } from "primereact/api";
import { TabView, TabPanel } from "primereact/tabview";
import { useEffect, useState } from "react";
import Table from "./components/Table/Table";
import { observer } from "mobx-react-lite";
import { DataView } from "primereact/dataview";
import store from "./store/Events";
import CardItem from "./components/CardItem/CardItem";
import { Message } from "primereact/message";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import { Event_ } from "./types/Event_";
import { getRandInt } from "./helpers/getRandInt";

const App = observer(() => {
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [filteredEvents, setFilteredEvents] = useState<Event_[]>(null);

    const [globalFilterValue, setGlobalFilterValue] = useState<string>("");

    useEffect(() => {
        //store.getEvents();

        const handleKeydown = (e: KeyboardEvent) => {
            if (e.code === "Space" && store.activeCard) {
                e.preventDefault();
                store.readEvent(store.activeCard);
            }
        };

        document.addEventListener("keydown", handleKeydown);

        const timer = setInterval(
            () => {
                store.addEvent();
            },
            getRandInt(5, 10) * 1000
        );

        return () => {
            document.removeEventListener("keydown", handleKeydown);
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        setFilteredEvents(store.events);
    }, [store.events.length]);

    const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGlobalFilterValue(e.target.value);
    };

    const onSearch = () => {
        const value = globalFilterValue;
        let _filters = { ...filters };

        _filters["global"].value = value;

        setFilters(_filters);
        setFilteredEvents(
            store.events.filter((event) => JSON.stringify(event).toLowerCase().includes(value))
        );
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-start z-1 static md:absolute md:right-0 md:justify-content-end">
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
                    {store.isError && <Message severity="error" text={store.error} />}
                    <TabView>
                        <TabPanel header="Таблица">
                            <Table
                                events={store.events}
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
                                value={filteredEvents}
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
