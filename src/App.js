import KanbanBoard from "./components/KanbanBoard";
import Login from "./components/Login";

function App() {
	return (
		<div className="min-h-screen bg-[#fdfaf2] flex flex-col">
			<h1 className="my-10 text-4xl font-light text-center">Simple ToDo</h1>
			<Login />
			<KanbanBoard />
		</div>
	);
}

export default App;
