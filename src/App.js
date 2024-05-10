import React, { useEffect } from "react";
import keplerGlReducer, { uiStateUpdaters } from "kepler.gl/reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { taskMiddleware } from "react-palm/tasks";
import { Provider } from "react-redux";
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import Admin from "./layout/Admin";
import NotFound from "./404_Error";
import HomePage from "./views/HomePage/HomePage";
import { SET_ZOOM_LEVEL } from './views/kepler-maps/actions';

const customizedKeplerGlReducer = keplerGlReducer
  .initialState({
    uiState: {
      // hide side panel to disallower user customize the map
      readOnly: true,

      // customize which map control button to show
      mapControls: {
        ...uiStateUpdaters.DEFAULT_MAP_CONTROLS,
        visibleLayers: {
          show: false
        },
        mapLegend: {
          show: true,
          active: true
        },
        toggle3d: {
          show: false
        },
        splitMap: {
          show: false
        }
      }
    }
  })
  // handle additional actions
  .plugin({
    HIDE_AND_SHOW_SIDE_PANEL: (state, action) => ({
      ...state,
      uiState: {
        ...state.uiState,
        readOnly: !state.uiState.readOnly
      }
    }),
    [SET_ZOOM_LEVEL]: (state, action) => {
      const { zoomLevel } = action.payload;
      const newLayers = state.visState.layers.map(layer => {
        if (layer.id === 'country-layer') {
          // Set visibility based on zoom level
          layer.config.isVisible = zoomLevel <= 3;
        }
        if (layer.id === '7l1g4uu') {
          // Adjust this condition as needed
          layer.config.isVisible = zoomLevel > 3;
        }
        return layer;
      });

      return {
        ...state,
        visState: {
          ...state.visState,
          layers: newLayers
        }
      };
    }
  });

const keplerClickMiddleware = store => next => action => {
    if (action.type === '@@kepler.gl/LAYER_CLICK') {
      if (action.payload.info.object){
      const cmid = action.payload.info.object.data[1];
      window.open(`https://catmapper.org/js/sociomap/${cmid}`, '_blank');
      console.log('Layer clicked:', cmid);}

    }
    return next(action);
  };

const reducers = combineReducers({
  keplerGl: customizedKeplerGlReducer
});

const store = createStore(reducers, {}, applyMiddleware(taskMiddleware,keplerClickMiddleware));


export default function App() {
  useEffect(()=>{
    console.log("insider app.js")
  })
  return (
    <Provider store={store}>
      <HashRouter>
        <Switch>
          {/* <Route path='/' component={HomePage} /> */}
          <Route exact path="/map" render={(props) => <Admin {...props} />} />
          <Redirect from="/" to="map" />
          <Route component={NotFound} />
        </Switch>
      </HashRouter>
    </Provider>
  );
}

