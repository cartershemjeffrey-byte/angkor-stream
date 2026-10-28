
import './style.css'
import { supabase } from './supabase.js'

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



function getHeaderAvatar(profile) {
  if (profile?.avatar_type === 'upload' && profile?.avatar_url) {
    return `<img class="header-avatar" src="${profile.avatar_url}" alt="" />`
  }

  if (profile?.avatar_type === 'zodiac' && profile?.avatar_value) {
    const zodiacSymbols = {
      Aries: '♈',
      Taurus: '♉',
      Gemini: '♊',
      Cancer: '♋',
      Leo: '♌',
      Virgo: '♍',
      Libra: '♎',
      Scorpio: '♏',
      Sagittarius: '♐',
      Capricorn: '♑',
      Aquarius: '♒',
      Pisces: '♓'
    }

    const symbol = zodiacSymbols[profile.avatar_value]

    if (symbol) {
      return `<span class="header-avatar header-avatar-zodiac">${symbol}</span>`
    }
  }

  return `<span class="header-avatar header-avatar-default">👤</span>`
}


function getSiteHeader({ showSearch = false } = {}) {
  return `
    <header class="topbar site-topbar">
      ${getLogo()}

      <nav class="site-navigation" aria-label="Main navigation">
        <button type="button" class="site-nav-link" data-site-page="home">Home</button>
        <button type="button" class="site-nav-link" data-site-page="movies">Movies</button>
        <button type="button" class="site-nav-link" data-site-page="about">About</button>
      </nav>

      ${showSearch ? `
        <div class="site-search">
          <span aria-hidden="true">⌕</span>
          <input
            id="movie-search"
            type="search"
            placeholder="Search movies..."
            aria-label="Search movies"
          >
        </div>
      ` : '<div class="site-search-placeholder" aria-hidden="true"></div>'}

      <div class="site-header-account" data-site-account></div>
    </header>
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
      <div class="search-wrap">

        <label class="search-box">
          <span>⌕</span>
          <input id="movie-search" type="search" placeholder="Search movies..." value="${query.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')}" aria-label="Search movies" autocomplete="off" aria-expanded="false" aria-controls="search-suggestions">
        </label>
        
        <div id="search-suggestions" class="search-suggestions" role="listbox" aria-label="Movie suggestions" hidden></div>
      </div>
    </header>

    <main>



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
  const value = event.target.value
  const suggestions = document.querySelector('#search-suggestions')
  const input = event.target

  if (!suggestions) return

  const matches = movies
    .filter(movie =>
      `${movie.title} ${movie.genre} ${movie.year}`
        .toLowerCase()
        .includes(value.trim().toLowerCase())
    )
    .slice(0, 6)

  if (!value.trim() || matches.length === 0) {
    suggestions.hidden = true
    input.setAttribute('aria-expanded', 'false')
    return
  }

  suggestions.innerHTML = matches.map(movie => `
    <button type="button" class="suggestion-item" role="option" data-suggestion-movie="${movie.id}">
      <span class="suggestion-poster" style="--poster-color:${movie.color}">
        ${movie.symbol || '🎬'}
      </span>
      <span class="suggestion-info">
        <span class="suggestion-title">${movie.title}</span>
        <span class="suggestion-meta">${movie.year} · ${movie.genre}</span>
      </span>
      <span class="suggestion-arrow">↗</span>
    </button>
  `).join('')

  suggestions.hidden = false
  input.setAttribute('aria-expanded', 'true')
})


  
document.querySelector('#search-suggestions').addEventListener('click', event => {
  const button = event.target.closest('[data-suggestion-movie]')
  if (!button) return

  const movieId = Number(button.dataset.suggestionMovie)
  if (!Number.isFinite(movieId)) return

  const suggestions = document.querySelector('#search-suggestions')
  if (suggestions) suggestions.hidden = true

  renderMovie(movieId)
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

} 

document.querySelectorAll('[data-suggestion-movie]').forEach(button => {
  button.addEventListener('click', () => {
    const movieId = Number(button.dataset.suggestionMovie)
    const suggestions = document.querySelector('#search-suggestions')

    if (suggestions) suggestions.hidden = true

    renderMovie(movieId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})

document.addEventListener('click', event => {
  const button = event.target.closest('[data-movie]')
  if (!button) return

  const movieId = Number(button.dataset.movie)
  if (!Number.isFinite(movieId)) return

  renderMovie(movieId)
  window.scrollTo({ top: 0, behavior: 'smooth' })
})


async function renderAccountPage(page = 'profile') {
  const { data: { user }, error: userError } =
    await supabase.auth.getUser()

  if (userError || !user) {
    openAuthModal('login')
    return
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('username, display_name, avatar_type, avatar_value, avatar_url')
    .eq('id', user.id)
    .maybeSingle()

  if (error) {
    console.error('Could not load profile:', error.message)
  }

  const username =
    profile?.username ||
    profile?.display_name ||
    user.user_metadata?.full_name ||
    user.email?.split('@')[0] ||
    'Movie Lover'

  const zodiacAvatars = [
    ['♈', 'Aries', '#b84444'],
    ['♉', 'Taurus', '#47865c'],
    ['♊', 'Gemini', '#bd9c38'],
    ['♋', 'Cancer', '#608bb9'],
    ['♌', 'Leo', '#d77c35'],
    ['♍', 'Virgo', '#8d76b7'],
    ['♎', 'Libra', '#c16c9c'],
    ['♏', 'Scorpio', '#8d3e57'],
    ['♐', 'Sagittarius', '#6576c8'],
    ['♑', 'Capricorn', '#658b83'],
    ['♒', 'Aquarius', '#4d9fa8'],
    ['♓', 'Pisces', '#7867bd']
  ]

  const pages = {
    profile: 'My Profile',
    library: 'My Library',
    settings: 'Settings',
    history: 'Watch History'
  }

  const avatar = profile?.avatar_type === 'zodiac'
    ? zodiacAvatars.find(item => item[1] === profile.avatar_value)
    : null

  const avatarMarkup = profile?.avatar_url
    ? `<img src="${profile.avatar_url}" alt="Profile picture">`
    : avatar
      ? `<span style="background:${avatar[2]}">${avatar[0]}</span>`
      : '<span class="profile-avatar-placeholder">👤</span>'

  const app = document.querySelector('#app')
  if (!app) return

  app.innerHTML = `
  ${getSiteHeader()}

  <main class="account-page">
      <aside class="account-sidebar">
        <div class="account-sidebar-heading">YOUR ACCOUNT</div>
        ${Object.entries(pages).map(([key, label]) => `
          <button class="account-nav-item ${key === page ? 'active' : ''}"
            data-account-view="${key}">${label}</button>
        `).join('')}
        <button class="account-nav-item account-back-home"
          data-account-view="home">← Back to Home</button>
      </aside>

      <section class="account-content">
        <span class="eyebrow">ANGKOR STREAM / ACCOUNT</span>
        <h1>${pages[page] || 'My Profile'}</h1>

        ${page === 'profile' ? `
          <section class="profile-card">
            <div class="profile-card-heading">
              <h2>Your profile</h2>
              <p>Make your space feel like yours.</p>
            </div>

            <div class="profile-avatar-large">${avatarMarkup}</div>

            <form id="profile-form" class="profile-form">
              <label for="profile-username">Username</label>
              <input id="profile-username" name="username"
                maxlength="30" required
                value="${String(username).replace(/[&<>"']/g, '')}">

              <h3>Choose an avatar</h3>
              <div class="zodiac-grid">
                ${zodiacAvatars.map(([symbol, name, color]) => `
                  <button type="button"
                    class="zodiac-option ${profile?.avatar_value === name ? 'selected' : ''}"
                    data-zodiac="${name}" aria-label="${name}"
                    style="--avatar-color:${color}">
                    <span>${symbol}</span><small>${name}</small>
                  </button>
                `).join('')}
              </div>

              <label class="profile-upload">
                Upload your own picture
                <input type="file" id="profile-photo"
                  accept="image/png,image/jpeg,image/webp">
              </label>

              <button type="button" class="account-secondary"
                id="profile-skip-avatar">Use default avatar</button>

              <p id="profile-message" class="profile-message"></p>
              <button type="submit" class="account-primary"
                id="profile-save">Save Changes</button>
            </form>
          </section>
        ` : `
          <section class="account-empty-state">
            <div class="account-empty-icon">✦</div>
            <h2>${pages[page] || 'Your account'}</h2>
            <p>${page === 'library'
              ? 'Your purchased movies and series will appear here.'
              : page === 'history'
                ? 'Your viewing history will appear here as you watch.'
                : 'Your account preferences will be available here.'}</p>
          </section>
        `}
      </section>
    </main>
  `

  if (page !== 'profile') return

  let selectedAvatar = profile?.avatar_type === 'zodiac'
    ? profile.avatar_value
    : null
  let uploadedFile = null
  let useDefaultAvatar = false

  const message = document.querySelector('#profile-message')
  const avatarPreview = document.querySelector('.profile-avatar-large')

  document.querySelectorAll('[data-zodiac]').forEach(button => {
    button.addEventListener('click', () => {
      selectedAvatar = button.dataset.zodiac
      uploadedFile = null
      useDefaultAvatar = false

      document.querySelectorAll('[data-zodiac]').forEach(item =>
        item.classList.toggle('selected', item === button)
      )

      const chosen = zodiacAvatars.find(item => item[1] === selectedAvatar)
      avatarPreview.innerHTML =
        `<span style="background:${chosen[2]}">${chosen[0]}</span>`
    })
  })

  document.querySelector('#profile-photo').addEventListener('change', event => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      message.textContent = 'Choose a JPG, PNG, or WebP image.'
      event.target.value = ''
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      message.textContent = 'Your picture must be 2 MB or smaller.'
      event.target.value = ''
      return
    }

    uploadedFile = file
    selectedAvatar = null
    useDefaultAvatar = false
    avatarPreview.innerHTML =
      `<img src="${URL.createObjectURL(file)}" alt="New profile picture">`
    document.querySelectorAll('[data-zodiac]').forEach(item =>
      item.classList.remove('selected')
    )
    message.textContent = 'Picture selected. Save to upload it.'
  })

  document.querySelector('#profile-skip-avatar').addEventListener('click', () => {
    selectedAvatar = null
    uploadedFile = null
    useDefaultAvatar = true
    avatarPreview.innerHTML = '<span class="profile-avatar-placeholder">👤</span>'
    document.querySelectorAll('[data-zodiac]').forEach(item =>
      item.classList.remove('selected')
    )
    document.querySelector('#profile-photo').value = ''
    message.textContent = 'Default avatar selected.'
  })

  document.querySelector('#profile-form').addEventListener('submit', async event => {
    event.preventDefault()

    const saveButton = document.querySelector('#profile-save')
    saveButton.disabled = true
    message.textContent = 'Saving your profile…'

    try {
      let avatarType = profile?.avatar_type || 'default'
      let avatarValue = profile?.avatar_value || null
      let avatarUrl = profile?.avatar_url || null

      if (uploadedFile) {
        const extension = uploadedFile.type === 'image/png' ? 'png'
          : uploadedFile.type === 'image/webp' ? 'webp' : 'jpg'
        const path = `${user.id}/avatar-${Date.now()}.${extension}`

        const { error: uploadError } = await supabase.storage
          .from('profile-avatars')
          .upload(path, uploadedFile, {
            upsert: false,
            contentType: uploadedFile.type
          })

        if (uploadError) throw uploadError

        const { data: signedImage, error: urlError } = await supabase.storage
          .from('profile-avatars')
          .createSignedUrl(path, 60 * 60 * 24 * 365)

        if (urlError) throw urlError

        avatarType = 'upload'
        avatarValue = path
        avatarUrl = signedImage.signedUrl
      } else if (selectedAvatar) {
        avatarType = 'zodiac'
        avatarValue = selectedAvatar
        avatarUrl = null
      } else if (useDefaultAvatar) {
        avatarType = 'default'
        avatarValue = null
        avatarUrl = null
      }

      const usernameValue =
        document.querySelector('#profile-username').value.trim()

      if (!usernameValue) throw new Error('Please enter a username.')

      const { error: saveError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          username: usernameValue,
          display_name: usernameValue,
          avatar_type: avatarType,
          avatar_value: avatarValue,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' })

      if (saveError) throw saveError

      message.textContent = 'Profile saved successfully!'
    } catch (error) {
      console.error('Profile save failed:', error)
      message.textContent = error.message || 'Could not save your profile.'
    } finally {
      saveButton.disabled = false
    }
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


/* ===== ANGKOR STREAM AUTHENTICATION ===== */

function installAuthButtons() {
  const header = document.querySelector('.topbar')
  if (!header || header.querySelector('.auth-actions')) return

  const actions = document.createElement('div')
  actions.className = 'auth-actions'
  actions.innerHTML = `
    <button class="auth-button" data-auth-open="login">Log In</button>
    <button class="auth-button signup" data-auth-open="signup">Sign Up</button>
  `

  header.appendChild(actions)
}

const originalRenderHome = renderHome
renderHome = function (query = '') {
  originalRenderHome(query)
  installAuthButtons()
  updateAuthHeader()
}

const originalRenderMovie = renderMovie
renderMovie = function (id) {
  originalRenderMovie(id)
  installAuthButtons()
  updateAuthHeader()
}

function closeAuthModal() {
  document.querySelector('.auth-overlay')?.remove()
}

function showAuthMessage(message, isError = false) {
  const box = document.querySelector('#auth-message')
  if (!box) return
  box.textContent = message
  box.classList.toggle('error', isError)
}

function openAuthModal(mode = 'login') {
  closeAuthModal()

  const isSignup = mode === 'signup'
  const isReset = mode === 'reset'

  const overlay = document.createElement('div')
  overlay.className = 'auth-overlay'
  overlay.innerHTML = `
    <section class="auth-modal" role="dialog"
      aria-modal="true" aria-labelledby="auth-title">
      <button class="auth-close" type="button"
        data-auth-close aria-label="Close">&times;</button>

      <h2 id="auth-title">${
        isReset ? 'Reset your password'
        : isSignup ? 'Create your account'
        : 'Welcome back'
      }</h2>

      <p class="auth-description">${
        isReset
          ? 'Enter your email and we will send you a password reset link.'
          : isSignup
            ? 'Join ANGKOR STREAM and make yourself at home.'
            : 'Sign in to continue your movie journey.'
      }</p>

      <form class="auth-form" id="auth-form">
        ${
          isSignup
            ? `<label class="auth-field">Username
                <input name="username" required minlength="3"
                  maxlength="24" autocomplete="username"
                  placeholder="Your username">
              </label>`
            : ''
        }

        <label class="auth-field">Email address
          <input name="email" type="email" required
            autocomplete="email" placeholder="you@example.com">
        </label>

        ${
          isSignup
            ? `<label class="auth-field">Confirm email address
                <input name="confirmEmail" type="email" required
                  autocomplete="off" placeholder="Enter your email again">
              </label>`
            : ''
        }

        ${
          isReset ? '' : `
            <label class="auth-field">Password
              <input name="password" type="password" required
                autocomplete="${isSignup ? 'new-password' : 'current-password'}"
                minlength="8" placeholder="At least 8 characters">
            </label>`
        }

        ${
          isSignup
            ? `<label class="auth-field">Confirm password
                <input name="confirmPassword" type="password" required
                  minlength="8" autocomplete="new-password"
                  placeholder="Enter your password again">
              </label>
              <p class="auth-password-hint">
                Use at least 8 characters with uppercase and lowercase
                letters, a number, and a symbol.
              </p>`
            : ''
        }

        ${
          !isSignup && !isReset
            ? `<div style="text-align:right">
                <button class="auth-link" type="button"
                  data-auth-open="reset">Forgot password?</button>
              </div>`
            : ''
        }

        <button class="auth-submit" type="submit">
          ${isReset ? 'SEND RESET LINK' : isSignup ? 'CREATE ACCOUNT' : 'LOG IN'}
        </button>
      </form>

      ${
        isReset ? '' : `
          <div class="auth-divider">OR</div>
          <button class="auth-google" type="button" data-auth-google>
            <span aria-hidden="true">G</span> Continue with Google
          </button>`
      }

      <p id="auth-message" class="auth-message" role="status"
        aria-live="polite"></p>

      <p class="auth-footer">
        ${
          isReset
            ? `<button class="auth-link" data-auth-open="login" type="button">
                Back to login
              </button>`
            : isSignup
              ? `Already have an account?
                 <button class="auth-link" data-auth-open="login" type="button">
                   Log in
                 </button>`
              : `New to ANGKOR STREAM?
                 <button class="auth-link" data-auth-open="signup" type="button">
                   Create an account
                 </button>`
        }
      </p>
    </section>
  `

  document.body.appendChild(overlay)
  overlay.querySelector('input')?.focus()
}

document.addEventListener('click', async (event) => {
  const openButton = event.target.closest('[data-auth-open]')
  if (openButton) {
    event.preventDefault()
    openAuthModal(openButton.dataset.authOpen)
    return
  }

  if (event.target.closest('[data-auth-close]')) {
    closeAuthModal()
    return
  }

  if (event.target.classList.contains('auth-overlay')) {
    closeAuthModal()
    return
  }

  if (event.target.closest('[data-auth-google]')) {
    const button = event.target.closest('[data-auth-google]')
    button.disabled = true
    showAuthMessage('Connecting to Google...')

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    })

    if (error) {
      button.disabled = false
      showAuthMessage(error.message, true)
    }
  }
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeAuthModal()
})

document.addEventListener('submit', async (event) => {
  if (event.target.id !== 'auth-form') return
  event.preventDefault()

  const form = event.target
  const data = new FormData(form)
  const email = String(data.get('email') || '').trim().toLowerCase()
  const password = String(data.get('password') || '')
  const mode = document.querySelector('#auth-title')?.textContent
  const button = form.querySelector('[type="submit"]')

  button.disabled = true
  showAuthMessage('Please wait...')

  try {
    if (mode === 'Reset your password') {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/`
      })

      if (error) throw error
      showAuthMessage('If the address is registered, a password reset email will be sent.')
      return
    }

    if (mode === 'Create your account') {
      const username = String(data.get('username') || '').trim()
      const confirmEmail = String(data.get('confirmEmail') || '')
        .trim().toLowerCase()
      const confirmPassword = String(data.get('confirmPassword') || '')

      if (username.length < 3) {
        throw new Error('Username must be at least 3 characters.')
      }

      if (email !== confirmEmail) {
        throw new Error('Your email addresses do not match.')
      }

      if (password !== confirmPassword) {
        throw new Error('Your passwords do not match.')
      }

      if (
        password.length < 8 ||
        !/[a-z]/.test(password) ||
        !/[A-Z]/.test(password) ||
        !/[0-9]/.test(password) ||
        !/[^A-Za-z0-9]/.test(password)
      ) {
        throw new Error(
          'Use 8+ characters with uppercase, lowercase, a number, and a symbol.'
        )
      }

      const { data: result, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { username }
        }
      })

      if (error) throw error

      if (result.session) {
        showAuthMessage('Account created! You are signed in.')
      } else {
        showAuthMessage('Account created! Check your email and click the verification link before logging in.')
      }

      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

    showAuthMessage('Login successful! Refreshing your account...')
    setTimeout(() => window.location.reload(), 700)
  } catch (error) {
    showAuthMessage(error.message || 'Something went wrong. Please try again.', true)
  } finally {
    button.disabled = false
  }
})

// Restore the authentication buttons on initial page load.
installAuthButtons()

/* ===== AUTH SESSION STATE ===== */

async function updateAuthHeader() {
  const header = document.querySelector('.topbar')
  if (!header) return

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    console.error('Could not get current user:', error.message)
    return
  }

  let actions = header.querySelector('.auth-actions')

  if (!actions) {
    installAuthButtons()
    actions = header.querySelector('.auth-actions')
  }

  if (!actions) return

  if (user) {
    const { data: savedProfile, error: profileError } = await supabase
      .from('profiles')
      .select('username, display_name, avatar_type, avatar_value, avatar_url')
      .eq('id', user.id)
      .maybeSingle()

    if (profileError) {
      console.error('Could not load header profile:', profileError.message)
    }

    const username =
      savedProfile?.username ||
      savedProfile?.display_name ||
      user.user_metadata?.full_name ||
      user.email?.split('@')[0] ||
      'My Account'


    
actions.innerHTML = `
  <div class="account-dropdown">
    <button
      class="auth-button"
      data-account-menu
      aria-expanded="false"
      aria-haspopup="true"
    >
      ${getHeaderAvatar(savedProfile)} ${username.replace(/[<>&"]/g, '')} ▾
    </button>

    <div class="account-menu" data-account-menu-panel hidden>
      <button type="button" data-account-page="profile">My Profile</button>
      <button type="button" data-account-page="library">My Library</button>
      <button type="button" data-account-page="settings">Settings</button>
      <button type="button" data-account-page="history">Watch History</button>
      <button type="button" data-auth-logout>Log Out</button>

    </div>
  </div>
`

    closeAuthModal()
  } else {
    actions.innerHTML = `
      <button class="auth-button" data-auth-open="login">Log In</button>
      <button class="auth-button signup" data-auth-open="signup">Sign Up</button>
    `
  }
}

supabase.auth.onAuthStateChange((event, session) => {
  if (session) {
    updateAuthHeader()
  } else if (event === 'SIGNED_OUT') {
    updateAuthHeader()
  }
})

document.addEventListener('click', async (event) => {
  if (event.target.closest('[data-auth-logout]')) {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Logout failed:', error.message)
      alert('Could not log out. Please try again.')
    }
  }
})

updateAuthHeader()


/* ===== ACCOUNT DROPDOWN ===== */
document.addEventListener('click', (event) => {
  const accountButton = event.target.closest('[data-account-menu]')
  const accountPanel = document.querySelector('[data-account-menu-panel]')

  if (!accountPanel) return

  if (accountButton) {
    const isOpen = !accountPanel.hidden
    accountPanel.hidden = isOpen
    accountButton.setAttribute('aria-expanded', String(!isOpen))
    return
  }

  if (!event.target.closest('.account-dropdown')) {
    accountPanel.hidden = true

    const button = document.querySelector('[data-account-menu]')
    button?.setAttribute('aria-expanded', 'false')
  }
})


/* ===== ACCOUNT PAGE NAVIGATION ===== */
document.addEventListener('click', (event) => {
  const item = event.target.closest('[data-account-page]')
  if (!item) return

  const page = item.dataset.accountPage
  const panel = document.querySelector('[data-account-menu-panel]')

  if (panel) panel.hidden = true

  document.querySelector('[data-account-menu]')
    ?.setAttribute('aria-expanded', 'false')

  

const pageRoutes = {
  profile: 'profile',
  library: 'library',
  settings: 'settings',
  history: 'history'
}

if (page === 'continue') {
  alert('Continue Watching will be added later.')
  return
}

if (pageRoutes[page]) {
  renderAccountPage(pageRoutes[page])
} else if (page === 'home') {
  renderHome()
}
})


