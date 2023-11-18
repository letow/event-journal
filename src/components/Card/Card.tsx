import { Card as PrimeCard } from "primereact/card";
import { FC } from "react";
import { Event_ } from "../../types/Event_";

interface CardProps {
    event: Event_;
}

const Card: FC<CardProps> = ({ event }) => {
    return (
        <PrimeCard>
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
                    <div className="flex">
                        <div className="col">Сообщение:</div>
                        <div className="col msg flex">{event.message}</div>
                    </div>
                </div>
                <div className="flex col-fixed flex-column align-items-center">
                    <div className="avatar"></div>
                    <div className="name">{event.responsible}</div>
                </div>
            </div>
        </PrimeCard>
    );
};

export default Card;
