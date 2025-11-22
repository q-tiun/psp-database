// -------------------------------
// FIREBASE PSP DATABASE FRONTEND
// -------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    getDocs 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// -------------------------------
// FIREBASE CONFIG (REPLACE THIS)
// -------------------------------
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_AUTH_DOMAIN_HERE",
    projectId: "YOUR_PROJECT_ID_HERE",
    storageBucket: "YOUR_STORAGE_BUCKET_HERE",
    messagingSenderId: "YOUR_MSG_SENDER_ID_HERE",
    appId: "YOUR_APP_ID_HERE"
};

// If you haven't set Firebase yet, leave it like this:
// It won't break anything — it just won't load player data yet.

// -------------------------------
// INIT
// -------------------------------
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// -------------------------------
// LOAD PLAYER DATA
// -------------------------------
async function loadPlayers() {
    const tbody = document.getElementById("player-table");

    try {
        const snap = await getDocs(collection(db, "players"));

        snap.forEach(doc => {
            const p = doc.data();
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${p.name}</td>
                <td>${p.team}</td>
                <td>${p.prop}</td>
                <td>${p.line}</td>
                <td class="${p.ev >= 0 ? "positive" : "negative"}">${p.ev}%</td>
                <td>${p.notes}</td>
            `;

            tbody.appendChild(row);
        });

    } catch (err) {
        console.log("Firebase not connected yet or no data found.");
        console.log(err);
    }
}

loadPlayers();
