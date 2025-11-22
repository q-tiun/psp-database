import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.getElementById("testBtn").addEventListener("click", async () => {
    try {
        await addDoc(collection(db, "testing"), {
            createdBy: "Jacob",
            timestamp: Date.now()
        });
        alert("Data added!");
    } catch (err) {
        alert("Error: " + err.message);
    }
});
