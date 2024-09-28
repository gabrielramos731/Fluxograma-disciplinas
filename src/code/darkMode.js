const iconeLua = document.querySelector(".lua")
const iconeSol = document.querySelector(".sol")

const userTheme = localStorage.getItem("theme");  // armazena último estado do usuário
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;  // armazena tema do SO

const iconToggle = () => {
    iconeLua.classList.toggle("hidden");
    iconeSol.classList.toggle("hidden");
};

// tema inicial
const themeCheck = () => {
    if(userTheme === "dark" || (!userTheme && systemTheme)){
        document.documentElement.classList.add("dark");
        iconeLua.classList.add("hidden");
        return;
    }
    iconeSol.classList.add("hidden");
};

const themeSwitch = () => {
    if(document.documentElement.classList.contains("dark")){
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme","light");
        iconToggle();
        return;
    }
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme","dark");
    iconToggle();
}

iconeLua.addEventListener("click", () => {
    themeSwitch();
})

iconeSol.addEventListener("click", () => {
    themeSwitch();
})

themeCheck();
