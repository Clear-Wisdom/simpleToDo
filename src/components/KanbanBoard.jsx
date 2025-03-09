import { DragOverlay, DndContext, rectIntersection } from "@dnd-kit/core";
import KanbanLane from "./KanbanLane";
import AddCard from "./AddCard";
import { useState } from "react";
import KanbanCard from "./KanbanCard";

const KanbanBoard = () => {
	const [urgentItems, seturgentItems] = useState([]);
	const [doneItems, setDoneItems] = useState([]);
	const [inProgressItems, setInProgressItems] = useState([]);
	const [notStartedItems, setnotStartedItems] = useState([]);
	const arrayLanes = [
		{
			title: "Urgent",
			items: urgentItems,
			titleColor: "#FF6B6B",
			bodyColor: "#FFDADB",
		},
		{
			title: "InProgress",
			items: inProgressItems,
			titleColor: "#FFA000",
			bodyColor: "#FFF2CC",
		},
		{
			title: "Done",
			items: doneItems,
			titleColor: "#4CAF50",
			bodyColor: "#D9F2DC",
		},
		{
			title: "Not started",
			items: notStartedItems,
			titleColor: "#9E9E9E",
			bodyColor: "#E8E8E8",
		},
	];

	const addNewCard = (title) => {
		setnotStartedItems([...notStartedItems, { title }]);
	};
	const [activeCard, setActiveCard] = useState(null);

	return (
		<DndContext
			collisionDetection={rectIntersection}
			onDragStart={({ active }) => {
				setActiveCard(active.data.current);
			}}
			onDragEnd={(e) => {
				const container = e.over?.id;
				const title = e.active.data.current?.title || "";
				const index = e.active.data.current?.index || 0;
				const parent = e.active.data.current?.parent || "Urgent";

				if (container === "Urgent") {
					seturgentItems([...urgentItems, { title }]);
				} else if (container === "Done") {
					setDoneItems([...doneItems, { title }]);
				} else if (container === "Not started") {
					setnotStartedItems([...notStartedItems, { title }]);
				} else {
					setInProgressItems([...inProgressItems, { title }]);
				}
				if (parent === "Urgent") {
					seturgentItems([
						...urgentItems.slice(0, index),
						...urgentItems.slice(index + 1),
					]);
				} else if (parent === "Done") {
					setDoneItems([
						...doneItems.slice(0, index),
						...doneItems.slice(index + 1),
					]);
				} else if (parent === "Not started") {
					setnotStartedItems([
						...notStartedItems.slice(0, index),
						...notStartedItems.slice(index + 1),
					]);
				} else {
					setInProgressItems([
						...inProgressItems.slice(0, index),
						...inProgressItems.slice(index + 1),
					]);
				}
				setActiveCard(null);
			}}
		>
			<div className="flex flex-col w-full">
				<AddCard addCard={addNewCard} />
				<div className="flex w-full justify-evenly items-start gap-2">
					{arrayLanes.map(({ title, items, titleColor, bodyColor }, index) => (
						<KanbanLane
							key={index}
							title={title}
							items={items}
							titleColor={titleColor}
							bodyColor={bodyColor}
						/>
					))}
				</div>
			</div>
			<DragOverlay>
				{activeCard ? (
					<KanbanCard
						title={activeCard.title}
						index={activeCard.index}
						parent={activeCard.parent}
					/>
				) : null}
			</DragOverlay>
		</DndContext>
	);
};

export default KanbanBoard;
