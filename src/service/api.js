import {API_URL, API_TOKEN} from "@env"
export function useApi() {

    async function GET(url) {
        console.log(`${API_URL}${url}`);
        const result = await fetch(`${API_URL}${url}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
            }
        });
        const data = await result.json();
        return { data }
    }
    

    return {
        async getImages(page=1) {
            const { data } = await GET(`images/search?limit=10&page=${page}&api_key=${API_TOKEN}`);
            return data
        },
        async getBreeds() {
            const { data } = await GET(`breeds`);
            return data
        },
        async getBreed(id) {
            const { data } = await GET(`breeds`);
            return data
        },
    }
}