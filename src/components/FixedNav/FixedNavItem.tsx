import classNames from 'classnames';
import * as React from 'react';
import { useLenis } from '../../ContextProviders/LenisProvider';
import './FixedNavItem.css'; 

interface FixedNavItemProps {
    id: string;
    label: string;
    activeIndex: number;
    isCurrent: boolean;
    index: number;
    storeSelectionPannels: (element: HTMLElement | null, index: number) => void;
}

const FixedNavItem = (props: FixedNavItemProps) => {
    const { lenis } = useLenis();
    
    const handleScrollto = (id: string) => {
        if (lenis){
            lenis.scrollTo(`#${id}`, {duration: 1.5});
        }
    }

  return (
    <button
      className={classNames('containerNav relative rounded uppercase bg-black', {
        'hover:bg-grey-600': !props.isCurrent,
        'bg-white': props.index < props.activeIndex,
      })}
      onClick={() => {
        handleScrollto(props.id)
      }}
    >
        <p className='text-size-small padding-0 margin-0 text-white mix-blend-difference'>
          {props.label}
        </p>
    </button>
  )
}

export default FixedNavItem;
