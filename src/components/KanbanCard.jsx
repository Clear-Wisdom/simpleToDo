import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const KanbanCard = ({ title, index, parent, onDelete, onEdit }) => {
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

	const [isEditing, setIsEditing] = useState(false);
	const [editText, setEditText] = useState(title);
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...(!isEditing ? { ...attributes, ...listeners } : {})}
			className="relative bg-white 
            p-2 mt-2 rounded-md shadow-md 
            w-full cursor-grab 
            whitespace-normal break-words"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{/* Hover 시 보이는 버튼들 */}
			{!isDragging && isHovered && (
				<div className="absolute top-1 right-1 transition-opacity duration-200">
					<button
						className="text-xs bg-blue-500 text-white rounded px-1 mr-1"
						onPointerDown={(e) => e.stopPropagation()}
						onMouseDown={(e) => e.stopPropagation()}
						onClick={(e) => {
							e.stopPropagation();
							setIsEditing(true);
						}}
					>
						Edit
					</button>
					<button
						className="text-xs bg-red-500 text-white rounded px-1"
						onPointerDown={(e) => e.stopPropagation()}
						onMouseDown={(e) => e.stopPropagation()}
						onClick={(e) => {
							e.stopPropagation();
							onDelete(index, parent);
						}}
					>
						Delete
					</button>
				</div>
			)}

			{isEditing ? (
				<div>
					<input
						type="text"
						className="border border-gray-300 rounded px-1 py-0.5 w-full"
						value={editText}
						onChange={(e) => setEditText(e.target.value)}
						onMouseDown={(e) => e.stopPropagation()}
					/>
					<button
						className="mt-1 text-xs bg-green-500 text-white rounded px-1"
						onPointerDown={(e) => e.stopPropagation()}
						onMouseDown={(e) => e.stopPropagation()}
						onClick={() => {
							onEdit(index, parent, editText);
							setIsEditing(false);
						}}
					>
						Save
					</button>
					<button
						className="mt-1 ml-1 text-xs bg-gray-500 text-white rounded px-1"
						onPointerDown={(e) => e.stopPropagation()}
						onMouseDown={(e) => e.stopPropagation()}
						onClick={() => {
							setIsEditing(false);
							setEditText(title);
						}}
					>
						Cancel
					</button>
				</div>
			) : (
				<span>{title}</span>
			)}
		</div>
	);
};

export default KanbanCard;
