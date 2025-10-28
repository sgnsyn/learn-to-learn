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

  const ball = document.getElementById("pinball-ball");
  const bumperContainer = document.getElementById("pinball-bumpers");
  const focusedBtn = document.getElementById("show-focused-btn");
  const diffuseBtn = document.getElementById("show-diffuse-btn");

  const focusedBumpers = [
    { top: "30%", left: "40%" },
    { top: "50%", left: "45%" },
    { top: "70%", left: "35%" },
    { top: "20%", left: "55%" },
    { top: "40%", left: "60%" },
    { top: "60%", left: "50%" },
  ];

  const diffuseBumpers = [
    { top: "20%", left: "15%" },
    { top: "70%", left: "80%" },
    { top: "50%", left: "50%" },
    { top: "80%", left: "30%" },
    { top: "10%", left: "70%" },
  ];

  function createBumpers(bumpers) {
    bumperContainer.innerHTML = "";
    bumpers.forEach((b) => {
      const bumper = document.createElement("div");
      bumper.className = "bumper";
      bumper.style.top = b.top;
      bumper.style.left = b.left;
      bumperContainer.appendChild(bumper);
    });
  }

  focusedBtn.addEventListener("click", () => {
    createBumpers(focusedBumpers);
    ball.style.transition = "none";
    ball.style.transform = "translate(-50%, -50%)";
    ball.classList.remove("diffuse-anim", "focused-anim");

    setTimeout(() => {
      ball.style.transition = "all 1.5s ease-in-out";
      ball.classList.add("focused-anim");
    }, 50);
  });

  diffuseBtn.addEventListener("click", () => {
    createBumpers(diffuseBumpers);
    ball.style.transition = "none";
    ball.style.transform = "translate(-50%, -50%)";
    ball.classList.remove("focused-anim", "diffuse-anim");

    setTimeout(() => {
      ball.style.transition = "all 1.5s ease-out";
      ball.classList.add("diffuse-anim");
    }, 50);
  });

  createBumpers(focusedBumpers);
});
