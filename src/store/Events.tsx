import { makeAutoObservable } from "mobx";
import { Event_ } from "../types/Event_";

class Events {
    events: Event_[] = [];
    SERVER = "https://my-json-server.typicode.com/letow/ev-db/";
    activeCard: Event_ = null;
    isError: boolean = null;
    error: string = null;

    constructor() {
        makeAutoObservable(this);
    }

    getEvents() {
        fetch(this.SERVER + "events")
            .then((response) => response.json())
            .then((data) => (this.events = [...data]))
            .catch((error) => {
                this.isError = true;
                this.error = error.message;
            });
    }

    setActiveCard(event: Event_) {
        this.activeCard = event;
    }

    readEvent(event: Event_) {
        if (event.isRead) return;

        event.isRead = true;
        this.activeCard = null;

        fetch(this.SERVER + "events/" + event.id, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isRead: true }),
        })
            .then(() => (this.isError = false))
            .catch((error) => {
                this.isError = true;
                this.error = error.message;
            });
    }
}

export default new Events();
