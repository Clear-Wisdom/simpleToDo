import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const KanbanCard = ({ title, index, parent }) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: `card-${title}`,
		data: {
			title,
			index,
			parent,
		},
	});

	const isDragging = Boolean(transform);

	const style = {
		transform: CSS.Transform.toString(transform),
		transition: "none",
		...(isDragging && { visibility: "hidden" }),
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className="bg-white 
            p-2 mt-2 rounded-md shadow-md 
            w-full cursor-grab 
            whitespace-normal break-words"
		>
			{title}
		</div>
	);
};

export default KanbanCard;
