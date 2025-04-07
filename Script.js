document.addEventListener('DOMContentLoaded', function () {
    // Menu Burger
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    burgerMenu.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    });

    // Fermer le menu burger au clic sur un lien (hors dropdown principal)
    document.querySelectorAll('.nav-links a:not(.dropdown > a)').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burgerMenu.classList.remove('active');
        });
    });

    // Dropdowns adaptatifs
    const dropdowns = document.querySelectorAll('.dropdown');

    function setupDropdowns() {
        // On nettoie les anciens écouteurs (évite les doublons sur resize)
        dropdowns.forEach(dropdown => {
            const clone = dropdown.cloneNode(true);
            dropdown.parentNode.replaceChild(clone, dropdown);
        });

        const updatedDropdowns = document.querySelectorAll('.dropdown');

        if (window.innerWidth <= 768) {
            // Mode mobile
            updatedDropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('a');
                const menu = dropdown.querySelector('.dropdown-menu');

                if (link && menu) {
                    link.addEventListener('click', function (e) {
                        e.preventDefault();
                        const isOpen = menu.classList.contains('show');

                        // Fermer tous les menus
                        document.querySelectorAll('.dropdown-menu').forEach(m => {
                            m.classList.remove('show');
                        });

                        // Ouvrir le menu ciblé
                        if (!isOpen) {
                            menu.classList.add('show');
                        }
                    });
                }
            });
        } else {
            // Mode desktop (hover)
            updatedDropdowns.forEach(dropdown => {
                const menu = dropdown.querySelector('.dropdown-menu');

                dropdown.addEventListener('mouseenter', function () {
                    if (menu) {
                        menu.style.opacity = '1';
                        menu.style.visibility = 'visible';
                    }
                });

                dropdown.addEventListener('mouseleave', function () {
                    if (menu) {
                        menu.style.opacity = '0';
                        menu.style.visibility = 'hidden';
                    }
                });
            });
        }
    }

    // Gestion du redimensionnement
    window.addEventListener('resize', setupDropdowns);

    // Initialisation des dropdowns
    setupDropdowns();

    // Fermeture dropdowns si clic ailleurs (mobile)
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768 && !e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });

    // Animation des blocs liens externes
    document.querySelectorAll('.link-block').forEach(block => {
        block.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        block.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});
