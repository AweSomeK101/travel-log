const API_URL = "http://localhost:6969";

export async function listLogEntries(){
    const response = await fetch(`${API_URL}/api/log`);
    return response.json();
}

export async function createLogEntry(entry){
    const response = await fetch(`${API_URL}/api/log`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(entry)
    });
    return response.json();
}