import React from 'react';
import { Layout, Drawer, Button } from 'antd';
// import { Map, GoogleApiWrapper } from 'google-maps-react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import 'antd/dist/antd.css';
// import InfoDrawer from './InfoDrawer'
import axios from 'axios';


const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: -18.9128, lng: -48.2755 }}
  > 
    {props.markers.map( (marker) => {
      return (
        <Marker 
          position={{ lat: marker.lat, lng: marker.lon }}
          onClick={ props.markerClick }
        />
      )
    })}
    
  </GoogleMap>
))


class App extends React.Component {

  state = { 
    visible: false,
    points: []
  };
  
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  markerClick = () => {
    this.showDrawer()
  }

  componentDidMount () {
    console.log('DID MOUNT')
    axios.get('http://localhost:7059/getData').then(ans => {
      console.log('MEIN ASN', ans)
      this.setState({ markers: ans.data })
    })
  }

  render() {
    const { Header, Content, Footer } = Layout;

    return (
      <Layout className="layout">
        <Header style={{ background: '#1e8e3e', display: 'flex'}}>
          <img
            src="logo192.png"
            // width="100px"
            height="100px"
            alt="img"
          />
          <h1 style={{ color: 'white', fontSize: '30px', paddingLeft: '2rem' }}>Ocellot</h1>
        </Header>
        <Content style={{ paddingTop: '0px' }}>

          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `90vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            markerClick={this.markerClick}
            markers={this.state.markers}
          />

          <Drawer
            title="Informações Adicionais"
            width={520}
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >

          </Drawer>

          <Button type="primary"
            onClick={this.showDrawer}
          >
            TESTE
          </Button>

        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Smart UDI Flood Predictor &copy; 2019<br/> Feito com <span role="img" aria-label="heart">💚</span> por Ocellot <span role="img" aria-label="heart">🐈</span>
        </Footer>
      </Layout>
    )
  }
}

export default App