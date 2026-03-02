let currentUser = "";
let chartInstance;

function handleLogin(e) {
    e.preventDefault();

    const name = document.getElementById("username").value.trim();
    if (!name) return;

    currentUser = name;

    document.getElementById("auth-screen").classList.add("hidden");
    document.getElementById("main-app").classList.remove("hidden");

    document.getElementById("user-display").innerText = name;
    document.getElementById("user-initial").innerText = name.charAt(0).toUpperCase();

    initChart();
}

function switchPage(page, event) {
    document.querySelectorAll(".section").forEach(s =>
        s.classList.add("section-hidden")
    );

    document.querySelectorAll(".nav-item").forEach(n =>
        n.classList.remove("active")
    );

    document.getElementById("page-" + page).classList.remove("section-hidden");
    event.target.classList.add("active");
}

function initChart() {
    const ctx = document.getElementById("mainChart").getContext("2d");

    chartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["09:00", "12:00", "15:00"],
            datasets: [
                {
                    label: "ความเครียด",
                    data: [20, 40, 30],
                    borderColor: "#667eea",
                    tension: 0.4
                }
            ]
        }
    });
}

function startAnalyze() {
    const value = Math.floor(Math.random() * 100);
    chartInstance.data.labels.push(new Date().toLocaleTimeString());
    chartInstance.data.datasets[0].data.push(value);
    chartInstance.update();
}

function handleChat() {
    const input = document.getElementById("chat-input");
    const msg = input.value.trim();
    if (!msg) return;

    addMessage(msg, "user");
    input.value = "";

    setTimeout(() => {
        addMessage("AI: ดูแลสุขภาพด้วยนะ 😊", "bot");
    }, 500);
}

function addMessage(text, type) {
    const div = document.getElementById("chat-messages");
    const msg = document.createElement("div");
    msg.className = "chat-bubble " + type;
    msg.innerText = text;
    div.appendChild(msg);
    div.scrollTop = div.scrollHeight;
}