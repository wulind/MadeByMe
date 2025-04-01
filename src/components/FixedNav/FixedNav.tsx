/* eslint-disable no-warning-comments */
import classNames from 'classnames'
import React, {useEffect, useRef, useState} from 'react';
import { useLenis } from '../../ContextProviders/LenisProvider';
import FixedNavItem from './FixedNavItem';
import "./FixedNav.css";

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
        >
            <>
                <div>
                    <div>
                        <div>
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
