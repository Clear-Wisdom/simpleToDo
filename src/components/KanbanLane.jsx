import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./KanbanCard";

const KanbanLane = ({
	title,
	items,
	titleColor,
	bodyColor,
	onDeleteCard,
	onEditCard,
}) => {
	const { setNodeRef } = useDroppable({
		id: title,
	});

	return (
		<div className="w-80 flex flex-col p-5 min-h-[10rem]">
			<div
				className="text-xl rounded-md p-1 font-bold mb-2 text-white"
				style={{ backgroundColor: titleColor }}
			>
				{title}
			</div>
			<div
				ref={setNodeRef}
				className="rounded-md shadow-md flex flex-col p-2 min-h-[5rem]"
				style={{ backgroundColor: bodyColor }}
			>
				{items.map(({ title: item, todoId }, index) => (
					<KanbanCard
						key={todoId || index}
						title={item}
						index={index}
						parent={title}
						todoId={todoId}
						onDelete={onDeleteCard}
						onEdit={onEditCard}
					/>
				))}
			</div>
		</div>
	);
};

export default KanbanLane;
