'use strict';

document.addEventListener('DOMContentLoaded', function () {

    /* ==========================================
        🐈　スクロールでふわっと表示（fade-in系）
       ========================================== */
    const upTargets = document.querySelectorAll('.section-container, .price-card, .faq-item');
    const leftTargets = document.querySelectorAll('.services-list li');
    const scaleTargets = document.querySelectorAll('.stepbarwrap');

    upTargets.forEach(el => el.classList.add('fade-up'));
    leftTargets.forEach(el => el.classList.add('fade-left'));
    scaleTargets.forEach(el => el.classList.add('fade-scale'));

    const allFadeTargets = [...upTargets, ...leftTargets, ...scaleTargets];

    const fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    allFadeTargets.forEach(target => fadeObserver.observe(target));


    /* ==========================================
        🐈　トップに戻るボタン
       ========================================== */
    const toTopBtn = document.getElementById('to-top-btn');
    const mainvisual = document.getElementById('mainvisual');

    if (toTopBtn && mainvisual) {
        const btnObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                toTopBtn.classList.remove('is-visible');
                if (header) header.classList.remove('is-scrolled');   // ← 追加
            } else {
                toTopBtn.classList.add('is-visible');
                if (header) header.classList.add('is-scrolled');      // ← 追加
            }
            });
        }, {
            threshold: 0
        });

        btnObserver.observe(mainvisual);

        toTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================
        🐈　ハンバーガーメニュー
       ========================================== */
    const burgerBtn = document.querySelector('.burger-btn');
    const nav = document.querySelector('nav');

    if (burgerBtn && nav) {
        burgerBtn.addEventListener('click', function () {
            burgerBtn.classList.toggle('is-active');
            nav.classList.toggle('is-open');
        });

        // メニュー内のリンクをクリックしたら自動で閉じる
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                burgerBtn.classList.remove('is-active');
                nav.classList.remove('is-open');
            });
        });
    }

    /* ==========================================
        🐈　よくあるご質問（FAQ）のスムーズな開閉
       ========================================== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');

        if (!trigger || !content) return;

        trigger.addEventListener('click', function (event) {
            // ブラウザ標準の瞬時開閉をキャンセルし、高さアニメーションで開閉する
            event.preventDefault();

            if (item.classList.contains('is-animating')) return;

            if (item.open) {
                // 閉じる：現在の高さ→0へアニメーション
                item.classList.add('is-animating');
                content.style.height = content.scrollHeight + 'px';

                requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                        content.style.height = '0px';
                    });
                });

                content.addEventListener('transitionend', function onEnd() {
                    content.removeEventListener('transitionend', onEnd);
                    item.open = false;
                    content.style.height = '';
                    item.classList.remove('is-animating');
                }, { once: true });

            } else {
                // 開く：0→本来の高さへアニメーション
                item.open = true;
                item.classList.add('is-animating');

                const targetHeight = content.scrollHeight;
                content.style.height = '0px';

                requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                        content.style.height = targetHeight + 'px';
                    });
                });

                content.addEventListener('transitionend', function onEnd() {
                    content.removeEventListener('transitionend', onEnd);
                    content.style.height = '';
                    item.classList.remove('is-animating');
                }, { once: true });
            }
        });
    });

});