document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 바 제어
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section, header');
    
    // 스크롤 시 네비게이션 바 스타일 변경
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 현재 보고 있는 섹션에 해당하는 네비게이션 링크 활성화
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // 모바일 메뉴 토글
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // 네비게이션 링크 클릭 시 스크롤 이동 및 모바일 메뉴 닫기
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 스크롤 이동
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // 모바일 메뉴 닫기
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
    
    // 스크롤 애니메이션 효과
    const scrollElements = document.querySelectorAll('.scroll-animation');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // 초기 로드 시 실행
    handleScrollAnimation();
    
    // 폼 제출 처리
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // 간단한 유효성 검사
            if (!nameInput.value || !emailInput.value || !messageInput.value) {
                alert('모든 필드를 채워주세요.');
                return;
            }
            
            // 실제 구현에서는 서버로 데이터를 전송하는 코드가 들어갈 수 있습니다.
            // 여기서는 사용자에게 메시지가 성공적으로 전송되었다는 알림만 표시합니다.
            alert('메시지가 성공적으로 전송되었습니다. 곧 연락드리겠습니다!');
            
            // 폼 초기화
            contactForm.reset();
        });
    }
    
    // 스킬 프로그레스 바 애니메이션
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.width = percentage + '%';
        });
    }
    
    // 스킬 섹션이 뷰포트에 들어오면 애니메이션 시작
    const skillsSection = document.getElementById('skills');
    
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSkills();
                        skillsObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.3 }
        );
        
        skillsObserver.observe(skillsSection);
    }
    
    // 타이핑 효과
    const typingElement = document.querySelector('.typing-effect');
    
    if (typingElement) {
        const texts = JSON.parse(typingElement.getAttribute('data-text'));
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1000; // 텍스트 표시 후 잠시 멈춤
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // 새 텍스트 시작 전 잠시 멈춤
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // 타이핑 효과 시작
        setTimeout(type, 1000);
    }
});
