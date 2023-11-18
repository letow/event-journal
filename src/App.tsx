import "./App.scss";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { useEffect, useState } from "react";
import Card from "./components/Card/Card";
import Table from "./components/Table/Table";
import { Event_ } from "./types/Event_";

const SERVER = "http://localhost:5000/";

const App = () => {
    const [events, setEvents] = useState<Event_[]>([]);

    useEffect(() => {
        fetch(SERVER + "events")
            .then((response) => response.json())
            .then((data) => setEvents(data));
    }, []);

    return (
        <PrimeReactProvider>
            <div className="App">
                <div className="surface-0">
                    <TabView>
                        <TabPanel header="Таблица">
                            <Table events={events} />
                        </TabPanel>
                        <TabPanel header="Карточки">
                            <div className="grid bg-primary max-w-max">
                                {events.map((event) => (
                                    <div className="col-12 lg:col-6 xl:col-4 p-3">
                                        <Card event={event}></Card>
                                    </div>
                                ))}
                            </div>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </PrimeReactProvider>
    );
};

export default App;
