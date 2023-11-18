import { makeAutoObservable } from "mobx";
import { Event_ } from "../types/Event_";

class Cards {
    events: Event_[] = [];
    SERVER = "http://localhost:5000/";
    activeCard: Event_ = null;

    constructor() {
        makeAutoObservable(this);
    }

    getEvents() {
        fetch(this.SERVER + "events")
            .then((response) => response.json())
            .then((data) => (this.events = [...data]));
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
        });
    }
}

export default new Cards();
