import React from 'react';
import { Layout } from 'antd';
// import { Map, GoogleApiWrapper } from 'google-maps-react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import 'antd/dist/antd.css';


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: -18.9128, lng: -48.2755 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -18.9128, lng: -48.2755 }} />}
  </GoogleMap>
))


class App extends React.Component {

  render() {
    const { Header, Content, Footer } = Layout;

    return (
      <Layout className="layout">
        <Header style={{ background: '#1e8e3e'}}>
          <h1 style={{ color: 'white', fontSize: '30px' }}>Ocellot</h1>
        </Header>
        <Content style={{ paddingTop: '0px' }}>

          <MyMapComponent

            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `90vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />

        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Smart UDI Flood Predictor &copy; 2019<br/> Feito com <span role="img" aria-label="heart">💚</span> por Ocellot <span role="img" aria-label="heart">🐈</span>
        </Footer>
      </Layout>
    )
  }
}

export default App