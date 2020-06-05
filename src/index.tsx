import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { App } from "./App"
import { ThemeProvider } from "emotion-theming"
import { theme } from "./theme"
import { createStore } from "redux"
import { Provider } from "react-redux"
import { persistStore, persistReducer } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"

import storage from "redux-persist/lib/storage"

const persistConfig = {
  key: "root",
  storage,
}

const initialState: IRootState = { donatedIds: ["fish42"] }

export interface IRootState {
  donatedIds: string[]
}

const rootReducer = (state: IRootState | undefined, action: any) => {
  switch (action.type) {
    case "SET_DONATED_IDS":
      return {
        ...state,
        donatedIds: action.payload,
      }
    default:
      return { ...initialState, ...state }
  }
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    </PersistGate>
  </Provider>,

  document.getElementById("root")
)
