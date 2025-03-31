// 塔罗牌数据
const tarotCards = {
    majorArcana: [
        { id: 0, name: "愚者", image: "fool.jpg", meaning: "新的开始、冒险、纯真" },
        { id: 1, name: "魔术师", image: "magician.jpg", meaning: "创造力、技能、自信" },
        { id: 2, name: "女祭司", image: "priestess.jpg", meaning: "直觉、神秘、内在知识" },
        // ... 更多大阿卡纳牌
    ],
    minorArcana: {
        wands: [
            { id: "wands-ace", name: "权杖王牌", image: "wands-ace.jpg", meaning: "灵感、机会、新开始" },
            // ... 更多权杖牌
        ],
        cups: [
            { id: "cups-ace", name: "圣杯王牌", image: "cups-ace.jpg", meaning: "情感、爱、创造力" },
            // ... 更多圣杯牌
        ],
        swords: [
            { id: "swords-ace", name: "宝剑王牌", image: "swords-ace.jpg", meaning: "真理、清晰、突破" },
            // ... 更多宝剑牌
        ],
        pentacles: [
            { id: "pentacles-ace", name: "钱币王牌", image: "pentacles-ace.jpg", meaning: "繁荣、机会、物质" },
            // ... 更多钱币牌
        ]
    }
};

// 牌阵定义
const spreads = {
    single: {
        name: "单张牌阵",
        positions: ["当前情况"],
        description: "快速解答具体问题"
    },
    three: {
        name: "三张牌阵",
        positions: ["过去", "现在", "未来"],
        description: "过去、现在、未来的完整解读"
    },
    celtic: {
        name: "凯尔特十字",
        positions: [
            "当前情况",
            "面临的挑战",
            "遥远的过去",
            "最近的过去",
            "可能的结果",
            "近期未来",
            "自身态度",
            "环境因素",
            "希望或恐惧",
            "最终结果"
        ],
        description: "深入分析复杂问题"
    }
};

// 当前状态
let currentState = {
    selectedSpread: null,
    question: "",
    selectedCards: [],
    currentStep: "spread-selection"
};

// DOM 元素
const spreadSelection = document.querySelector('.spread-selection');
const questionForm = document.querySelector('.question-form');
const cardSelection = document.querySelector('.card-selection');
const readingResult = document.querySelector('.reading-result');
const cardGrid = document.querySelector('.card-grid');

// 事件监听器
document.addEventListener('DOMContentLoaded', () => {
    // 牌阵选择按钮
    document.querySelectorAll('.select-spread').forEach(button => {
        button.addEventListener('click', (e) => {
            const spreadType = e.target.dataset.spread;
            selectSpread(spreadType);
        });
    });

    // 问题表单提交
    document.getElementById('tarot-question').addEventListener('submit', (e) => {
        e.preventDefault();
        const question = e.target.querySelector('textarea').value;
        submitQuestion(question);
    });

    // 新占卜按钮
    document.querySelector('.new-reading').addEventListener('click', resetReading);
});

// 选择牌阵
function selectSpread(spreadType) {
    currentState.selectedSpread = spreadType;
    currentState.currentStep = "question-form";
    
    // 更新UI
    spreadSelection.style.display = 'none';
    questionForm.style.display = 'block';
}

// 提交问题
function submitQuestion(question) {
    currentState.question = question;
    currentState.currentStep = "card-selection";
    
    // 更新UI
    questionForm.style.display = 'none';
    cardSelection.style.display = 'block';
    
    // 生成牌面选择界面
    generateCardSelection();
}

// 生成牌面选择界面
function generateCardSelection() {
    cardGrid.innerHTML = '';
    const allCards = [...tarotCards.majorArcana];
    
    // 随机打乱牌面
    shuffleArray(allCards);
    
    // 创建牌面元素
    allCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `
            <img src="images/cards/${card.image}" alt="${card.name}">
        `;
        cardElement.addEventListener('click', () => selectCard(card));
        cardGrid.appendChild(cardElement);
    });
}

// 选择牌面
function selectCard(card) {
    currentState.selectedCards.push(card);
    
    // 检查是否选择了足够的牌
    if (currentState.selectedCards.length === spreads[currentState.selectedSpread].positions.length) {
        showReadingResult();
    }
}

// 显示解读结果
function showReadingResult() {
    currentState.currentStep = "reading-result";
    
    // 更新UI
    cardSelection.style.display = 'none';
    readingResult.style.display = 'block';
    
    // 生成解读内容
    const resultContent = document.querySelector('.result-content');
    resultContent.innerHTML = generateReadingResult();
}

// 生成解读结果
function generateReadingResult() {
    const spread = spreads[currentState.selectedSpread];
    let html = `<h3>问题：${currentState.question}</h3>`;
    
    currentState.selectedCards.forEach((card, index) => {
        html += `
            <div class="card-reading">
                <h4>${spread.positions[index]}</h4>
                <img src="images/cards/${card.image}" alt="${card.name}">
                <h5>${card.name}</h5>
                <p>${card.meaning}</p>
            </div>
        `;
    });
    
    return html;
}

// 重置占卜
function resetReading() {
    currentState = {
        selectedSpread: null,
        question: "",
        selectedCards: [],
        currentStep: "spread-selection"
    };
    
    // 重置UI
    readingResult.style.display = 'none';
    spreadSelection.style.display = 'block';
}

// 工具函数：数组随机打乱
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
} 