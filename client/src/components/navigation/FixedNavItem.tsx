import classNames from "classnames";

interface FixedNavItemProps {
  id: string;
  label: string;
  activeIndex: number;
  handleScrollto: (id: string) => void;
  isCurrent: boolean;
  index: number;
}

const FixedNavItem = (props: FixedNavItemProps) => {
  return (
    <button
      className={classNames(
        "containerNav relative rounded-3xl m-1 px-5 py-2.5 bg-black hover:bg-white ease-in-out duration-300",
        {
          "hover:bg-grey-600": !props.isCurrent,
          "bg-white": props.index < props.activeIndex,
        }
      )}
      onClick={() => {
        props.handleScrollto(props.id);
      }}
    >
      <p className="text-sm padding-0 margin-0 text-white mix-blend-difference">
        {props.label}
      </p>
    </button>
  );
};

export default FixedNavItem;
