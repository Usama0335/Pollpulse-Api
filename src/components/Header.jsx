import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AuthService from "../services/AuthService";

// eslint-disable-next-line react/prop-types
const Header = ({ toggleDarkMode, isDarkMode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
  };

  const navbarStyle = {
    paddingTop: "40px",
    paddingBottom: "30px",
  };

  return (
    <nav
      className="navbar navbar-expand-sm bg-primary navbar-dark"
      style={navbarStyle}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Pollpulse
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">
                {t("home")}
              </a>
            </li>
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/dashboard">
                    Dashboard
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/profile">
                    Profile
                  </a>
                </li>
              </>
            )}
          </ul>
          <div className="navbar-nav ms-auto">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <a className="nav-link bi-person-plus-fill" href="/register">
                    {t("register")}
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link bi-box-arrow-in-right" href="/login">
                    {t("login")}
                  </a>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? t("lightMode") : t("darkMode")}
              </button>
            </li>
            <li className="nav-item">
              <select
                className="nav-link btn btn-link"
                onChange={(e) => changeLanguage(e.target.value)}
                value={i18n.language}
                style={{ color: "blue" }}
              >
                <option style={{ color: "black" }} value="en">
                  English
                </option>
                <option style={{ color: "black" }} value="fi">
                  Finnish
                </option>
                <option style={{ color: "black" }} value="sv">
                  Swedish
                </option>
              </select>
            </li>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
