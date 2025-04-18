import classNames from "classnames";

interface FixedNavItemProps {
  id: string;
  label: string;
  navigationLink: string;
  handleScrollto: (id: string) => void;
  index: number;
}

const FixedNavItem = (props: FixedNavItemProps) => {
  return (
    <button
      className="containerNav relative rounded-3xl m-1 px-5 py-2.5 bg-black hover:bg-white ease-in-out duration-300"
      onClick={() => {
        props.handleScrollto(props.navigationLink);
      }}
    >
      <p className="text-sm padding-0 margin-0 text-white mix-blend-difference">
        {props.label}
      </p>
    </button>
  );
};

export default FixedNavItem;
