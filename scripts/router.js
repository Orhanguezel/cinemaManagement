// File: /scripts/router.js

const routes = {
    home: "/index.html",
    about: "/about.html",
    blog: "/blog.html",
    checkout: "/checkout.html",
    cinema: "/cinema.html",
    film: "/film.html",
    login: "/login.html",
    profile: "/profile.html",
    register: "/register.html",
};

export function navigateTo(route) {
    if (routes[route]) {
        window.location.href = routes[route];
    } else {
        console.error(`Route '${route}' bulunamadı!`);
    }
}
