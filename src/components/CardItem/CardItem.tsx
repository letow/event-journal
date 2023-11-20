import { FC } from "react";
import { Event_ } from "../../types/Event_";
import card from "../../store/Events";
import Card from "../Card/Card";
import { observer } from "mobx-react-lite";

interface CardItemProps {
    event: Event_;
}

const CardItem: FC<CardItemProps> = observer(({ event }) => {
    return (
        <div
            className="col-12 lg:col-6 xl:col-4 p-3"
            key={event.id}
            onClick={() => card.setActiveCard(event)}
        >
            <Card event={event} isActive={card.activeCard?.id === event.id} />
        </div>
    );
});

export default CardItem;
