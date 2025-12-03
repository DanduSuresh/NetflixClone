/**
 * API Service for TMDb endpoints
 * This file contains all API request URLs and helper functions
 */

const API = {
    /**
     * Endpoint URLs for different categories
     */
    endpoints: {
        trending: `${CONFIG.BASE_URL}/trending/all/week?api_key=${CONFIG.API_KEY}`,
        topRated: `${CONFIG.BASE_URL}/movie/top_rated?api_key=${CONFIG.API_KEY}`,
        action: `${CONFIG.BASE_URL}/discover/movie?api_key=${CONFIG.API_KEY}&with_genres=28`,
        comedy: `${CONFIG.BASE_URL}/discover/movie?api_key=${CONFIG.API_KEY}&with_genres=35`,
        horror: `${CONFIG.BASE_URL}/discover/movie?api_key=${CONFIG.API_KEY}&with_genres=27`,
        romance: `${CONFIG.BASE_URL}/discover/movie?api_key=${CONFIG.API_KEY}&with_genres=10749`,
        tv: `${CONFIG.BASE_URL}/tv/popular?api_key=${CONFIG.API_KEY}`,
        teluguMovies: `${CONFIG.BASE_URL}/discover/movie?api_key=${CONFIG.API_KEY}&with_original_language=te&sort_by=popularity.desc`,
        search: (query) => `${CONFIG.BASE_URL}/search/multi?api_key=${CONFIG.API_KEY}&query=${encodeURIComponent(query)}`,
        movieDetails: (id) => `${CONFIG.BASE_URL}/movie/${id}?api_key=${CONFIG.API_KEY}`,
        tvDetails: (id) => `${CONFIG.BASE_URL}/tv/${id}?api_key=${CONFIG.API_KEY}`,
        genres: `${CONFIG.BASE_URL}/genre/movie/list?api_key=${CONFIG.API_KEY}`
    },

    /**
     * Fetch data from a given URL
     * @param {string} url - The API endpoint URL
     * @returns {Promise<Object>} - The response data
     */
    async fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    },

    /**
     * Get the full image URL for a poster
     * @param {string} path - The poster path from API
     * @returns {string} - Full image URL
     */
    getPosterUrl(path) {
        if (!path) return 'https://via.placeholder.com/500x750/1a1a1a/666666?text=No+Image';
        return `${CONFIG.IMAGE_BASE_URL}/${CONFIG.POSTER_SIZE}${path}`;
    },

    /**
     * Get the full image URL for a backdrop
     * @param {string} path - The backdrop path from API
     * @returns {string} - Full image URL
     */
    getBackdropUrl(path) {
        if (!path) return 'https://via.placeholder.com/1920x1080/1a1a1a/666666?text=No+Image';
        return `${CONFIG.IMAGE_BASE_URL}/${CONFIG.BACKDROP_SIZE}${path}`;
    },

    /**
     * Fetch movies/shows for a specific category
     * @param {string} category - Category name (trending, action, etc.)
     * @returns {Promise<Array>} - Array of movie/TV objects
     */
    async getMoviesByCategory(category) {
        const url = this.endpoints[category];
        const data = await this.fetchData(url);
        return data?.results || [];
    },

    /**
     * Search for movies and TV shows
     * @param {string} query - Search query string
     * @returns {Promise<Array>} - Array of search results
     */
    async searchContent(query) {
        if (!query.trim()) return [];
        const url = this.endpoints.search(query);
        const data = await this.fetchData(url);
        return data?.results || [];
    },

    /**
     * Get details for a specific movie or TV show
     * @param {number} id - The movie/TV id
     * @param {string} type - 'movie' or 'tv'
     * @returns {Promise<Object>} - Detailed information
     */
    async getDetails(id, type = 'movie') {
        const url = type === 'tv' ? this.endpoints.tvDetails(id) : this.endpoints.movieDetails(id);
        return await this.fetchData(url);
    },

    /**
     * Fetch all genre mappings
     * @returns {Promise<Object>} - Genre id to name mapping
     */
    async getGenres() {
        const data = await this.fetchData(this.endpoints.genres);
        const genreMap = {};
        if (data?.genres) {
            data.genres.forEach(genre => {
                genreMap[genre.id] = genre.name;
            });
        }
        return genreMap;
    }
};
