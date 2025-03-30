// 学习资源数据
const learningResources = {
    basics: {
        title: "塔罗牌基础",
        content: "了解塔罗牌的历史、结构和基本概念",
        lessons: [
            {
                title: "塔罗牌的历史",
                content: "探索塔罗牌的起源和发展历程",
                duration: "30分钟"
            },
            {
                title: "塔罗牌的结构",
                content: "了解大阿卡纳牌和小阿卡纳牌的组成",
                duration: "45分钟"
            },
            {
                title: "基本概念",
                content: "学习塔罗牌占卜的基本概念和术语",
                duration: "60分钟"
            }
        ]
    },
    spreads: {
        title: "牌阵解读",
        content: "学习不同牌阵的布局和解读方法",
        lessons: [
            {
                title: "单张牌阵",
                content: "掌握单张牌阵的布局和解读技巧",
                duration: "30分钟"
            },
            {
                title: "三张牌阵",
                content: "学习过去、现在、未来的解读方法",
                duration: "45分钟"
            },
            {
                title: "凯尔特十字",
                content: "深入理解凯尔特十字牌阵的布局和含义",
                duration: "90分钟"
            }
        ]
    },
    interpretation: {
        title: "牌面解读",
        content: "掌握每张牌的含义和组合解读技巧",
        lessons: [
            {
                title: "大阿卡纳牌解读",
                content: "学习22张大阿卡纳牌的含义和象征",
                duration: "120分钟"
            },
            {
                title: "小阿卡纳牌解读",
                content: "了解56张小阿卡纳牌的含义和组合",
                duration: "120分钟"
            },
            {
                title: "组合解读",
                content: "掌握多张牌的组合解读方法",
                duration: "90分钟"
            }
        ]
    },
    practice: {
        title: "实践练习",
        content: "通过实际案例提升解读能力",
        lessons: [
            {
                title: "案例解析",
                content: "分析真实的塔罗牌占卜案例",
                duration: "60分钟"
            },
            {
                title: "实战练习",
                content: "进行实际的塔罗牌占卜练习",
                duration: "90分钟"
            },
            {
                title: "技巧提升",
                content: "提升塔罗牌解读的技巧和方法",
                duration: "60分钟"
            }
        ]
    }
};

// DOM 元素
const learnCards = document.querySelectorAll('.learn-card');
const learnLinks = document.querySelectorAll('.learn-link');

// 事件监听器
document.addEventListener('DOMContentLoaded', () => {
    // 为每个学习卡片添加点击事件
    learnCards.forEach((card, index) => {
        const link = card.querySelector('.learn-link');
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const resourceKey = Object.keys(learningResources)[index];
            showResourceDetails(resourceKey);
        });
    });

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
});

// 显示资源详情
function showResourceDetails(resourceKey) {
    const resource = learningResources[resourceKey];
    
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'resource-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>${resource.title}</h2>
            <p>${resource.content}</p>
            <div class="lessons-list">
                ${resource.lessons.map(lesson => `
                    <div class="lesson-item">
                        <h3>${lesson.title}</h3>
                        <p>${lesson.content}</p>
                        <span class="duration">${lesson.duration}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // 添加模态框到页面
    document.body.appendChild(modal);

    // 关闭按钮事件
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    // 点击模态框外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// 添加模态框样式
const style = document.createElement('style');
style.textContent = `
    .resource-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background-color: #fff;
        padding: 2rem;
        border-radius: 10px;
        max-width: 800px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
    }

    .close-modal {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
    }

    .lessons-list {
        margin-top: 2rem;
    }

    .lesson-item {
        background-color: #f8f9fa;
        padding: 1.5rem;
        margin-bottom: 1rem;
        border-radius: 5px;
    }

    .lesson-item h3 {
        color: #2c3e50;
        margin-bottom: 0.5rem;
    }

    .lesson-item p {
        color: #666;
        margin-bottom: 0.5rem;
    }

    .duration {
        display: inline-block;
        background-color: #e74c3c;
        color: #fff;
        padding: 0.3rem 0.8rem;
        border-radius: 3px;
        font-size: 0.9rem;
    }
`;
document.head.appendChild(style); 