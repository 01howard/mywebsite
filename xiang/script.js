const drawBtn = document.getElementById('draw-btn');
const displayArea = document.getElementById('display-area');
const loadingText = document.getElementById('loading-text');

const moods = [
    "📱 容易查手機（建議手機先收進書包）",
    "📚 容易查作業（沒寫的同學請保重）",
    "😇 開心放過學生（今天大家都是好朋友）",
    "☕ 正在喝咖啡（心情指數：穩定）"
];

drawBtn.addEventListener('click', function() {
    // 1. 先讓按鈕失效，防止連點
    drawBtn.disabled = true;
    drawBtn.innerText = "計算中...";
    loadingText.style.display = "block";
    displayArea.style.opacity = "0.3"; // 讓原本的圖片變淡

    // 2. 延遲 800 毫秒後顯示結果
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * moods.length);
        const result = moods[randomIndex];

        // 更換內容
        displayArea.innerHTML = `<h2 class="result-animation">${result}</h2>`;
        
        // 恢復按鈕
        loadingText.style.display = "none";
        drawBtn.disabled = false;
        drawBtn.innerText = "再抽一次";
        displayArea.style.opacity = "1";
    }, 800);
});

function updateStatus() {
    const now = new Date();
    const day = now.getDay(); // 0是週日，1-6是週一到週六
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTimeInMinutes = hours * 60 + minutes;

    const daysName = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const dayStatusEl = document.getElementById('day-status');
    const classStatusEl = document.getElementById('class-status');

    // 1. 判斷是否要上課 (週末放假)
    if (day === 0 || day === 6) {
        dayStatusEl.innerText = `今天是 ${daysName[day]}，不用上課爽！😎`;
    } else {
        dayStatusEl.innerText = `今天是 ${daysName[day]}，又是痛苦的上課日...😢`;
    }

    // 2. 補習班課表設定 (時間轉換為分鐘)
    const schedule = {
        1: { name: "數學", time: 17 * 60 + 40 }, // 17:40
        3: { name: "物理", time: 18 * 0 + 0 },  // 18:00 (寫法簡化)
        4: { name: "英文", time: 18 * 60 + 10 } // 18:10
    };

    if (schedule[day]) {
        const classTime = schedule[day].time;
        const className = schedule[day].name;
        const diff = classTime - currentTimeInMinutes;

        if (diff > 60) {
            classStatusEl.innerText = `距離 ${className} 補習還有很久，再浪費一下時間。`;
        } else if (diff > 0) {
            classStatusEl.innerText = `僅剩 ${diff} 分鐘就要上 ${className} 了！快跑啊！🏃‍♂️`;
        } else if (diff > -180) { // 假設補習3小時內算「來不及」
            classStatusEl.innerText = `來不及了！${className} 已經開始上課了，準備被老師瞪。`;
        } else {
            classStatusEl.innerText = `呼... ${className} 終於下課了，活著真好。`;
        }
    } else {
        classStatusEl.innerText = "今天沒有補習，你是自由的靈魂！✨";
    }
}

// 啟動時執行一次，並每分鐘更新一次
updateStatus();
setInterval(updateStatus, 60000);