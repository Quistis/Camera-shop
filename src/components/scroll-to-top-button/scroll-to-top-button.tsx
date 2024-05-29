import { useRef, useEffect, useCallback, memo } from 'react';

const ScrollToTopButton = memo(() => {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleScrollToTopButtonClick = useCallback((event: MouseEvent) => {
    event.preventDefault();

    const options: ScrollIntoViewOptions = {
      behavior: 'smooth',
      block: 'start'
    };

    document.body.scrollIntoView(options);
  }, []);

  useEffect(() => {
    const currentButtonRef = buttonRef.current;

    if (currentButtonRef) {
      currentButtonRef.addEventListener('click', handleScrollToTopButtonClick);
    }

    return () => {
      if (currentButtonRef) {
        currentButtonRef.removeEventListener('click', handleScrollToTopButtonClick);
      }
    };
  }, [handleScrollToTopButtonClick]);

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
});

ScrollToTopButton.displayName = 'ScrollToTopButton';

export default ScrollToTopButton;
