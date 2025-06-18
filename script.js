const pages = {
  home: {
    url: "https://example.com/home",
    content: "",
  },
  settings: {
    url: "https://example.com/settings",
    content: `
      <h2>設定</h2>
      <p>ここは設定ページです。</p>
      <p>画面サイズ切り替えもここから操作できます。</p>
    `,
  },
  about: {
    url: "https://example.com/about",
    content: `
      <h2>About</h2>
      <p>スマホエミュレータのデモページです。</p>
      <p>複数ページの切り替えができます。</p>
    `,
  },
  news: {
    url: "https://example.com/news",
    content: `
      <h2>ニュース</h2>
      <p>最新ニュースをお届けします。</p>
      <ul>
        <li>ニュース１</li>
        <li>ニュース２</li>
        <li>ニュース３</li>
      </ul>
    `,
  },
};

let historyStack = [];
let currentPage = null;

// ホーム画面はアイコン表示
function renderHome() {
  const contentArea = document.getElementById("content-area");
  const urlBar = document.getElementById("url-bar");
  urlBar.textContent = pages.home.url;

  // アイコン配置HTML生成
  const iconsHTML = Object.entries(pages)
    .filter(([key]) => key !== "home")
    .map(([key, page]) => {
      // アイコンはページ名の頭文字大文字を表示（自由に変えてOK）
      const iconChar = key.charAt(0).toUpperCase();
      return `
        <div class="home-icon" data-page="${key}" title="${key}">
          <div class="icon-img">${iconChar}</div>
          <div class="icon-label">${key}</div>
        </div>
      `;
    })
    .join("");
  contentArea.innerHTML = `<div class="home-icons">${iconsHTML}</div>`;

  // アイコンクリックでページ切り替え
  contentArea.querySelectorAll(".home-icon").forEach((icon) => {
    icon.addEventListener("click", () => {
      renderPage(icon.dataset.page);
    });
  });
}

// 指定ページ表示
function renderPage(pageKey, addToHistory = true) {
  if (!pages[pageKey]) return;
  if (currentPage && addToHistory && pageKey !== currentPage) {
    historyStack.push(currentPage);
  }
  currentPage = pageKey;

  if (pageKey === "home") {
    renderHome();
  } else {
    const contentArea = document.getElementById("content-area");
    const urlBar = document.getElementById("url-bar");
    contentArea.innerHTML = pages[pageKey].content;
    urlBar.textContent = pages[pageKey].url;
  }
}

function goBack() {
  if (historyStack.length === 0) {
    alert("戻れるページがありません。");
    return;
  }
  const prevPage = historyStack.pop();
  renderPage(prevPage, false);
}

function updateTime() {
  const timeDisplay = document.getElementById("time-display");
  const now = new Date();
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  timeDisplay.textContent = `${h}:${m}`;
}

function changeScreenSize(sizeKey) {
  const phone = document.getElementById("phone");
  phone.classList.remove("mini", "phone", "tablet");
  phone.classList.add(sizeKey);
}

document.addEventListener("DOMContentLoaded", () => {
  renderPage("home");

  updateTime();
  setInterval(updateTime, 1000 * 60);

  document.getElementById("btn-home").addEventListener("click", () => renderPage("home"));
  document.getElementById("btn-back").addEventListener("click", goBack);

  document.getElementById("screen-size-select").addEventListener("change", (e) => {
    changeScreenSize(e.target.value);
  });

  changeScreenSize("phone");
});
