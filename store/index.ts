import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import rootReducer from "@/store/rootReducer";
import rootsaga from "@/store/sagas/rootsaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, sagaMiddleware),
});

sagaMiddleware.run(rootsaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
