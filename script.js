const films = [
  {
    title: "The Monarch Line",
    status: "Released",
    type: "Feature Film",
    region: "Bollywood / International",
    genre: "Drama",
    synopsis:
      "A sweeping family and power drama designed as a prestige feature placeholder until Alliance provides the official released slate.",
    facts: {
      Format: "Feature film",
      Status: "Released",
      Region: "Bollywood / International",
      Includes: "Synopsis, cast, crew, awards, gallery, press",
    },
    art: "linear-gradient(150deg,#1f080b,#8b5e20 58%,#080504)",
  },
  {
    title: "Empire of Rain",
    status: "In Production",
    type: "Feature Film",
    region: "Hollywood / India",
    genre: "Thriller",
    synopsis:
      "A high-stakes international thriller placeholder showing how in-production films will be presented with confidence and privacy.",
    facts: {
      Format: "Feature film",
      Status: "In Production",
      Region: "Hollywood / India",
      Includes: "Production notes, secured media, partner updates",
    },
    art: "linear-gradient(150deg,#07120d,#145b32 50%,#050403)",
  },
  {
    title: "A Short Before Dawn",
    status: "Upcoming",
    type: "Short Film",
    region: "Global Festival",
    genre: "Human Drama",
    synopsis:
      "A festival-ready short film placeholder for upcoming work, designed to support stills, director statement, and submissions.",
    facts: {
      Format: "Short film",
      Status: "Upcoming",
      Region: "Global Festival",
      Includes: "Director note, stills, festival status, credits",
    },
    art: "linear-gradient(150deg,#120806,#d88416 55%,#111)",
  },
  {
    title: "City of Mirrors",
    status: "Released",
    type: "Short Film",
    region: "India",
    genre: "Mystery",
    synopsis:
      "A polished released-short placeholder showing how smaller works can still feel important inside the studio archive.",
    facts: {
      Format: "Short film",
      Status: "Released",
      Region: "India",
      Includes: "Awards, gallery, credits, related people",
    },
    art: "linear-gradient(150deg,#08080c,#39302d 55%,#070504)",
  },
  {
    title: "The Fifth Take",
    status: "In Production",
    type: "Feature Film",
    region: "Bollywood",
    genre: "Romance / Drama",
    synopsis:
      "A production placeholder for star-led Indian cinema, built to later support locked media, official title art, and PR copy.",
    facts: {
      Format: "Feature film",
      Status: "In Production",
      Region: "Bollywood",
      Includes: "Cast, crew, schedule, production partners",
    },
    art: "linear-gradient(150deg,#180608,#7a1625 54%,#050403)",
  },
  {
    title: "Signal From Home",
    status: "Upcoming",
    type: "Feature Film",
    region: "Hollywood",
    genre: "Science Fiction",
    synopsis:
      "A global-market placeholder for upcoming work, useful for investor conversations and early creative positioning.",
    facts: {
      Format: "Feature film",
      Status: "Upcoming",
      Region: "Hollywood",
      Includes: "Pitch, concept, team, partner opportunity",
    },
    art: "linear-gradient(150deg,#071015,#294666 50%,#050403)",
  },
];

const people = [
  {
    name: "Alliance Director",
    role: "Director / Producer",
    bio:
      "Leadership profile placeholder for the Alliance director, with space for biography, released work, awards, and selected credits.",
    credits: ["Feature Films", "Short Films", "International Collaborations"],
    art: "linear-gradient(150deg,#0d0906,#7a5a24 55%,#080504)",
  },
  {
    name: "Executive Producer",
    role: "Executive Producer",
    bio:
      "A senior production profile designed to show financing, packaging, development, and distribution experience.",
    credits: ["Film Finance", "Production Strategy", "Studio Partnerships"],
    art: "linear-gradient(150deg,#06110a,#155e35 54%,#050403)",
  },
  {
    name: "Creative Producer",
    role: "Creative Producer",
    bio:
      "Profile placeholder for creative development, story selection, filmmaker relationships, and festival positioning.",
    credits: ["Development", "Creative Packaging", "Festival Strategy"],
    art: "linear-gradient(150deg,#150706,#d98a18 55%,#050403)",
  },
  {
    name: "Head of Production",
    role: "Production Lead",
    bio:
      "Operational profile for production planning, physical production, budgeting, scheduling, and crew coordination.",
    credits: ["Physical Production", "Budgets", "Scheduling"],
    art: "linear-gradient(150deg,#08080b,#403936 55%,#050403)",
  },
  {
    name: "Writer / Creator",
    role: "Writer / Creator",
    bio:
      "A creator profile that can show previous screenplays, story worlds, awards, and works in development.",
    credits: ["Screenwriting", "Story Development", "Short Films"],
    art: "linear-gradient(150deg,#0d0709,#7d1c27 55%,#050403)",
  },
  {
    name: "Cinematographer",
    role: "Director of Photography",
    bio:
      "A craft profile for cinematography, look books, visual references, previous films, and production stills.",
    credits: ["Cinematography", "Visual Language", "Feature Films"],
    art: "linear-gradient(150deg,#071014,#1d4a5d 54%,#050403)",
  },
];

const filmGrid = document.querySelector("#filmGrid");
const peopleGrid = document.querySelector("#peopleGrid");
const detailKicker = document.querySelector("#detailKicker");
const detailTitle = document.querySelector("#detailTitle");
const detailBody = document.querySelector("#detailBody");
const detailFacts = document.querySelector("#detailFacts");

function renderFilms(filter = "all") {
  filmGrid.innerHTML = "";
  films
    .filter((film) => filter === "all" || film.status === filter)
    .forEach((film) => {
      const card = document.createElement("article");
      card.className = "film-card";
      card.innerHTML = `
        <div class="film-art" style="--card-bg:${film.art}"></div>
        <span class="status">${film.status}</span>
        <h3>${film.title}</h3>
        <p>${film.type} · ${film.region} · ${film.genre}</p>
      `;
      card.addEventListener("click", () => showFilm(film));
      filmGrid.appendChild(card);
    });
}

function renderPeople() {
  peopleGrid.innerHTML = "";
  people.forEach((person) => {
    const card = document.createElement("article");
    card.className = "person-card";
    card.innerHTML = `
      <div class="person-art" style="--card-bg:${person.art}"></div>
      <span class="status">${person.role}</span>
      <h3>${person.name}</h3>
      <p>${person.credits.join(" · ")}</p>
    `;
    card.addEventListener("click", () => showPerson(person));
    peopleGrid.appendChild(card);
  });
}

function showFilm(film) {
  detailKicker.textContent = `${film.status} · ${film.type}`;
  detailTitle.textContent = film.title;
  detailBody.textContent = film.synopsis;
  detailFacts.innerHTML = Object.entries(film.facts)
    .map(([key, value]) => `<dt>${key}</dt><dd>${value}</dd>`)
    .join("");
  document.querySelector("#detailDrawer").scrollIntoView({ behavior: "smooth", block: "center" });
}

function showPerson(person) {
  detailKicker.textContent = person.role;
  detailTitle.textContent = person.name;
  detailBody.textContent = person.bio;
  detailFacts.innerHTML = `
    <dt>Credits</dt><dd>${person.credits.join(", ")}</dd>
    <dt>Profile Page</dt><dd>Biography, selected works, awards, related films</dd>
    <dt>CMS Fields</dt><dd>Portrait, role, credits, gallery, external links</dd>
  `;
  document.querySelector("#detailDrawer").scrollIntoView({ behavior: "smooth", block: "center" });
}

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("active"));
    button.classList.add("active");
    renderFilms(button.dataset.filter);
  });
});

renderFilms();
renderPeople();
