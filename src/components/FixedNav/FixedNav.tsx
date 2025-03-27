/* eslint-disable no-warning-comments */
import classNames from 'classnames'
import React, {useEffect, useRef, useState} from 'react';
import { useLenis } from '../../ContextProviders/LenisProvider';
import FixedNavItem from './FixedNavItem';

interface FixedNavProps {
    id: string;
    items: any[];
    _editable: boolean;
}

const FixedNav = (props: FixedNavProps) => {
    const [filteredItems, setFilteredItems] = useState<any[]>([]);
    const [currentSection, setCurrentSection] = useState(null);
    const [lastSection, setLastSection] = useState(false);
    const { lenis } = useLenis();
    
    const handleScrollto = (id: string) => {
        if (lenis){
            lenis.scrollTo(`#${id}`, {duration: 1.5});
        }
    };

    useEffect(() => {
        const filtered_items = props.items.filter((item) => {
            if (document.getElementById(item.id) !== null) {
                return true;
            }
            return false;
        });
        
        setFilteredItems(filtered_items);

        return () => {
            setFilteredItems([]);
        };
    }, [props.items]);
        
    return (
        <section
            id={props.id || undefined}
            className={classNames('left-0 z-[99] hidden w-full mix-blend-difference md:fixed md:block', {
                '-bottom-30 opacity-0 transition-all duration-1000': lastSection === true,
                'bottom-13  opacity-100 transition-all duration-1000': lastSection === false,
            })}
        >
            <>
                <div className={'col-span-full flex justify-center'}>
                    <div className='flex justify-center'>
                        <div className='rounded-xxs relative flex w-full gap-4 '>
                        {filteredItems.length > 0 &&
                            filteredItems.map((props: any, i: number) => {
                                if (props.component !== 'fixed-nav-item') {
                                    return null;
                                }
                                return (
                                    <FixedNavItem
                                        key={props._uid}
                                        {...props}
                                        handleScrollto={handleScrollto}
                                        index={i}
                                        isCurrent={currentSection === i}
                                        storeSelectionPannels={() => {}}
                                        activeIndex={currentSection}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </>
        </section>
    )
}

export default FixedNav;
