import "./App.css";
import "../../index.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { act, useEffect, useState } from "react";
import { ItemModal } from "../ItemModal/ItemModal";
import { getWeather, parseWeatherData } from "../../utils/WeatherApi.jsx";
import { coordinates, APIkey } from "../../utils/Constants.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { Footer } from "../Footer/Footer.jsx";
import { Profile } from "../Profile/Profile.jsx";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute.jsx";
import {
  getItems,
  postItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import * as auth from "../../utils/auth.js";
import { setToken, getToken } from "../../utils/token.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import { AppContext } from "../../contexts/AppContext.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setUserData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  function loadSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const handleRegisterClick = () => {
    setActiveModal("register");
  };
  const handLoginClick = () => {
    setActiveModal("login");
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const switchModal = () => {
    if (activeModal == "register") {
      setActiveModal("login");
    } else {
      setActiveModal("register");
    }
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const onRegister = ({ email, password, name, avatar }) => {
    const makeRequest = () => {
      if (email) {
        return auth.register({ email, password, name, avatar }).then(() => {
          setActiveModal("login");
        });
      }
    };
    loadSubmit(makeRequest);
  };

  const onLogin = ({ email, password }) => {
    const makeRequest = () => {
      if (!email || !password) {
        return;
      }
      return auth.login({ email, password }).then((data) => {
        if (data.token) {
          setToken(data.token);
          setIsLoggedIn(true);
          auth
            .getUser(data.token)
            .then((user) => {
              setUserData(user);
            })
            .finally(() => {
              navigate("/profile");
              closeActiveModal();
            });
        }
      });
    };
    loadSubmit(makeRequest);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserData({});
    navigate("/");
  };

  const onUpdateProfile = ({ name, avatar }) => {
    const jwt = localStorage.getItem("jwt");
    const makeRequest = () => {
      return auth.editProfile({ name, avatar }, jwt).then(() => {
        setIsLoggedIn(true);
        setUserData((prevUser) => ({ ...prevUser, name, avatar }));
        closeActiveModal();
        navigate("/profile");
      });
    };
    loadSubmit(makeRequest);
  };

  const onAddItem = (values) => {
    const jwt = localStorage.getItem("jwt");
    const makeRequest = () => {
      return postItem(values, jwt).then((res) => {
        setClothingItems([res.data, ...clothingItems]);
        closeActiveModal();
      });
    };
    loadSubmit(makeRequest);
  };

  const handleDeleteItem = (selectedCard) => {
    const makeRequest = () => {
      return deleteItem(selectedCard._id).then(() => {
        const newClothingItems = clothingItems.filter((item) => {
          return item._id !== selectedCard._id ? item : null;
        });
        setClothingItems(newClothingItems);
        closeActiveModal();
      });
    };
    loadSubmit(makeRequest);
  };

  const onCardLike = (id, isLiked) => {
    const token = localStorage.getItem("jwt");
    const makeRequest = () => {
      return !isLiked
        ? // if so, send a request to add the user's id to the card's likes array

          addCardLike(id, token)
            .then((updatedCard) => {
              setClothingItems((cards) =>
                cards.map((item) => (item._id === id ? updatedCard : item))
              );
            })
            .catch((err) => console.log(err))
        : // if not, send a request to remove the user's id from the card's likes array
          removeCardLike(id, token).then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          });
    };
    loadSubmit(makeRequest);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const parsedData = parseWeatherData(data);
        setWeatherData(parsedData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
        //might need to change to data.data or destructure initial data
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    auth
      .getUser(jwt)
      .then((user) => {
        setIsLoggedIn(true);
        setUserData(user);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AppContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
        }}
      >
        <div className="App">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <div className="App__content">
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                handleLoginClick={handLoginClick}
                handleRegisterClick={handleRegisterClick}
                isLoggedIn={isLoggedIn}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onCardLike={onCardLike}
                      isLoggedIn={isLoggedIn}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile
                        isLoggedIn={isLoggedIn}
                        onCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        handleAddClick={handleAddClick}
                        handleEditProfileClick={handleEditProfileClick}
                        handleLogout={handleLogout}
                        onCardLike={onCardLike}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Footer />
            </div>
            <AddItemModal
              onCloseModal={closeActiveModal}
              onAddItem={onAddItem}
              isOpen={activeModal === "add-garment"}
              isLoading={isLoading}
            />
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              closeActiveModal={closeActiveModal}
              handleDelete={handleDeleteItem}
              onCardLike={onCardLike}
              isLoggedIn={isLoggedIn}
            />
            <RegisterModal
              onCloseModal={closeActiveModal}
              onRegister={onRegister}
              isOpen={activeModal === "register"}
              switchModal={switchModal}
              isLoading={isLoading}
            />
            <LoginModal
              onCloseModal={closeActiveModal}
              isOpen={activeModal === "login"}
              onLogin={onLogin}
              switchModal={switchModal}
              isLoading={isLoading}
            />
            <EditProfileModal
              onCloseModal={closeActiveModal}
              isOpen={activeModal === "edit-profile"}
              onUpdate={onUpdateProfile}
              currentUser={currentUser}
              isLoading={isLoading}
            />
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
