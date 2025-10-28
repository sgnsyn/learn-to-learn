document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-button");
  const contentSections = document.querySelectorAll(".content-section");
  const welcomeSection = document.getElementById("content-welcome");
  const chartSection = document.getElementById("content-techniques");
  let chartInitialized = false;

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");

      navButtons.forEach((btn) => btn.classList.remove("nav-active"));
      button.classList.add("nav-active");

      contentSections.forEach((section) => {
        if (section.id === targetId) {
          section.classList.add("content-active");
          if (section.id === "content-techniques" && !chartInitialized) {
            initLearningChart();
            chartInitialized = true;
          }
        } else {
          section.classList.remove("content-active");
        }
      });
    });
  });

  welcomeSection.classList.add("content-active");

  function initLearningChart() {
    const ctx = document.getElementById("learningChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Passive Re-reading",
          "Highlighting",
          "Active Recall",
          "Practice Testing",
        ],
        datasets: [
          {
            label: "Relative Learning Effectiveness",
            data: [20, 15, 75, 90],
            backgroundColor: [
              "rgba(239, 68, 68, 0.6)",
              "rgba(248, 113, 113, 0.6)",
              "rgba(34, 197, 94, 0.6)",
              "rgba(22, 163, 74, 0.6)",
            ],
            borderColor: [
              "rgba(239, 68, 68, 1)",
              "rgba(248, 113, 113, 1)",
              "rgba(34, 197, 94, 1)",
              "rgba(22, 163, 74, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Effectiveness (Conceptual)",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || "";
                if (label) {
                  label += ": ";
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y + "% Effective";
                }
                return label;
              },
            },
          },
        },
      },
    });
  }
});
