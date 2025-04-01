import classNames from 'classnames';
import './FixedNav.css'; 

interface FixedNavItemProps {
    id: string;
    label: string;
    activeIndex: number;
    handleScrollto: (id: string) => void;
    isCurrent: boolean;
    index: number;
    storeSelectionPannels: (element: HTMLElement | null, index: number) => void;
}

const FixedNavItem = (props: FixedNavItemProps) => {
  return (
    <button
      className={classNames('containerNav relative rounded uppercase bg-black', {
        'hover:bg-grey-600': !props.isCurrent,
        'bg-white': props.index < props.activeIndex,
      })}
      onClick={() => {
        props.handleScrollto(props.id);
      }}
    >
        <p className='text-size-small padding-0 margin-0 text-white mix-blend-difference'>
          {props.label}
        </p>
    </button>
  )
}

export default FixedNavItem;
