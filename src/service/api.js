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
        console.log(result)
        const data = await result.json();
        return { data }
    }
    

    return {
        async getImages(limit=10, page=1) {
            const { data } = await GET(`v1/images/search?limit=${limit}&page=${page}`);
            return data
        },
    }
}