import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { navigateTo } from "../../utils/navigation";
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
              handleScrollto={(path: string) => navigateTo(navigate, path)}
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
