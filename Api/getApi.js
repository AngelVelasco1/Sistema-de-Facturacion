const urlEndPoint = "http://localhost:4001";

/* Method get (Get reclutas) */
export const getReclutas = async (item) => {
    try {
        const response = await fetch(`${urlEndPoint}/reclutas`, {
            method: 'GET',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const items = await response.json()
        return items;
    }
    catch (err) {
        console.log(err);
    }
}
/* Method get (Get teams) */
export const getTeams = async (item) => {
    try {
        const response = await fetch(`${urlEndPoint}/teams`, {
            method: 'GET',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const items = await response.json()
        return items;
    }
    catch (err) {
        console.log(err);
    }
}
/* Method get (Get skills) */
export const getSkills = async (item) => {
    try {
        const response = await fetch(`${urlEndPoint}/skills`, {
            method: 'GET',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const items = await response.json()
        return items;
    }
    catch (err) {
        console.log(err);
    }
}

