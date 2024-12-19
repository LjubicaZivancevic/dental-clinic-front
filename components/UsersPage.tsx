"use client";
import { useEffect, useState } from "react";

export default function UsersPage() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await fetch("http://localhost:5000/api/users");
				const data = await res.json();
				setUsers(data);
			} catch (err) {
				setError("Error fetching users");
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	const addUser = async (e: any) => {
		e.preventDefault();
		const user = {
			name: "User12234",
			email: "user23@example.com",
			password: "12345",
			role: "patient",
		};
		try {
			const res = await fetch("http://localhost:5000/api/users", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});

			const data = await res.json();

			if (res.status === 201) {
				setMessage("User created successfully!");
			} else {
				setMessage(data.error || "Error creating user");
			}
		} catch (error) {
			setMessage("Failed to create user");
		}
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div>
			<h1>Users</h1>
			<ul>
				{users?.map((user: any) => (
					<li key={user?.id}>
						{user?.ime}
						{user?.name}
					</li>
				))}
			</ul>
			<button onClick={(e) => addUser(e)}>Dodaj usera</button>
		</div>
	);
}
