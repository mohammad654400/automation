import React, { useState, ReactNode } from "react";
import { BiHome, BiPencil } from "react-icons/bi";
import {
  FaAngleDown,
  FaAngleLeft,
  FaRegClock,
  FaCaretDown,
} from "react-icons/fa";
import { GoProject } from "react-icons/go";
import { RiContractLine, RiSettings5Line } from "react-icons/ri";
import { RxExit } from "react-icons/rx";
import { TiTickOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import "./Menu.css";

interface MenuItemProps {
  icon: React.ComponentType<any>;
  text: string;
  to?: string;
  showAngleDown?: boolean;
  children?: ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  text,
  to,
  showAngleDown = true,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    if (showAngleDown) setIsOpen(!isOpen);
  };

  return (
    <div className="menu-item">
      <div className="menu-item-content" onClick={toggleOpen}>
        <div style={{display:"flex",flexDirection:"row"}}>
        <Icon className="icon" />
        {to ? (
          <Link to={to} className="menu-item-text">
            {text}
          </Link>
        ) : (
          <h4 className="menu-item-text">{text}</h4>
        )}
        </div>
       
        {showAngleDown &&
          (isOpen ? (
            <FaAngleDown className="angle-icon" />
          ) : (
            <FaAngleLeft className="angle-icon" />
          ))}
      </div>
      {isOpen && children && <div className="submenu">{children}</div>}
    </div>
  );
};

const Menu: React.FC = () => {
  return (
    <div className="menu-container">
      <div className="header">
        <div className="header-text-container">
          <h2 className="username">نام کاربری</h2>
          <p className="phone-number">0915999934</p>
        </div>
        <div className="caret-down-container">
          <FaCaretDown className="caret-down-icon" />
        </div>
      </div>
      <div className="menu-content">
        <MenuItem icon={BiHome} text="خانه" to="/" showAngleDown={false} />
        <MenuItem icon={BiPencil} text="اتوماسیون اداری">
          <Link to="/home/automation/requestform1">ثبت درخواست</Link>
          <Link to="/automation/sub2">آیتم زیرمنو 2</Link>
        </MenuItem>
        <MenuItem icon={FaRegClock} text="برنامه ریزی شخصی">
          <Link to="/planning/sub1">آیتم زیرمنو 1</Link>
          <Link to="/planning/sub2">آیتم زیرمنو 2</Link>
        </MenuItem>
        <MenuItem icon={TiTickOutline} text="ثبت مشتریان">
          <Link to="/customers/sub1">آیتم زیرمنو 1</Link>
          <Link to="/customers/sub2">آیتم زیرمنو 2</Link>
        </MenuItem>
        <MenuItem icon={RiContractLine} text="ثبت قرارداد">
          <Link to="/contracts/sub1">آیتم زیرمنو 1</Link>
          <Link to="/contracts/sub2">آیتم زیرمنو 2</Link>
        </MenuItem>
        <MenuItem icon={GoProject} text="ثبت پروژه">
          <Link to="/projects/sub1">آیتم زیرمنو 1</Link>
          <Link to="/projects/sub2">آیتم زیرمنو 2</Link>
        </MenuItem>
        <MenuItem icon={GoProject} text="حسابداری">
          <Link to="/accounting/sub1">آیتم زیرمنو 1</Link>
          <Link to="/accounting/sub2">آیتم زیرمنو 2</Link>
        </MenuItem>
        <MenuItem icon={RiSettings5Line} text="تنظیمات نرم افزار">
          <Link to="/settings/sub1">آیتم زیرمنو 1</Link>
          <Link to="/settings/sub2">آیتم زیرمنو 2</Link>
        </MenuItem>
      </div>
      <div className="exit-container">
        <RxExit className="icon" />
        <h4 className="menu-item-text">خروج</h4>
      </div>
    </div>
  );
};

export default Menu;
