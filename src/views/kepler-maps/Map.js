import React from "react";
import { useDispatch } from "react-redux";
import KeplerGl from "kepler.gl";
import { addDataToMap } from "kepler.gl/actions";
import useSwr from "swr";
import Processors from 'kepler.gl/processors';
import csvData from "../../data/d.csv.js";
import csvData1 from "../../data/d1.csv.js";
import { setZoomLevel } from './actions.js';

export default function Map() {
  const dispatch = useDispatch();
  const [zoomLevel, setLocalZoomLevel] = React.useState(2);

  const { data } = useSwr("covid", async () => {
    const response = await fetch(
      "https://gist.githubusercontent.com/leighhalliday/a994915d8050e90d413515e97babd3b3/raw/a3eaaadcc784168e3845a98931780bd60afb362f/covid19.json"
    );
    const data = await response.json();
    return data;
  });

  var processedData = {};
  var processedData1 = {};


  const initialConfig = {
    "version": "v1",
    "config": {
      "visState": {
        "filters": [
          {
            "dataId": ["cactus"],
            "id": "44zklqrcbs",
            "name": ["eventDate"],
            "type": "timeRange",
            "value": [-5662101600000, -578846518000],
            "enlarged": true,
            "plotType": "histogram",
            "yAxis": null
          }
        ],
        "layers": [
          {
            "id": "7l1g4uu",
            "type": "point",
            "config": {
              "dataId":
                "cactus", "label": "CMName", "color": [183, 136, 94], "columns": { "lat": "lat", "lng": "long", "altitude": null }, "isVisible": true, "visConfig": { "radius": 10, "fixedRadius": false, "opacity": 0.8, "outline": false, "thickness": 2, "strokeColor": null, "colorRange": { "name": "Global Warming", "type": "sequential", "category": "Uber", "colors": ["#5A1846", "#900C3F", "#C70039", "#E3611C", "#F1920E", "#FFC300"] }, "strokeColorRange": { "name": "Global Warming", "type": "sequential", "category": "Uber", "colors": ["#5A1846", "#900C3F", "#C70039", "#E3611C", "#F1920E", "#FFC300"] }, "radiusRange": [0, 50], "filled": true }, "textLabel": [{ "field": null, "color": [255, 255, 255], "size": 18, "offset": [0, 0], "anchor": "start", "alignment": "center" }]
            },
            "visualChannels": { "colorField": {
              name: "label",
              type: "string"
            }, "colorScale": "quantile", "strokeColorField": null, "strokeColorScale": "quantile", "sizeField": null, "sizeScale": "linear" }
          },
          {
            id: 'country-layer',
            type: 'point',
            config: {
              dataId: 'countryData',
              label: 'Country Aggregates',
              columns: {
                lat: 'lat',
                lng: 'long'
              },
              isVisible: true, // Assuming you want this visible initially or manage via zoom level
              visConfig: {
                radius: 30,
                fixedRadius: false,
                opacity: 0.8,
                outline: false,
                thickness: 2,
                colorRange: {
                  name: 'Global Warming',
                  type: 'sequential',
                  category: 'Uber',
                  colors: ['#FFC300', '#F1920E', '#E3611C', '#C70039', '#900C3F', '#5A1846']
                },
                strokeColorRange: {
                  name: 'Global Warming',
                  type: 'sequential',
                  category: 'Uber',
                  colors: ['#FFC300', '#F1920E', '#E3611C', '#C70039', '#900C3F', '#5A1846']
                },
                radiusRange: [10, 300]
              },
              textLabel: [{
                field: {
                  name: 'count',
                  type: 'integer'
                },
                color: [255, 255, 255],
                size: 18,
                offset: [0, 0],
                anchor: 'middle',
                alignment: 'center'
              }]
            },
            visualChannels: {
              colorField: { name: 'label', type: 'string' },
              colorScale: 'quantile',
              sizeField: { name: 'count', type: 'integer' },
              sizeScale: 'sqrt' 
            }
          }
        ],
        "interactionConfig": {
          "tooltip": {
            "fieldsToShow": {
              "cactus": ["CMName"]
            }, "enabled": true
          }, 
          brush: {
            enabled: false
          },
          geocoder: {
            enabled: false
          },          
        },
        "layerBlending": "normal", "splitMaps": [], "animationConfig": { "currentTime": null, "speed": 1 }
      },
      "mapState":
      {
        "bearing": 0,
        "dragRotate": false,
        "latitude": 29.075014282687626,
        "longitude": -105.61366862499517,
        "pitch": 0,
        "zoom": zoomLevel,
        "isSplit": false
      },
      "mapStyle":
      {
        "styleType": "dark",
        "topLayerGroups": {},
        "visibleLayerGroups": {
          "label": true,
          "road": true,
          "border": false,
          "building": true,
          "water": true,
          "land": true,
          "3d building": false
        }, "threeDBuildingColor": [9.665468314072013, 17.18305478057247, 31.1442867897876], "mapStyles": {}
      }
    }
  };

  function colorpick(object){
    console.log(object)
  }


  function handlePointClick(object) {
    console.log(object)
    if (object) {
      const cmid = object.properties.CMID;
      window.location.href = `https://catmapper.org/js/sociomap/${cmid}`;
    }
  }

  React.useEffect(() => {

    // console.log(`token: ${process.env.REACT_APP_MAPBOX_API}`);


    processedData = Processors.processCsvData(csvData);
    processedData1 = Processors.processCsvData(csvData1);
    console.log(processedData)

    const datasets = [
  
      {data: processedData,
      info: {id: "cactus"}},
      {data: processedData1,
        info: {id: "countryData"}}
    ]

    const config = {
      ...initialConfig,
      config: {
        ...initialConfig.config,
        visState: {
          ...initialConfig.config.visState,
          layers: initialConfig.config.visState.layers.map(layer => {
            if (layer.id === '7l1g4uu') {
              layer.config.isVisible = zoomLevel > 3;
            }
            if (layer.id === 'country-layer') {
              layer.config.isVisible = zoomLevel <= 3;
            }
            return layer;
          })
        }
      }
    };
    
    dispatch(
      addDataToMap({
        datasets: datasets,
        config: config,
        options: {
          centerMap: true,
          readOnly: true,
          currentModal: null
        }
      })
    );
    dispatch(setZoomLevel(zoomLevel));
  }, [dispatch, processedData,zoomLevel]);

  const handleZoomChange = (newZoomLevel) => {
    setLocalZoomLevel(newZoomLevel);  // Update local state
  };

  return (
    <div className="map-container">
            <input type="range" min="1" max="10" value={zoomLevel} onChange={e => handleZoomChange(parseInt(e.target.value))} />

      <KeplerGl
        id="cactus"
        mapboxApiAccessToken="pk.eyJ1IjoidWNmLW1hcGJveCIsImEiOiJja3RpeXhkaXcxNzJtMnZxbmtkcnJuM3BkIn0.kGmGlkbuWaCBf7_RrZXULg"
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={handlePointClick}
      />
    </div>
  );
}
