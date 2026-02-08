const fortunes = [
    { title: "大吉", text: "今天出門會撿到錢，但機率跟被雷劈到差不多。" },
    { title: "中吉", text: "你的體重維持得很好，完全沒有下降的趨勢。" },
    { title: "小吉", text: "今天老闆看你很順眼，可能是因為他剛領年終。" },
    { title: "末吉", text: "適合在家躺平，反正努力也不一定會成功（誤）。" },
    { title: "大凶", text: "今天千萬別過馬路——我是說，要注意安全。" },
    { title: "空", text: "籤筒是空的，代表你今天註定要加班。" },
    { title: "神蹟", text: "你會發現這張籤詩其實是電腦亂數產生的。" }
];

function drawFortune() {
    const tube = document.getElementById('bamboo-tube');
    const resultContainer = document.getElementById('result-container');
    
    // 1. 開始搖晃
    tube.classList.add('shake');
    
    // 2. 模擬搖晃 1.5 秒後出結果
    setTimeout(() => {
        tube.classList.remove('shake');
        
        // 隨機選一個籤
        const randomIndex = Math.floor(Math.random() * fortunes.length);
        const picked = fortunes[randomIndex];
        
        // 顯示結果
        document.getElementById('fortune-title').innerText = picked.title;
        document.getElementById('fortune-text').innerText = picked.text;
        
        tube.classList.add('hidden');
        resultContainer.classList.remove('hidden');
    }, 1500);
}

function reset() {
    document.getElementById('bamboo-tube').classList.remove('hidden');
    document.getElementById('result-container').classList.add('hidden');
}