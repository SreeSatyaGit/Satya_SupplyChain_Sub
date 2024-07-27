export const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
