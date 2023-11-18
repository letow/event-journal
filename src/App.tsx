import "./App.scss";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { TabView, TabPanel } from "primereact/tabview";
import { useEffect } from "react";
import Card from "./components/Card/Card";
import Table from "./components/Table/Table";
import { observer } from "mobx-react-lite";
import card from "./store/Cards";

const App = observer(() => {
    useEffect(() => {
        card.getEvents();

        const handleKeydown = (e: any) => {
            if (e.code === "Space" && card.activeCard) {
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
                            <div className="grid bg-primary max-w-max">
                                {card.events.map((event) => (
                                    <div
                                        className="col-12 lg:col-6 xl:col-4 p-3"
                                        key={event.id}
                                        onClick={() => card.setActiveCard(event)}
                                    >
                                        <Card
                                            event={event}
                                            isActive={card.activeCard?.id === event.id}
                                        />
                                    </div>
                                ))}
                            </div>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </PrimeReactProvider>
    );
});

export default App;
