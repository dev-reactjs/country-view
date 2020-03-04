import React, { useState, useRef } from "react";
import ReactMapGL, { Marker, Source, Layer } from "react-map-gl";
import { pieData, markerData, defaultLocation, PAINT_MAP_POLYGON } from "common/MetaData";
import { MAP_BOX_KEY } from "common/Config";
import PieSvg from "component/PieSvg";
import geoJson from "common/GeoFeatures.json";

export default function App() {
  const [viewport, setViewport] = useState(defaultLocation);
  const mapRef = useRef();

  return (
    <div>
      <ReactMapGL
        {...viewport}
        maxZoom={22}
        minZoom={2}
        mapboxApiAccessToken={MAP_BOX_KEY}
        onViewportChange={newViewport => {
          setViewport({ ...newViewport });
        }}
        ref={mapRef}
      >
        <Source id="my-data" type="geojson" data={geoJson}>
          <Layer
            id="point"
            type="fill"
            paint={PAINT_MAP_POLYGON}
          />
        </Source>
        {MAP_BOX_KEY &&
          markerData.map((data) => {
            return(
              <Marker
                key={`single-cluster-${data.id}`}
                latitude={data.latitude}
                longitude={data.longitude}
              >
                <PieSvg
                  data={pieData}
                  innerRadius={15}
                  outerRadius={20}
                />
              </Marker>
            )
          })
        }
      </ReactMapGL>
    </div>
  );
}
