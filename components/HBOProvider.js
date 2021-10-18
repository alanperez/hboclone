import React, { useContext, useState } from "react";
import ls from "local-storage";
// initializing context
export const StateContext = React.createContext();

// hook returns useContext
export function useStateContext() {
  return useContext(StateContext);
}

export function HBOProvider({ children }) {
  const [user, setUser] = useState("");
  const defaultUserImg = "https://i.pravatar.cc/300";
  const createUserAction = (event) => {
    setUser(event.target.value);
  };

  const [sideNavOpen, setSideNavOpenAction] = useState(false);
  const [accountModalOpen, setAccountModalOpenAction] = useState(false);
  const [searchOpen, setSearchOpenAction] = useState(false);
  const [watchList, setWatchList] = useState(ls.get("myList"));

  const addToList = (video) => {
    let myList;
    if (ls("myList") !== null) {
      myList = ls.get("myList");
      myList.push(video);
      ls.set("myList", myList);
      setWatchList(myList);
    } else {
      ls.set("myList", [video]);
    }
  };

  const removeFromList = (videoID) => {
    let myList = ls("myList");
    myList = myList.filter((item) => item.mediaID != videoID);
    ls.set("myList", myList);
    setWatchList(myList);
  };

  const thumbTypes = ["large-v", "small-v", "large=h", "small-h"];

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        createUserAction,
        defaultUserImg,
        sideNavOpen,
        setSideNavOpenAction,
        accountModalOpen,
        setAccountModalOpenAction,
        searchOpen,
        setSearchOpenAction,
        thumbTypes,
        removeFromList,
        addToList,
        watchList,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
