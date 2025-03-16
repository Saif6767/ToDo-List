export const loginUser = async (email, password) => {
    try {
        const response = await fetch("https://todo-list-97xk.onrender.com/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Login failed.");

        return data;
    } catch (error) {
        throw new Error(error.message || "Something went wrong.");
    }
};
