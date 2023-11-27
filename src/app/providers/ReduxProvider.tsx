"use client"

import { Provider } from "react-redux";
import { store } from "../redux_store/store";

const Session = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
  return (
    <Provider store={store}>{children}</Provider>
  )
}

export default Session