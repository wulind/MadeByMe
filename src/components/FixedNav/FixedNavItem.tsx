import classNames from 'classnames';
import * as React from 'react';
import { useLenis } from '../../ContextProviders/LenisProvider';

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
      className={classNames('containerNav group relative rounded-[100px]  uppercase', {
        'hover:bg-grey-600': !props.isCurrent,
        'bg-white': props.index < props.activeIndex,
      })}
      onClick={() => {
        handleScrollto(props.id)
      }}
    >
        <p className='misc-tabs-s text-grey-400 relative text-white mix-blend-difference'>
          {props.label}
        </p>
    </button>
  )
}

export default FixedNavItem;
