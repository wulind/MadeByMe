import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLenis } from "lenis/react";
import FixedNavItem from "./FixedNavItem";
import "./FixedNav.css";

interface FixedNavProps {
  id: string;
  items: any[];
}

const FixedNav = (props: FixedNavProps) => {
  const navigate = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [currentSection, setCurrentSection] = useState(null);
  const lenis = useLenis();

  const handleScrollto = (id: string) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { duration: 1.2 });
    }
  };

  const handleAppendToUrl = (valueToAppend: string) => {
    navigate(`/${valueToAppend}`);
  };

  useEffect(() => {
    setItems(props.items);

    return () => {
      setItems([]);
    };
  }, [props.items]);

  return (
    <section id={props.id || undefined}>
      {items.length > 0 &&
        items.map((props: any, i: number) => {
          return (
            <FixedNavItem
              key={props._uid}
              {...props}
              handleScrollto={handleAppendToUrl}
              index={i}
              isCurrent={currentSection === i}
              activeIndex={currentSection}
            />
          );
        })}
    </section>
  );
};

export default FixedNav;
