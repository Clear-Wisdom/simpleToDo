const API_BASE_URL =
	"https://v9bwxt4z1i.execute-api.ap-northeast-2.amazonaws.com/teststage";

export const getTodos = async (userId) => {
	try {
		const response = await fetch(
			`${API_BASE_URL}/getToDo?userId=${encodeURIComponent(userId)}`
		);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Error fetching todos:", error);
		throw error;
	}
};

export const createTodo = async (userId, title) => {
	try {
		const response = await fetch(`${API_BASE_URL}/postTodo`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userId, title }),
		});
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Error creating todo:", error);
		throw error;
	}
};

export const updateTodo = async (userId, todoId, title, status) => {
	try {
		const response = await fetch(`${API_BASE_URL}/putTodo`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userId, todoId, title, status }),
		});
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Error updating todo:", error);
		throw error;
	}
};

export const deleteTodo = async (userId, todoId) => {
	try {
		const response = await fetch(`${API_BASE_URL}/deleteTodo`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userId, todoId }),
		});
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error("Error deleting todo:", error);
		throw error;
	}
};
