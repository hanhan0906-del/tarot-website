// 塔罗牌数据
const tarotCards = {
    majorArcana: [
        {
            id: "fool",
            name: "愚者",
            image: "fool.jpg",
            upright: "新的开始、冒险、纯真、自发性、自由",
            reversed: "鲁莽、轻率、过度冒险、不切实际"
        },
        {
            id: "magician",
            name: "魔术师",
            image: "magician.jpg",
            upright: "创造力、技能、自信、机会、行动",
            reversed: "技能不足、机会错失、自负、欺骗"
        },
        // ... 更多大阿卡纳牌
    ],
    wands: [
        {
            id: "wands-ace",
            name: "权杖王牌",
            image: "wands-ace.jpg",
            upright: "灵感、机会、新开始、创造力",
            reversed: "错失机会、创意受阻、虚假开始"
        },
        // ... 更多权杖牌
    ],
    cups: [
        {
            id: "cups-ace",
            name: "圣杯王牌",
            image: "cups-ace.jpg",
            upright: "情感、爱、创造力、直觉",
            reversed: "情感空虚、创造力受阻、虚假感情"
        },
        // ... 更多圣杯牌
    ],
    swords: [
        {
            id: "swords-ace",
            name: "宝剑王牌",
            image: "swords-ace.jpg",
            upright: "真理、清晰、突破、力量",
            reversed: "混乱、破坏、暴力、失败"
        },
        // ... 更多宝剑牌
    ],
    pentacles: [
        {
            id: "pentacles-ace",
            name: "钱币王牌",
            image: "pentacles-ace.jpg",
            upright: "繁荣、机会、物质、实用",
            reversed: "错失机会、物质损失、贪婪"
        },
        // ... 更多钱币牌
    ]
};

// DOM 元素
const filterButtons = document.querySelectorAll('.filter-btn');
const cardsGrid = document.querySelector('.cards-grid');

// 事件监听器
document.addEventListener('DOMContentLoaded', () => {
    // 初始化显示大阿卡纳牌
    displayCards('major');

    // 添加筛选按钮事件监听
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // 更新按钮状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            // 显示对应类型的牌
            const filter = e.target.dataset.filter;
            displayCards(filter);
        });
    });
});

// 显示牌面
function displayCards(filter) {
    cardsGrid.innerHTML = '';
    let cards = [];

    // 根据筛选类型选择对应的牌
    switch (filter) {
        case 'major':
            cards = tarotCards.majorArcana;
            break;
        case 'wands':
            cards = tarotCards.wands;
            break;
        case 'cups':
            cards = tarotCards.cups;
            break;
        case 'swords':
            cards = tarotCards.swords;
            break;
        case 'pentacles':
            cards = tarotCards.pentacles;
            break;
    }

    // 创建牌面元素
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = `card-item ${filter}`;
        cardElement.innerHTML = `
            <img src="images/cards/${card.image}" alt="${card.name}">
            <h3>${card.name}</h3>
            <div class="card-meaning">
                <h4>正位含义</h4>
                <p>${card.upright}</p>
                <h4>逆位含义</h4>
                <p>${card.reversed}</p>
            </div>
        `;
        cardsGrid.appendChild(cardElement);
    });
}

// 添加平滑滚动效果
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 