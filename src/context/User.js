//takes theme as a prop
function Profile({ user, theme }) {
  if (!user) return <h2>Please Login To View Profile</h2>;
  return (
    <div>
      <h2>{user.name}'s Profile</h2>
      {/* passes theme down to Interests */}
      <Interests interests={user.interests} theme={theme} />
    </div>
  );
}

// src/context/user.js
import React from "react";

// create the context
const UserContext = React.createContext();

// create a provider component
function UserProvider({ children }) {
  // the value prop of the provider will be our context data
  // this value will be available to child components of this provider
  return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };

import React, { useState } from "react";
import Header from "./Header";
import Profile from "./Profile";
// import the provider
import { UserProvider } from "../context/user";

function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <main className={theme}>
      {/* wrap components that need access to context data in the provider*/}
      <UserProvider>
        <Header theme={theme} setTheme={setTheme} />
        <Profile theme={theme} />
      </UserProvider>
    </main>
  );
}

export default App;

// import the useContext hook
import React, { useContext } from "react";
// import the UserContext we created
import { UserContext } from "../context/user";
import Interests from "./Interests";

function Profile({ theme }) {
  // call useContext with our UserContext
  const user = useContext(UserContext);

  // now, we can use the user object just like we would if it was passed as a prop!
  console.log(user);
  if (!user) return <h2>Please Login To View Profile</h2>;
  return (
    <div>
      <h2>{user.name}'s Profile</h2>
      <Interests interests={user.interests} theme={theme} />
    </div>
  );
}

function UserProvider({ children }) {
    const currentUser = {
      name: "Duane",
      interests: ["Coding", "Biking", "Words ending in 'ing'"],
    };
    return (
      <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>
    );
  }

  
  import React, { useContext } from "react";
import ThemedButton from "./ThemedButton";
import DarkModeToggle from "./DarkModeToggle";
import defaultUser from "../data";
import { UserContext } from "../context/user";

function Header({ theme, setTheme }) {
  const user = useContext(UserContext);

  function handleLogin() {
    if (user) {
      // setUser(null);
    } else {
      // setUser(defaultUser);
    }
  }

  return (
    <header>
      <h1>React Context</h1>
      <nav>
        <ThemedButton onClick={handleLogin} theme={theme}>
          {user ? "Logout" : "Login"}
        </ThemedButton>
        <DarkModeToggle theme={theme} setTheme={setTheme} />
      </nav>
    </header>
  );
}




function App() {
    const [theme, setTheme] = useState("dark");
    const [user, setUser] = useState(null);
    return (
      <main className={theme}>
        <Header theme={theme} setTheme={setTheme} user={user} setUser={setUser} />
        <Profile theme={theme} user={user} />
      </main>
    );
  }


  function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  }



  function Header({ theme, setTheme }) {
    const { user, setUser } = useContext(UserContext);
    function handleLogin() {
      if (user) {
        setUser(null);
      } else {
        setUser(defaultUser);
      }
    }
    // ...
  }


  function Profile({ theme }) {
    const { user } = useContext(UserContext);
    // ...
  }
  
