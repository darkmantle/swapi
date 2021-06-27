export const getPlanetById = async (id) => {
    let resp = await fetch(`https://swapi.dev/api/planets/${id}`);
    return resp.json();
}

// Get data from every page of planets
export const getAllPlanets = async () => {

    let page = 1, results: any = [], resp, json;

    do {
        resp = await fetch("https://swapi.dev/api/planets?page=" + page);
        json = await resp.json();
        results = results.concat(json.results);
        page++;
    } while (json.next);

    return results;
}