import {
  useState,
  useEffect,
  useRef
} from "react";

import { FiChevronDown } from "react-icons/fi";

import Dropdown from "./Dropdown";

const MenuItems = ({items, depthLevel}) => {
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef();

  useEffect(() => {
      const handler = (event) => {
          if (dropdown && ref.current && !ref.current.contains(event.target)) {
              setDropdown(false);
          }
      };
      document.addEventListener("mousedown", handler);
      document.addEventListener("touchstart", handler);
      return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", handler);
          document.removeEventListener("touchstart", handler);
      };
  }, [dropdown]);

  const onMouseEnter = () => {
      window.innerWidth > 960 && setDropdown(true);
  };

  const onMouseLeave = () => {
      window.innerWidth > 960 && setDropdown(false);
  };

  return ( <li className = "menu-items"
              ref = { ref }
              onMouseEnter = {onMouseEnter}
              onMouseLeave = {onMouseLeave} >
      {
          items.submenu ? ( 
            <>
              <button type = "button"
                      aria-haspopup = "menu"
                      aria-expanded = {
                      dropdown ? "true" : "false"
              }
              onClick = {
                  () => setDropdown((prev) => !prev)
              } >
              { items.title }{ " " } {
                  depthLevel > 0 ? < span > &raquo; </span> : <span><FiChevronDown/></span>
              } </button> 
                  <Dropdown depthLevel = { depthLevel }
                            submenus = { items.submenu }
                            dropdown = { dropdown }
                    /> 
            </>
          ) : ( <div className="submenu-items">
                  <span> < img src = { items.src } alt="img"/> </span>
                  <span> { items.text }</span>
                  <a href = "/#" > { items.title }</a> 
                 
                </div>
          )
      } </li>
  );
};

export default MenuItems;