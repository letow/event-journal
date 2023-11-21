import { makeAutoObservable } from "mobx";
import { Event_ } from "../types/Event_";
import { samples } from "./Samples";
import { getRandInt } from "../helpers/getRandInt";

type Action = "read" | "add";

class Events {
    events: Event_[] = [];
    SERVER = "https://my-json-server.typicode.com/letow/ev-db/";
    activeCard: Event_ = null;
    isError: boolean = false;
    error: string = null;

    constructor() {
        makeAutoObservable(this);
    }

    // чтобы подтянуть из БД ивенты
    getEvents() {
        fetch(this.SERVER + "events")
            .then((response) => response.json())
            .then((data) => (this.events = [...data]))
            .catch((error) => {
                this.isError = true;
                this.error = error.message;
            });
    }

    addEvent() {
        const ev: Event_ = {
            id: this.events.length + 1,
            date: new Date().toLocaleString("ru-RU"),
            importance: samples.IMPORTANCE[getRandInt(0, samples.IMPORTANCE.length)],
            ware: samples.WARE[getRandInt(0, samples.WARE.length)],
            message: samples.MESSAGES[getRandInt(0, samples.MESSAGES.length)],
            responsible: samples.NAMES[getRandInt(0, samples.NAMES.length)],
            isRead: false,
        };

        this.events.push(ev);

        //this.syncEvent(ev)
    }

    setActiveCard(event: Event_) {
        this.activeCard = event;
    }

    readEvent(event: Event_) {
        if (event.isRead) return;

        event.isRead = true;
        this.activeCard = null;

        //this.syncEvent(event, 'read')
    }

    // для синхронизации с БД
    syncEvent(event: Event_, action: Action = "read") {
        const isRead = action === "read";

        fetch(this.SERVER + "events/" + (isRead && event.id), {
            method: isRead ? "PATCH" : "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(isRead ? { isRead: true } : event),
        })
            .then(() => (this.isError = false))
            .catch((error) => {
                this.isError = true;
                this.error = error.message;
            });
    }
}

export default new Events();
