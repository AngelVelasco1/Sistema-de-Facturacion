const urlEndPoint = "http://localhost:5000";

/* Method get (Get items) */
export const getItem = async (item) => {
    try {
        const response = await fetch(`${urlEndPoint}/items`, {
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
/* Method post (Add items) */
export const addItem = async (item) => {
    try {
        const response = await fetch(`${urlEndPoint}/items`, {
            method: 'POST',
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

