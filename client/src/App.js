import {useState, useEffect} from "react";
import Map, {Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { listLogEntries } from "./API";
import LogEntryForm from "./LogEntryForm";

function App() {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 4,
  });

  useEffect(()=>{
    getEntries()
  }, [])

  async function getEntries(){
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  }

  function showAddMarkerPopup(e){
    console.log(e);
    const {lng, lat} = e.lngLat;
    setAddEntryLocation({
      long: lng,
      lat
    })
  }

  return <Map
    {...viewState}
    onMove={evt => setViewState(evt.viewState)}
    style={{width: "100vw", height: "100vh"}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    onDblClick={showAddMarkerPopup}
    doubleClickZoom={false}
  >
    {
      logEntries.map(entry => (
          <Marker key={entry._id} longitude={entry.long} latitude={entry.lat} anchor="bottom" >
            <div onClick={() => {
              console.log("clicked", showPopup);
              setShowPopup({...entry})
            }}>
              <svg className="marker" style={{width: "24px",height: "24px"}} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
          </Marker>
      ))
    }
    {showPopup && (
      <Popup longitude={showPopup.long} latitude={showPopup.lat} className="popup"
        anchor="right"
        onClose={() => setShowPopup(false)}>
        <div>
          <h3> {showPopup.title} </h3>
          <p> {showPopup.comments} </p>
        </div>
      </Popup>)
    }
    {
      addEntryLocation ? (
        <>
        <Marker longitude={addEntryLocation.long} latitude={addEntryLocation.lat} anchor="bottom" >
            <div>
              <svg className="marker" style={{width: "24px",height: "24px"}} viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
          </Marker>
          <Popup longitude={addEntryLocation.long} latitude={addEntryLocation.lat} className="popup"
            anchor="right"
            onClose={() => setAddEntryLocation(null)}
          >
            <div>
              <h3>Add your new log Entry here</h3>
              <LogEntryForm onClose={()=>{
                setAddEntryLocation(null);
                getEntries();
              }}
              location={addEntryLocation} />
            </div>
          </Popup>
        </>
      ) : null
    }
  </ Map>
}

export default App;
