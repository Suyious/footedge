import "./style.css";

type NavigationProps = {
    left?: React.ReactNode,
    right?: React.ReactNode,
}

const Navigation:React.FC<NavigationProps> = ({ left, right }) => {
    return (
        <nav className="navigation_body">
            <div className="navigation_wrapper">
                <div className="navigation_left">{left}</div>
                <div className="navigation_right">{right}</div>
            </div>
        </nav>
    )
}

export default Navigation;