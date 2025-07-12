document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const fadeElements = document.querySelectorAll('.bean-card, .timeline-item, .method-card');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    const beanCards = document.querySelectorAll('.bean-card');
    beanCards.forEach(card => {
        card.addEventListener('click', function() {
            const beanType = this.dataset.bean;
            showBeanDetail(beanType);
        });
    });

    document.body.classList.add('smooth-scroll');
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

function showBeanDetail(beanType) {
    const beanInfo = {
        arabica: {
            title: '아라비카 (Coffea Arabica)',
            description: '세계 커피 생산량의 60-70%를 차지하는 가장 인기 있는 품종입니다.',
            origin: '에티오피아 고원지대',
            characteristics: [
                '부드럽고 달콤한 맛',
                '복합적인 향미 프로필',
                '낮은 카페인 함량 (1.2-1.5%)',
                '높은 고도에서 재배 (600-2000m)',
                '병충해에 취약'
            ],
            regions: ['콜롬비아', '브라질', '에티오피아', '과테말라', '케냐'],
            flavor: '꽃향, 과일향, 견과류, 초콜릿, 캐러멜'
        },
        robusta: {
            title: '로부스타 (Coffea Robusta)',
            description: '강한 맛과 높은 카페인 함량으로 에스프레소 블렌드에 자주 사용됩니다.',
            origin: '서아프리카',
            characteristics: [
                '강한 쓴맛과 진한 바디',
                '높은 카페인 함량 (2.2-2.7%)',
                '병충해에 강함',
                '낮은 고도에서 재배 가능',
                '크레마 생성이 우수'
            ],
            regions: ['베트남', '브라질', '인도네시아', '우간다'],
            flavor: '견과류, 다크 초콜릿, 토양, 스모키'
        },
        liberica: {
            title: '리베리카 (Coffea Liberica)',
            description: '독특한 풍미와 큰 사이즈의 원두로 유명한 희귀한 품종입니다.',
            origin: '라이베리아',
            characteristics: [
                '큰 원두 사이즈',
                '독특한 스모키한 풍미',
                '강한 과일향',
                '전체 생산량의 2% 미만',
                '내성이 강함'
            ],
            regions: ['필리핀', '말레이시아', '라이베리아'],
            flavor: '스모키, 과일향, 플로랄, 우디'
        },
        excelsa: {
            title: '엑셀사 (Coffea Excelsa)',
            description: '신맛과 과일향이 특징인 독특한 풍미 프로필을 가진 품종입니다.',
            origin: '동남아시아',
            characteristics: [
                '강한 신맛',
                '복합적인 과일향',
                '독특한 아로마',
                '블렌드용으로 주로 사용',
                '리베리카의 변종'
            ],
            regions: ['베트남', '필리핀'],
            flavor: '신맛, 과일향, 베리, 와인'
        }
    };

    const info = beanInfo[beanType];
    if (!info) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${info.title}</h2>
            <p class="description">${info.description}</p>
            
            <div class="detail-section">
                <h3>원산지</h3>
                <p>${info.origin}</p>
            </div>
            
            <div class="detail-section">
                <h3>특징</h3>
                <ul>
                    ${info.characteristics.map(char => `<li>${char}</li>`).join('')}
                </ul>
            </div>
            
            <div class="detail-section">
                <h3>주요 생산 지역</h3>
                <p>${info.regions.join(', ')}</p>
            </div>
            
            <div class="detail-section">
                <h3>풍미 프로필</h3>
                <p>${info.flavor}</p>
            </div>
        </div>
    `;

    const modalStyles = `
        .modal {
            display: block;
            position: fixed;
            z-index: 2000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background-color: white;
            margin: 5% auto;
            padding: 2rem;
            border-radius: 15px;
            width: 90%;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            animation: slideIn 0.3s ease;
        }
        
        .close {
            position: absolute;
            right: 1rem;
            top: 1rem;
            font-size: 2rem;
            font-weight: bold;
            cursor: pointer;
            color: #6B4423;
            transition: opacity 0.3s ease;
        }
        
        .close:hover {
            opacity: 0.7;
        }
        
        .modal h2 {
            color: #6B4423;
            margin-bottom: 1rem;
            padding-right: 2rem;
        }
        
        .description {
            color: #666;
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
            line-height: 1.6;
        }
        
        .detail-section {
            margin-bottom: 1.5rem;
        }
        
        .detail-section h3 {
            color: #8B4513;
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
        }
        
        .detail-section ul {
            list-style: none;
            margin-left: 0;
        }
        
        .detail-section li {
            padding: 0.3rem 0;
            padding-left: 1.5rem;
            position: relative;
            color: #555;
        }
        
        .detail-section li::before {
            content: '☕';
            position: absolute;
            left: 0;
            color: #6B4423;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @media (max-width: 768px) {
            .modal-content {
                margin: 10% auto;
                width: 95%;
                padding: 1.5rem;
            }
        }
    `;

    if (!document.getElementById('modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.querySelector('.modal')) {
            const currentModal = document.querySelector('.modal');
            if (currentModal) {
                document.body.removeChild(currentModal);
            }
        }
    });
}

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(107, 68, 35, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #6B4423 0%, #8B4513 100%)';
        header.style.backdropFilter = 'none';
    }
});

document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});