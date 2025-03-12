import AddCard from "./AddCard";
import KanbanLane from "./KanbanLane";
import KanbanCard from "./KanbanCard";
import { useState, useEffect, useCallback } from "react";
import { DragOverlay, DndContext, rectIntersection } from "@dnd-kit/core";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../api";

const KanbanBoard = ({ user }) => {
	const [doneItems, setDoneItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [activeCard, setActiveCard] = useState(null);
	const [urgentItems, setUrgentItems] = useState([]);
	const [inProgressItems, setInProgressItems] = useState([]);
	const [notStartedItems, setNotStartedItems] = useState([]);

	// 데이터 로드 함수
	const loadTodos = useCallback(async () => {
		if (!user) return;

		setIsLoading(true);
		try {
			const todos = await getTodos(user);
			console.log("Fetched data:", todos);

			// 상태별로 할 일 분류
			const urgent = [];
			const inProgress = [];
			const done = [];
			const notStarted = [];

			todos.forEach((todo) => {
				const item = {
					title: todo.title,
					todoId: todo.todoId,
				};

				switch (todo.status) {
					case "Urgent":
						urgent.push(item);
						break;
					case "InProgress":
						inProgress.push(item);
						break;
					case "Done":
						done.push(item);
						break;
					case "Not started":
					default:
						notStarted.push(item);
						break;
				}
			});

			setUrgentItems(urgent);
			setDoneItems(done);
			setInProgressItems(inProgress);
			setNotStartedItems(notStarted);
		} catch (error) {
			console.error("Failed to load todos:", error);
		} finally {
			setIsLoading(false);
		}
	}, [user]);

	// 사용자 로그인 시 또는 컴포넌트 마운트 시 데이터 로드
	useEffect(() => {
		loadTodos();
	}, [user, loadTodos]);

	const addNewCard = async (title) => {
		if (!user) return;

		try {
			await createTodo(user, title);
			loadTodos();
		} catch (error) {
			console.error("Failed to add todo:", error);
		}
	};

	const handleDeleteCard = async (index, parent) => {
		if (!user) return;

		let todoId;

		if (parent === "Urgent") {
			todoId = urgentItems[index].todoId;
		} else if (parent === "Done") {
			todoId = doneItems[index].todoId;
		} else if (parent === "Not started") {
			todoId = notStartedItems[index].todoId;
		} else {
			todoId = inProgressItems[index].todoId;
		}

		try {
			await deleteTodo(user, todoId);
			loadTodos();
		} catch (error) {
			console.error("Failed to delete todo:", error);
		}
	};

	const handleEditCard = async (index, parent, newTitle) => {
		if (!user) return;

		let todoId;

		if (parent === "Urgent") {
			todoId = urgentItems[index].todoId;
		} else if (parent === "Done") {
			todoId = doneItems[index].todoId;
		} else if (parent === "Not started") {
			todoId = notStartedItems[index].todoId;
		} else {
			todoId = inProgressItems[index].todoId;
		}

		try {
			await updateTodo(user, todoId, newTitle, parent);
			// 데이터 다시 로드
			loadTodos();
		} catch (error) {
			console.error("Failed to update todo:", error);
		}
	};

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

	return (
		<DndContext
			collisionDetection={rectIntersection}
			onDragStart={({ active }) => {
				setActiveCard(active.data.current);
			}}
			onDragEnd={async (e) => {
				const container = e.over?.id;
				const { title, index, parent, todoId } = e.active.data.current;

				if (!container || container === parent || !user) {
					setActiveCard(null);
					return;
				}

				try {
					await updateTodo(user, todoId, title, container);
					loadTodos();
				} catch (error) {
					console.error("Failed to update todo status:", error);
				}

				setActiveCard(null);
			}}
		>
			<div className="flex flex-col w-full">
				{user && <AddCard addCard={addNewCard} />}
				{isLoading ? (
					<div className="text-center py-4">Loading...</div>
				) : (
					<div className="flex w-full justify-evenly items-start gap-2">
						{arrayLanes.map(
							({ title, items, titleColor, bodyColor }, index) => (
								<KanbanLane
									key={index}
									title={title}
									items={items}
									titleColor={titleColor}
									bodyColor={bodyColor}
									onDeleteCard={handleDeleteCard}
									onEditCard={handleEditCard}
								/>
							)
						)}
					</div>
				)}
			</div>
			<DragOverlay>
				{activeCard ? (
					<KanbanCard
						title={activeCard.title}
						index={activeCard.index}
						parent={activeCard.parent}
						todoId={activeCard.todoId}
					/>
				) : null}
			</DragOverlay>
		</DndContext>
	);
};

export default KanbanBoard;
