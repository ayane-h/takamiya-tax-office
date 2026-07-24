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
                } else {
                    toTopBtn.classList.add('is-visible');
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

});