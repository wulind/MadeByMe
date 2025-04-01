import {useEffect, useContext, useState} from 'react';
import { useLenis } from 'lenis/react';
import FixedNavItem from './FixedNavItem';
import "./FixedNav.css";

interface FixedNavProps {
    id: string;
    items: any[];
}

const FixedNav = (props: FixedNavProps) => {
    const [filteredItems, setFilteredItems] = useState<any[]>([]);
    const [currentSection, setCurrentSection] = useState(null);
    const lenis = useLenis();
    
    const handleScrollto = (id: string) => {
        if (lenis){
            lenis.scrollTo(`home`, {duration: 1.5});
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
            {filteredItems.length > 0 &&
                filteredItems.map((props: any, i: number) => {
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
        </section>
    )
}

export default FixedNav;
