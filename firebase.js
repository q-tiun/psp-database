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
// FIREBASE CONFIG (YOUR REAL ONE)
// -------------------------------
const firebaseConfig = {
    apiKey: "AIzaSyA5Gt3j3y234TynWq2iJ2yFtQcCbd8ZwqG",
    authDomain: "psp-database-8e5d0.firebaseapp.com",
    projectId: "psp-database-8e5d0",
    storageBucket: "psp-database-8e5d0.firebasestorage.app", // FIXED THIS
    messagingSenderId: "1070266297294",
    appId: "1:1070266297294:web:56b04860f949f2a09bfbf3",
    measurementId: "G-BYCRMHYLJY"
};

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
