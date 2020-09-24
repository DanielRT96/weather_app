const weatherAPI = 

async function callAPI(apiURL) {
    const result = await fetch(apiURL);
    const data = await result.json();
    return data;
}
