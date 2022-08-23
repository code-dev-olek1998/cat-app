import {API_URL, API_TOKEN} from "@env"
export function useApi() {

    async function GET(url) {
        const result = await fetch(`${API_URL}${url}&api_key=${API_TOKEN}`, {
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
            const { data } = await GET(`v1/images/search?limit=10&page=${page}`);
            return data
        },
    }
}