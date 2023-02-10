import React from 'react';
import MenuItems from "./MenuItems";

const Dropdown = ({ submenus, dropdown, depthLevel}) => {
  depthLevel = depthLevel + 1;
  const dropDownClass = depthLevel > 1 ? "dropdwon-submenu" : "";
  return (
    <ul className={`dropdown ${dropDownClass} ${dropdown ? "show" : ""}`}>
     { submenus.map((submenu, index) => (
        <MenuItems items = {submenu} key = {index} depthlevel = {depthLevel} />
      ))}
    </ul>
  )
}

export default Dropdown