
"use strict";

// 1. Array of objects containing city reports
const cityReports = [
    {
        id: 1,
        title: "Broken Street Light",
        description: "Street light is not working.",
        location: "Abay Avenue",
        status: "New"
    },
    {
        id: 2,
        title: "Pothole",
        description: "Large pothole on the road.",
        location: "Saryarka District",
        status: "In Progress"
    },
    {
        id: 3,
        title: "Garbage",
        description: "Garbage container is full.",
        location: "Yesil District",
        status: "Resolved"
    },
    {
        id: 4,
        title: "Traffic Light",
        description: "Traffic light is not working.",
        location: "Central District",
        status: "New"
    },
    {
        id: 5,
        title: "Water Leak",
        description: "Water is leaking near the road.",
        location: "Baykonyr District",
        status: "In Progress"
    },
    {
        id: 6,
        title: "Fallen Tree",
        description: "A tree is blocking the sidewalk.",
        location: "Almaty District",
        status: "Resolved"
    }
];

// 2. Select HTML elements
const reportsTableBody = document.getElementById("reportsTableBody");

const filterLinks = document.querySelectorAll(
    ".sidebar a.allr, .sidebar a.newr, " +
    ".sidebar a.inpr, .sidebar a.rsl"
);

// 3. Create a table cell safely
function createCell(text, className = "") {
    const cell = document.createElement("td");
    cell.textContent = text;

    if (className) {
        cell.classList.add(className);
    }

    return cell;
}

// 4. Get CSS class for each report status
function getStatusClass(status) {
    switch (status) {
        case "New":
            return "status-new";
        case "In Progress":
            return "status-progress";
        case "Resolved":
            return "status-resolved";
        default:
            return "";
    }
}

// 5. Render reports in the table using forEach()
function renderReports(reports) {
    if (!reportsTableBody) {
        console.error("Reports table body not found.");
        return;
    }

    reportsTableBody.replaceChildren();

    reports.forEach(function(report, index) {
        const row = document.createElement("tr");

        // Stagger the row animation
        row.style.animationDelay = `${index * 50}ms`;

        row.append(
            createCell(String(report.id).padStart(3, "0")),
            createCell(report.title),
            createCell(report.description),
            createCell(report.location),
            createCell(
                report.status,
                getStatusClass(report.status)
            )
        );

        reportsTableBody.appendChild(row);
    });

    // Show a message when no reports match
    if (reports.length === 0) {
        const row = document.createElement("tr");
        const cell = createCell("No reports found.");
        cell.colSpan = 5;

        row.appendChild(cell);
        reportsTableBody.appendChild(row);
    }
}

// 6. Filter reports using filter()
function filterReports(status) {
    let filteredReports;

    if (status === "All") {
        filteredReports = cityReports;
    } else {
        filteredReports = cityReports.filter(function(report) {
            return report.status === status;
        });
    }

    renderReports(filteredReports);
}

// 7. Play a short notification sound
let audioContext;

function playNotificationSound() {
    try {
        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClass) {
            return;
        }

        if (!audioContext) {
            audioContext = new AudioContextClass();
        }

        if (audioContext.state === "suspended") {
            audioContext.resume().catch(function(error) {
                console.warn("Audio could not start:", error);
            });
        }

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = 660;

        gain.gain.setValueAtTime(0.06, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audioContext.currentTime + 0.12
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.12);
    } catch (error) {
        console.warn("Sound could not be played:", error);
    }
}

// 8. Handle sidebar filter clicks
filterLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        let selectedStatus;

        if (link.classList.contains("allr")) {
            selectedStatus = "All";
        } else if (link.classList.contains("newr")) {
            selectedStatus = "New";
        } else if (link.classList.contains("inpr")) {
            selectedStatus = "In Progress";
        } else if (link.classList.contains("rsl")) {
            selectedStatus = "Resolved";
        }

        filterReports(selectedStatus);

        // Highlight the active filter
        filterLinks.forEach(function(item) {
            item.classList.remove("active-filter");
        });

        link.classList.add("active-filter");

        playNotificationSound();
    });
});

// 9. Display all reports when the page opens
renderReports(cityReports);
