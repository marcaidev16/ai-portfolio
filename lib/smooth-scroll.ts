export const smoothScrollTo = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
    e.preventDefault();
    const id = targetId.startsWith('#') ? targetId.substring(1) : targetId;
    const targetElement = document.getElementById(id);

    if (!targetElement) return;

    const startPosition = window.scrollY;
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1000; // 2 segundos para un efecto muy lento y premium
    let start: number | null = null;

    // Función de easing: easeInOutCubic para suavidad extrema al inicio y final
    const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);

        const ease = easeInOutCubic(percentage);

        window.scrollTo(0, startPosition + distance * ease);

        if (progress < duration) {
            window.requestAnimationFrame(step);
        } else {
            // Actualizar URL al terminar sin salto
            window.history.pushState(null, '', `#${id}`);
        }
    };

    window.requestAnimationFrame(step);
};
