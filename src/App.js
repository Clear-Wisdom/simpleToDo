import KanbanBoard from "./components/KanbanBoard";

function App() {
	return (
		<div className="min-h-screen bg-[#fdfaf2] flex flex-col">
			<h1 className="my-10 text-4xl font-light text-center">Simple ToDo</h1>
			<KanbanBoard />
		</div>
	);
}

export default App;
