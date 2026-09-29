import axios from "axios";

export const fetchProductData = async (category, token) => {
    try {
        const response = await axios.get("http://localhost:8080/fetchProductData", {
            params: { category },
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error while fetching product:", error);
        throw error;
    }
};
