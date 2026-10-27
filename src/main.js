
import './style.css'

const movies = [
  {
    id: 1,
    title: 'The Last Frontier',
    year: 2025,
    genre: 'Adventure',
    description: 'An original placeholder story about a journey into the unknown.',
    color: '#365b4c',
    symbol: '⛰️',
    featured: true
  },
  {
    id: 2,
    title: 'Midnight Signal',
    year: 2024,
    genre: 'Mystery',
    description: 'A strange signal leads a night-shift radio host into a mystery.',
    color: '#3b345e',
    symbol: '🌙'
  },
  {
    id: 3,
    title: 'Red Horizon',
    year: 2023,
    genre: 'Sci-Fi',
    description: 'A fictional crew searches for a new home among distant stars.',
    color: '#743b35',
    symbol: '🪐'
  },
  {
    id: 4,
    title: 'Silent Kingdom',
    year: 2022,
    genre: 'Drama',
    description: 'An original tale of a forgotten kingdom and its last guardian.',
    color: '#6a5437',
    symbol: '🏰'
  },
  {
    id: 5,
    title: 'Deep Blue',
    year: 2021,
    genre: 'Adventure',
    description: 'A marine explorer discovers a hidden world beneath the waves.',
    color: '#234e65',
    symbol: '🌊'
  },
  {
    id: 6,
    title: 'After the Rain',
    year: 2020,
    genre: 'Drama',
    description: 'Two strangers find a fresh beginning in a quiet city.',
    color: '#465044',
    symbol: '🌧️'
  }
]

const app = document.querySelector('#app')


function getLogo() {
  return `
    <a class="brand" href="/" aria-label="ANGKOR STREAM home">
      <img
        class="brand-logo"
        src="/angkor-stream-logo.png"
        alt="ANGKOR STREAM"
      />
    </a>
  `
}


function movieCard(movie) {
  return `
    <button class="movie-card" data-movie="${movie.id}" aria-label="View ${movie.title}">
      <span class="poster" style="--poster-color:${movie.color}">
        <span class="poster-symbol">${movie.symbol}</span>
        <span class="poster-title">${movie.title}</span>
        <span class="poster-bottom">ANGKOR ORIGINALS</span>
      </span>
      <span class="movie-meta">
        <span class="movie-title">${movie.title}</span>
        <span class="movie-subtitle">${movie.year} · ${movie.genre}</span>
      </span>
    </button>
  `
}

function renderHome(query = '') {
  const filtered = movies.filter(movie =>
    `${movie.title} ${movie.genre} ${movie.year}`
      .toLowerCase()
      .includes(query.toLowerCase())
  )

  app.innerHTML = `
    <header class="topbar">
      ${getLogo()}
      <nav class="nav-links">
        <a href="#" class="active">Home</a>
        <a href="#collection">Movies</a>
        <a href="#about">About</a>
      </nav>
      <label class="search-box">
        <span>⌕</span>
        <input id="movie-search" type="search" placeholder="Search movies..." value="${query.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')}" aria-label="Search movies">
      </label>
    </header>

    <main>
      <section class="hero">
        <div class="hero-glow"></div>
        <div class="hero-content">
          <span class="eyebrow"><i></i> YOUR NEXT MOVIE NIGHT</span>
          <h1>STORIES THAT<br><span>STAY WITH YOU.</span></h1>
          <p>Discover timeless cinema and extraordinary stories, all in one place.</p>
          <div class="hero-actions">
            <button class="primary-button" data-movie="1">▶ &nbsp; Explore featured film</button>
            <a class="secondary-button" href="#collection">Browse collection &nbsp; ↓</a>
          </div>
          <span class="hero-note">INDEPENDENT CINEMA · ENDLESS DISCOVERY</span>
        </div>
        <div class="hero-art" aria-hidden="true">
          <div class="hero-orbit orbit-one"></div>
          <div class="hero-orbit orbit-two"></div>
          <div class="hero-moon"></div>
          <div class="hero-mountain mountain-back"></div>
          <div class="hero-mountain mountain-front"></div>
          <span class="hero-art-label">A NEW WORLD<br>AWAITS YOU</span>
        </div>
        <span class="hero-index">01 / DISCOVER</span>
      </section>

      <section class="collection" id="collection">
        <div class="section-heading">
          <div>
            <span class="eyebrow">HANDPICKED FOR YOU</span>
            <h2>${query ? 'SEARCH RESULTS' : 'EXPLORE THE COLLECTION'}</h2>
          </div>
          <span class="result-count">${filtered.length} FILMS</span>
        </div>
        <div class="movie-grid">
          ${filtered.map(movieCard).join('')}
        </div>
        ${filtered.length ? '' : '<p class="empty-state">No films found. Try another title or genre.</p>'}
      </section>

      <section class="about" id="about">
        <span class="eyebrow">A WORLD OF STORIES</span>
        <h2>Good cinema.<br><span>No unnecessary noise.</span></h2>
        <p>ANGKOR STREAM is being built for curious movie lovers. Our collection will grow as we add films with verified viewing rights.</p>
      </section>
    </main>

    <footer>
      ${getLogo()}
      <span>© ${new Date().getFullYear()} ANGKOR STREAM</span>
      <span>MADE FOR MOVIE LOVERS</span>
    </footer>
  `

  document.querySelector('#movie-search').addEventListener('input', event => {
    const position = event.target.selectionStart
    const value = event.target.value
    renderHome(value)
    const input = document.querySelector('#movie-search')
    input.focus()
    input.setSelectionRange(position, position)
  })

  document.querySelectorAll('[data-movie]').forEach(button => {
    button.addEventListener('click', () => {
      renderMovie(Number(button.dataset.movie))
    })
  })
}

function renderMovie(id) {
  const movie = movies.find(item => item.id === id)
  if (!movie) return

  app.innerHTML = `
    <header class="topbar">
      ${getLogo()}
      <button class="back-button" id="back-home">← &nbsp; Back to collection</button>
    </header>
    <main class="detail-page">
      <div class="detail-poster" style="--poster-color:${movie.color}">
        <span>${movie.symbol}</span>
        <strong>${movie.title}</strong>
      </div>
      <section class="detail-info">
        <span class="eyebrow">ANGKOR STREAM COLLECTION</span>
        <h1>${movie.title}</h1>
        <div class="detail-meta">${movie.year} <span>·</span> ${movie.genre} <span>·</span> Demo title</div>
        <p>${movie.description}</p>
        <div class="player-placeholder">
          <div class="player-icon">▶</div>
          <strong>YOUR SCREENING STARTS HERE</strong>
          <span>This is a prototype. No full movie is attached yet.</span>
        </div>
        <button class="primary-button" id="back-collection">← &nbsp; Explore more films</button>
      </section>
    </main>
    <footer>${getLogo()}<span>© ${new Date().getFullYear()} ANGKOR STREAM</span></footer>
  `

  document.querySelector('#back-home').addEventListener('click', () => renderHome())
  document.querySelector('#back-collection').addEventListener('click', () => renderHome())
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

renderHome()
