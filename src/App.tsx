import "./App.scss";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { PrimeReactProvider } from "primereact/api";
import { TabView, TabPanel } from "primereact/tabview";
import { useEffect } from "react";
import Table from "./components/Table/Table";
import { observer } from "mobx-react-lite";
import { DataView } from "primereact/dataview";
import card from "./store/Cards";
import CardItem from "./components/CardItem/CardItem";

const App = observer(() => {
    useEffect(() => {
        card.getEvents();

        const handleKeydown = (e: any) => {
            if (e.code === "Space" && card.activeCard) {
                e.preventDefault();
                card.readEvent(card.activeCard);
            }
        };
        document.addEventListener("keydown", handleKeydown);

        return () => document.removeEventListener("keydown", handleKeydown);
    }, []);

    return (
        <PrimeReactProvider>
            <div className="App">
                <div className="surface-0">
                    <TabView>
                        <TabPanel header="Таблица">
                            <Table events={card.events} />
                        </TabPanel>
                        <TabPanel header="Карточки">
                            <DataView
                                className="grid max-w-max"
                                value={card.events}
                                itemTemplate={(e) => <CardItem event={e} />}
                                paginator
                                rows={9}
                            />
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </PrimeReactProvider>
    );
});

export default App;
