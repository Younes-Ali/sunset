import { useNavigate, NavLink } from "react-router-dom";

export default function NavBar() {
    const linkStyle = "text-lg font-semibold text-white hover:bg-creamy hover:text-black transition-colors duration-300 px-3 py-2 rounded-lg hover:shadow-lg";
    const navigate = useNavigate();
    return (
        <div className="hidden sm:flex gap-6 font-dancing-script">
            <NavLink className={({isActive})=> `${linkStyle} ` + (isActive&&'border-2 border-creamy')} to={'/'}>
                Home
            </NavLink>
            <NavLink className={({isActive})=> `${linkStyle} ` + (isActive&&'border-2 border-creamy')} to={'/about'}>
                About
            </NavLink>
            <NavLink className={({isActive})=> `${linkStyle} ` + (isActive ? 'border-2 border-creamy' : " ")} to={'/forecast'}>
                Forecast
            </NavLink>
            <NavLink className={({isActive})=> `${linkStyle} ` + (isActive&&'border-2 border-creamy')} to={'/contact'}>
                Contact Us
            </NavLink>
        </div>
    );
}
