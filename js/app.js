/**
 * Main Application JavaScript
 * This file handles all UI logic, event listeners, and orchestration
 */

// ===================================
// State Management
// ===================================

const AppState = {
    currentPage: 'home',
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    genreMap: {},
    currentModal: null
};

// ===================================
// DOM Elements
// ===================================

const elements = {
    navbar: document.getElementById('navbar'),
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    
    // Pages
    homePage: document.getElementById('homePage'),
    searchPage: document.getElementById('searchPage'),
    loginPage: document.getElementById('loginPage'),
    registerPage: document.getElementById('registerPage'),
    
    // Banner
    banner: document.getElementById('banner'),
    bannerTitle: document.getElementById('bannerTitle'),
    bannerDescription: document.getElementById('bannerDescription'),
    
    // Rows
    trendingRow: document.getElementById('trendingRow'),
    teluguMoviesRow: document.getElementById('teluguMoviesRow'),
    topRatedRow: document.getElementById('topRatedRow'),
    actionRow: document.getElementById('actionRow'),
    comedyRow: document.getElementById('comedyRow'),
    horrorRow: document.getElementById('horrorRow'),
    romanceRow: document.getElementById('romanceRow'),
    tvRow: document.getElementById('tvRow'),
    
    // Search
    searchGrid: document.getElementById('searchGrid'),
    searchTitle: document.getElementById('searchTitle'),
    
    // Modal
    modal: document.getElementById('modal'),
    modalOverlay: document.getElementById('modalOverlay'),
    modalClose: document.getElementById('modalClose'),
    modalBackdrop: document.getElementById('modalBackdrop'),
    modalPoster: document.getElementById('modalPoster'),
    modalTitle: document.getElementById('modalTitle'),
    modalRating: document.getElementById('modalRating'),
    modalDate: document.getElementById('modalDate'),
    modalLanguage: document.getElementById('modalLanguage'),
    modalGenres: document.getElementById('modalGenres'),
    modalOverview: document.getElementById('modalOverview'),
    
    // Auth
    loginForm: document.getElementById('loginForm'),
    registerForm: document.getElementById('registerForm'),
    showRegister: document.getElementById('showRegister'),
    showLogin: document.getElementById('showLogin')
};

// ===================================
// Initialization
// ===================================

async function init() {
    // Load genre map
    AppState.genreMap = await API.getGenres();
    
    // Set as logged in and go directly to home page
    AppState.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    showPage('home');
    await loadHomePage();
    
    // Setup event listeners
    setupEventListeners();
}

// ===================================
// Event Listeners
// ===================================

function setupEventListeners() {
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            elements.navbar.classList.add('scrolled');
        } else {
            elements.navbar.classList.remove('scrolled');
        }
    });
    
    // Search functionality
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Logo click - go to home
    document.querySelector('.logo').addEventListener('click', () => {
        if (AppState.isLoggedIn) {
            showPage('home');
            elements.searchInput.value = '';
        }
    });
    
    // Modal close
    elements.modalClose.addEventListener('click', closeModal);
    elements.modalOverlay.addEventListener('click', closeModal);
    
    // Auth form handlers
    elements.loginForm.addEventListener('submit', handleLogin);
    elements.registerForm.addEventListener('submit', handleRegister);
    elements.showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('register');
    });
    elements.showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('login');
    });
}

// ===================================
// Page Navigation
// ===================================

function showPage(page) {
    // Hide all pages
    elements.homePage.classList.add('hidden');
    elements.searchPage.classList.add('hidden');
    elements.loginPage.classList.add('hidden');
    elements.registerPage.classList.add('hidden');
    
    // Show requested page
    switch(page) {
        case 'home':
            elements.homePage.classList.remove('hidden');
            AppState.currentPage = 'home';
            break;
        case 'search':
            elements.searchPage.classList.remove('hidden');
            AppState.currentPage = 'search';
            break;
        case 'login':
            elements.loginPage.classList.remove('hidden');
            AppState.currentPage = 'login';
            break;
        case 'register':
            elements.registerPage.classList.remove('hidden');
            AppState.currentPage = 'register';
            break;
    }
}

// ===================================
// Authentication (Mock)
// ===================================

function handleLogin(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    
    // Mock validation
    if (email && password) {
        AppState.isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        showPage('home');
        loadHomePage();
    } else {
        alert('Please enter valid credentials');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const inputs = e.target.querySelectorAll('input');
    const name = inputs[0].value;
    const email = inputs[1].value;
    const password = inputs[2].value;
    
    // Mock validation
    if (name && email && password) {
        AppState.isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        showPage('home');
        loadHomePage();
    } else {
        alert('Please fill all fields');
    }
}

// ===================================
// Home Page Loading
// ===================================

async function loadHomePage() {
    // Load banner
    await loadBanner();
    
    // Load all rows
    await Promise.all([
        loadRow('trending', elements.trendingRow),
        loadRow('teluguMovies', elements.teluguMoviesRow),
        loadRow('topRated', elements.topRatedRow),
        loadRow('action', elements.actionRow),
        loadRow('comedy', elements.comedyRow),
        loadRow('horror', elements.horrorRow),
        loadRow('romance', elements.romanceRow),
        loadRow('tv', elements.tvRow)
    ]);
}

// ===================================
// Banner Component
// ===================================

async function loadBanner() {
    const movies = await API.getMoviesByCategory('trending');
    
    if (movies && movies.length > 0) {
        // Pick a random trending movie
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        
        // Set banner background
        const backdropUrl = API.getBackdropUrl(randomMovie.backdrop_path);
        elements.banner.style.backgroundImage = `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url('${backdropUrl}')`;
        
        // Set title
        const title = randomMovie.title || randomMovie.name;
        elements.bannerTitle.textContent = title;
        
        // Set description (truncate if too long)
        const description = randomMovie.overview || 'No description available';
        elements.bannerDescription.textContent = description;
    }
}

// ===================================
// Row Component
// ===================================

async function loadRow(category, containerElement) {
    const movies = await API.getMoviesByCategory(category);
    
    if (movies && movies.length > 0) {
        containerElement.innerHTML = '';
        
        movies.forEach(movie => {
            const card = createMovieCard(movie);
            containerElement.appendChild(card);
        });
    } else {
        containerElement.innerHTML = '<p style="color: #b3b3b3; padding: 1rem;">No content available</p>';
    }
}

// ===================================
// Movie Card Component
// ===================================

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    
    const posterUrl = API.getPosterUrl(movie.poster_path);
    const title = movie.title || movie.name;
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    
    card.innerHTML = `
        <img src="${posterUrl}" alt="${title}" loading="lazy">
        <div class="movie-card-overlay">
            <div class="movie-card-title">${title}</div>
            <div class="movie-card-rating">⭐ ${rating}</div>
        </div>
    `;
    
    // Add click event to show modal
    card.addEventListener('click', () => {
        const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');
        showModal(movie.id, mediaType, movie);
    });
    
    return card;
}

// ===================================
// Search Functionality
// ===================================

async function handleSearch() {
    const query = elements.searchInput.value.trim();
    
    if (!query) {
        return;
    }
    
    // Show search page
    showPage('search');
    elements.searchTitle.textContent = `Search Results for "${query}"`;
    elements.searchGrid.innerHTML = '<p style="color: #b3b3b3;">Searching...</p>';
    
    // Fetch results
    const results = await API.searchContent(query);
    
    // Display results
    if (results && results.length > 0) {
        elements.searchGrid.innerHTML = '';
        results.forEach(item => {
            // Filter out people and only show movies/TV
            if (item.media_type === 'movie' || item.media_type === 'tv') {
                const card = createMovieCard(item);
                elements.searchGrid.appendChild(card);
            }
        });
    } else {
        elements.searchGrid.innerHTML = '<p style="color: #b3b3b3; padding: 2rem;">No results found</p>';
    }
}

// ===================================
// Modal Component
// ===================================

async function showModal(id, type, basicInfo) {
    // Show modal with basic info first
    elements.modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Set basic info
    const title = basicInfo.title || basicInfo.name;
    elements.modalTitle.textContent = title;
    elements.modalOverview.textContent = basicInfo.overview || 'Loading...';
    elements.modalRating.textContent = `⭐ ${basicInfo.vote_average?.toFixed(1) || 'N/A'}`;
    
    // Set images
    const backdropUrl = API.getBackdropUrl(basicInfo.backdrop_path);
    const posterUrl = API.getPosterUrl(basicInfo.poster_path);
    elements.modalBackdrop.style.backgroundImage = `url('${backdropUrl}')`;
    elements.modalPoster.src = posterUrl;
    elements.modalPoster.alt = title;
    
    // Fetch full details
    const details = await API.getDetails(id, type);
    
    if (details) {
        // Update with full details
        elements.modalTitle.textContent = details.title || details.name;
        elements.modalOverview.textContent = details.overview || 'No overview available';
        elements.modalRating.textContent = `⭐ ${details.vote_average?.toFixed(1) || 'N/A'}`;
        
        // Release date
        const releaseDate = details.release_date || details.first_air_date || 'Unknown';
        elements.modalDate.textContent = releaseDate.split('-')[0]; // Just the year
        
        // Language
        elements.modalLanguage.textContent = details.original_language?.toUpperCase() || 'N/A';
        
        // Genres
        if (details.genres && details.genres.length > 0) {
            const genreNames = details.genres.map(g => g.name).join(', ');
            elements.modalGenres.textContent = genreNames;
        } else {
            elements.modalGenres.textContent = 'Genres not available';
        }
    }
    
    AppState.currentModal = { id, type };
}

function closeModal() {
    elements.modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
    AppState.currentModal = null;
}

// ===================================
// Start Application
// ===================================

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
