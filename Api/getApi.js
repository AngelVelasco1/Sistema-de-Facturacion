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
/* Method POST (add camper) */
export const addCamper = async (camper) => {
    try {
        const response = await fetch(`${urlEndPoint}/reclutas`, {
            method: 'POST',
            body: JSON.stringify(camper),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        window.location.href = "../index.html";
        const items = await response.json()
        return items;
    }
    catch (err) {
        console.log(err);
    }
}
