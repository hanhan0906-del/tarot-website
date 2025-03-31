// 表单处理
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                message: formData.get('message')
            };
            
            // 这里可以添加发送表单数据的逻辑
            console.log('Form submitted:', data);
            
            // 显示成功消息
            showMessage('消息已发送，我们会尽快回复您！', 'success');
            
            // 重置表单
            contactForm.reset();
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
});

// 显示消息提示
function showMessage(message, type = 'success') {
    // 创建消息元素
    const messageElement = document.createElement('div');
    messageElement.className = `message message-${type}`;
    messageElement.textContent = message;
    
    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .message {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 5px;
            color: #fff;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        }
        
        .message-success {
            background-color: #2ecc71;
        }
        
        .message-error {
            background-color: #e74c3c;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // 添加消息到页面
    document.body.appendChild(messageElement);
    
    // 3秒后移除消息
    setTimeout(() => {
        messageElement.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            messageElement.remove();
        }, 300);
    }, 3000);
}

// 团队成员卡片悬停效果
const teamMembers = document.querySelectorAll('.team-member');
teamMembers.forEach(member => {
    member.addEventListener('mouseenter', () => {
        member.style.transform = 'translateY(-10px)';
    });
    
    member.addEventListener('mouseleave', () => {
        member.style.transform = 'translateY(0)';
    });
});

// 添加页面滚动动画
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.about-story, .about-mission, .team-member, .value-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// 初始化动画样式
const initAnimations = () => {
    const elements = document.querySelectorAll('.about-story, .about-mission, .team-member, .value-item');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    });
};

// 监听滚动事件
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', initAnimations); 