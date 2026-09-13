```javascript
document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     CODE COUNT
  ========================= */

  const cards = document.querySelectorAll(".code-card");
  const codeCount = document.getElementById("codeCount");

  let count = 0;

  function animateCount() {

    const target = cards.length;

    const timer = setInterval(() => {

      count++;

      codeCount.textContent = count;

      if (count >= target) {
        clearInterval(timer);
      }

    }, 120);

  }

  animateCount();


  /* =========================
     COPY CODE
  ========================= */

  const copyButtons = document.querySelectorAll(".copy-btn");
  const toast = document.getElementById("toast");

  copyButtons.forEach(button => {

    button.addEventListener("click", async () => {

      const code = button.dataset.code;

      try {

        await navigator.clipboard.writeText(code);

        showToast("✅ Code copied!");

        const originalText = button.textContent;

        button.textContent = "COPIED!";

        setTimeout(() => {
          button.textContent = originalText;
        }, 1500);

      } catch (error) {

        /* Fallback for browsers that block clipboard access */

        const temporaryInput = document.createElement("textarea");

        temporaryInput.value = code;

        document.body.appendChild(temporaryInput);

        temporaryInput.select();

        document.execCommand("copy");

        temporaryInput.remove();

        showToast("✅ Code copied!");

      }

    });

  });


  /* =========================
     TOAST
  ========================= */

  let toastTimer;

  function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

      toast.classList.remove("show");

    }, 2000);

  }


  /* =========================
     SEARCH
  ========================= */

  const searchInput = document.getElementById("searchInput");
  const noResults = document.getElementById("noResults");

  searchInput.addEventListener("input", () => {

    const search = searchInput.value
      .toLowerCase()
      .trim();

    let visibleCards = 0;

    cards.forEach(card => {

      const name = card.dataset.name.toLowerCase();

      const description = card
        .querySelector("p")
        .textContent
        .toLowerCase();

      if (
        name.includes(search) ||
        description.includes(search)
      ) {

        card.style.display = "block";

        visibleCards++;

      } else {

        card.style.display = "none";

      }

    });

    if (visibleCards === 0) {

      noResults.style.display = "block";

    } else {

      noResults.style.display = "none";

    }

  });


  /* =========================
     CARD MOUSE EFFECT
  ========================= */

  cards.forEach(card => {

    card.addEventListener("mousemove", event => {

      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX =
        (y - centerY) / 25;

      const rotateY =
        (centerX - x) / 25;

      card.style.transform =
        `perspective(700px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         translateY(-8px)`;

    });

    card.addEventListener("mouseleave", () => {

      card.style.transform = "";

    });

  });


  /* =========================
     RANDOM SHOOTING STARS
  ========================= */

  function createShootingStar() {

    const star = document.createElement("div");

    star.style.position = "fixed";
    star.style.width = "2px";
    star.style.height = "100px";
    star.style.background =
      "linear-gradient(transparent, white)";

    star.style.top =
      Math.random() * 70 + "%";

    star.style.left =
      Math.random() * 100 + "%";

    star.style.transform =
      "rotate(45deg)";

    star.style.opacity = "0";

    star.style.pointerEvents = "none";

    star.style.zIndex = "-1";

    document.body.appendChild(star);

    star.animate(
      [
        {
          opacity: 0,
          transform: "translate(0, 0) rotate(45deg)"
        },
        {
          opacity: 1,
          transform: "translate(-250px, 250px) rotate(45deg)"
        },
        {
          opacity: 0,
          transform: "translate(-500px, 500px) rotate(45deg)"
        }
      ],
      {
        duration: 1200,
        easing: "ease-out"
      }
    );

    setTimeout(() => {
      star.remove();
    }, 1300);

  }


  setInterval(
    createShootingStar,
    2500
  );


  /* =========================
     BUTTON RIPPLE
  ========================= */

  document
    .querySelectorAll(".primary-btn, .secondary-btn")
    .forEach(button => {

      button.addEventListener("click", () => {

        button.style.transform =
          "scale(0.96)";

        setTimeout(() => {

          button.style.transform = "";

        }, 120);

      });

    });

});
```

