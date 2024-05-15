import { useRef, useEffect } from 'react';

const ScrollToTopButton = () => {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const scrollToTop = (event: MouseEvent) => {
      event.preventDefault();

      const options: ScrollIntoViewOptions = {
        behavior: 'smooth',
        block: 'start'
      };

      document.body.scrollIntoView(options);
    };

    const currentButtonRef = buttonRef.current;

    if (currentButtonRef) {
      currentButtonRef.addEventListener('click', scrollToTop);
    }

    return () => {
      if (currentButtonRef) {
        currentButtonRef.removeEventListener('click', scrollToTop);
      }
    };
  }, []);

  return (
    <a
      ref={buttonRef}
      className="up-btn"
      href="#header"
    >
      <svg width={12} height={18} aria-hidden="true">
        <use xlinkHref="#icon-arrow2" />
      </svg>
    </a>
  );
};

export default ScrollToTopButton;
