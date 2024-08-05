import { useEffect } from 'react';

type UiBlockerProps = {
  isActive: boolean;
};

const UiBlocker = ({isActive}: UiBlockerProps): JSX.Element => {

  useEffect(() => {
    if (isActive) {
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }
  }, [isActive]);

  return (
    <div className={`modal ${isActive ? 'is-active' : ''} modal--narrow`}>
      <div className="modal__wrapper">
        <div className="modal__overlay"/>
        {/* <div className="modal__content modal--min-sizes"> */}
        <div className="loader"></div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default UiBlocker;

