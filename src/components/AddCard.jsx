import { useState } from "react";

const AddCard = ({ addCard }) => {
	const [title, setTitle] = useState("");

	return (
		<div className="flex flex-3 p-5">
			<div className="flex-1 bg-white rounded-md shadow-md flex flex-row p-2">
				<input
					className="flex-grow border border-gray-300 rounded-md px-2 py-1"
					placeholder="Card Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<button
					className="ml-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
					onClick={() => {
						addCard(title);
						setTitle("");
					}}
				>
					Add Card
				</button>
			</div>
		</div>
	);
};

export default AddCard;
