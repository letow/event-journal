import { Card as PrimeCard } from "primereact/card";
import { FC, useState } from "react";
import { Event_ } from "../../types/Event_";
import "./Card.scss";

interface CardProps {
    event: Event_;
    isActive: boolean;
}

const Card: FC<CardProps> = ({ event, isActive }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <PrimeCard
            className={`Card ${event.isRead && "read"} ${isOpen && "open"} ${isActive && "active"}`}
            onClick={() => setIsOpen((prev) => !prev)}
        >
            <div className="flex justify-content-between">
                <div className="flex-column flex-grow-1">
                    <div className="flex">
                        <div className="col">Дата:</div>
                        <div className="col">{event.date}</div>
                    </div>
                    <div className="flex">
                        <div className="col">Важность:</div>
                        <div className="col">{event.importance}</div>
                    </div>
                    <div className="flex">
                        <div className="col">Оборудование:</div>
                        <div className="col">{event.ware}</div>
                    </div>
                    <div className="flex msgp">
                        <div className="col">Сообщение:</div>
                        <div className="col msg flex">{event.message}</div>
                    </div>
                </div>
                <div className="flex col-fixed flex-column align-items-center">
                    <div className="avatar"></div>
                    <div className="name">{event.responsible}</div>
                </div>
            </div>
            <div className="fade" />
        </PrimeCard>
    );
};

export default Card;
