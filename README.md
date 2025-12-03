# 🎬 Netflix Clone - ANTIGRAVITY

A fully functional Netflix clone built with vanilla HTML, CSS, and JavaScript, powered by The Movie Database (TMDb) API.

![Netflix Clone](https://img.shields.io/badge/Status-Complete-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🏠 Home Page

- **Hero Banner**: Random trending movie with stunning backdrop
- **Multiple Movie Categories**:
  - 🔥 Trending Now
  - 🎬 **Telugu Movies** (Featured!)
  - ⭐ Top Rated
  - 💥 Action Movies
  - 😂 Comedy Movies
  - 👻 Horror Movies
  - 💕 Romance Movies
  - 📺 TV Series

### 🎥 Movie Details

- Click any movie card to view detailed information
- Displays: Title, Rating, Release Date, Genres, Language, Overview
- Beautiful modal with backdrop and poster images
- "Play" and "Add to My List" buttons

### 🔍 Search

- Real-time search for movies and TV shows
- Grid layout for search results
- Instant results from TMDb API

### 🔐 Authentication (Mock)

- Login and Registration pages
- Frontend validation only
- Session persistence with localStorage

### 🎨 Design

- Dark Netflix-style theme
- Smooth hover animations on movie cards
- Responsive layout (mobile & desktop)
- Custom scrollbars
- Glassmorphism effects
- Professional UI/UX

## 🚀 How to Run

### Option 1: Direct File Access

1. Navigate to the project folder: `d:\NetflixClone`
2. Double-click **`index.html`** to open in your default browser
3. Login with any email/password (e.g., `test@example.com` / `password123`)
4. Browse and enjoy!

### Option 2: Local Server (Recommended)

If you have Python installed:

```bash
# Navigate to project folder
cd d:\NetflixClone

# Python 3
python -m http.server 8000

# Then open browser to: http://localhost:8000
```

Or using Node.js:

```bash
# Install a simple server globally
npm install -g http-server

# Run server
http-server

# Open browser to shown URL (usually http://localhost:8080)
```

## 📁 Project Structure

```
d:/NetflixClone/
│
├── index.html              # Main HTML file
│
├── styles/
│   └── main.css           # Complete styling
│
├── js/
│   ├── config.js          # API configuration
│   ├── api.js             # TMDb API service
│   └── app.js             # Application logic
│
└── README.md              # This file
```

## 🎯 Usage Guide

### 1. **Login**

- Enter any email and password
- Click "Sign In" or "Sign Up"
- You'll be redirected to the home page

### 2. **Browse Movies**

- Scroll through different categories
- Hover over movie cards to see title and rating
- Horizontal scroll or drag to see more movies in each row

### 3. **View Details**

- Click any movie card
- Modal opens with full details
- Click X or outside modal to close

### 4. **Search**

- Use search bar in top-right navbar
- Type movie/TV show name
- Press Enter or click search icon
- View results in grid layout

### 5. **Navigation**

- Click "Suresh Cinemas" logo to return home
- Use browser back button to navigate

## 🎬 Special Feature: Telugu Movies

The site features a dedicated **Telugu Movies** section showcasing popular Tollywood cinema:

- Filters movies by Telugu language (`te`)
- Sorted by popularity
- Features hits like RRR, Pushpa, and more
- Positioned prominently after "Trending Now"

## 🔧 Technical Details

### API Integration

- **Service**: The Movie Database (TMDb) API
- **API Key**: Configured in `js/config.js`
- **Endpoints**: Trending, Top Rated, Genre-based, Search, Details
- **Rate Limiting**: Handled by TMDb (40 requests/10 seconds)

### Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

### No Dependencies

- Pure vanilla JavaScript (ES6+)
- No frameworks or libraries
- No build process required
- No npm packages needed

## 🎨 Customization

### Change Branding

Edit line 17 in `index.html`:

```html
<h1 class="logo">Your Brand Name</h1>
```

### Add More Categories

1. Add endpoint in `js/api.js` endpoints object
2. Add HTML row in `index.html`
3. Add element reference in `js/app.js` elements object
4. Add to `loadHomePage()` function

### Modify Theme Colors

Edit CSS variables in `styles/main.css`:

```css
:root {
  --color-background: #141414;
  --color-primary: #e50914;
  /* ... more variables */
}
```

## 📝 Code Comments

The code is extensively commented for beginners:

- Each function has a descriptive comment
- Complex logic is explained inline
- API structure is documented
- Component architecture is clear

## 🐛 Troubleshooting

### Movies Not Loading?

- Check your internet connection
- Verify API key in `js/config.js`
- Check browser console for errors (F12)

### Images Not Showing?

- TMDb images may take time to load
- Placeholder images will show if poster unavailable

### Search Not Working?

- Make sure you're logged in
- Check console for API errors
- Try different search terms

## 🚧 Future Enhancements

Potential features to add:

- [ ] Infinite scroll / Load more
- [ ] Skeleton loading states
- [ ] Video trailers
- [ ] Real backend authentication
- [ ] My List functionality (localStorage)
- [ ] Watch history
- [ ] User profiles
- [ ] More regional languages (Hindi, Tamil, etc.)

## 📄 License

This is an educational project for learning purposes.

**Note**: TMDb API has usage limits. For production use:

- Implement rate limiting
- Add error handling
- Use environment variables for API key
- Consider backend proxy

## 🙏 Credits

- **Movie Data**: [The Movie Database (TMDb)](https://www.themoviedb.org/)
- **Design Inspiration**: Netflix
- **Developer**: Built with ❤️ as a learning project

---

**Enjoy your Netflix clone! 🎉**

For questions or issues, check the browser console (F12) for error messages.
