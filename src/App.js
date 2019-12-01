/* eslint-disable no-undef */
import React from 'react';
import { Layout, Drawer, Row, Col, Divider, Icon, Collapse, List, Input } from 'antd';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import 'antd/dist/antd.css';
import axios from 'axios';

const { Panel } = Collapse;

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: -18.9128, lng: -48.2755 }}
  > 
    
    {/* <TrafficLayer autoUpdate/> */}
    {props.markers.map( (marker) => {
      return (
        <div>
          <Marker 
            position={{ lat: marker.lat, lng: marker.lon }}
            onClick={ () => props.markerClick(marker) }
            icon={ marker.danger === "Alto" ? {url: "Vermelho.png", scaledSize: new google.maps.Size(25, 25)} : marker.danger === "Medio" ? {url:"Amarelo.png", scaledSize: new google.maps.Size(25, 25)} : {url:"Verde.png", scaledSize: new google.maps.Size(25, 25)} }
          />
          {/* <Circle style={{color: 'red'}} radius={100} center={{ lat: marker.lat, lng: marker.lon }} ></Circle> */}
        </div>
      )
    })}
    
  </GoogleMap>
))

const pStyle = {
  fontSize: 16,
  color: 'rgba(0,0,0,0.85)',
  lineHeight: '24px',
  display: 'block',
  marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
  <div
    style={{
      fontSize: 14,
      lineHeight: '22px',
      marginBottom: 7,
      color: 'rgba(0,0,0,0.65)',
    }}
  >
    <p
      style={{
        marginRight: 8,
        display: 'inline-block',
        color: 'rgba(0,0,0,0.85)',
      }}
    >
      {title}:
    </p>
    {content}
  </div>
);

const { Search } = Input;

class App extends React.Component {

  state = { 
    visible: false,
    data: {
      markers: [],
      climate: {}
    },
    markersShow: [],
    current: {},
    first: true
  };
  
  showDrawer = (marker) => {
    this.setState({
      visible: true,
      current: marker
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  markerClick = (marker) => {
    this.showDrawer(marker)
  }

  componentDidMount () {
    setInterval(() => {
      axios.get('http://10.1.1.194:7059/getData').then(ans => {
        console.log('ANS ist', ans.data)
        this.setState({ data: ans.data })
        if(this.state.first) {
          this.setState({ markersShow: this.state.data.markers, first: false })
        }
      })
    }, 1000);

  }

  buscar (valor) {
    console.log("USER SEARCHED V", valor)
    this.setState({ markersShow: this.state.data.markers.filter( (marker) => marker.name.toUpperCase().indexOf(valor.toUpperCase()) >= 0 ) })
  }

  renderLocal = () => {
    return (
      <div>
        <Row>
          <p style={pStyle}>Local</p>
          <Col span={24}>
            <DescriptionItem title="Nome" content={this.state.current.name} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Latitude" content={this.state.current.lat} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Longitude" content={this.state.current.lon} />
          </Col>
          {/* <Col span={12}>
            <DescriptionItem title="Status" content={this.state.current.status} />
          </Col> */}
          <Col span={12}>
            <DescriptionItem title="Nível de Perigo" content={this.state.current.danger} />
          </Col>
        </Row>
        <Divider />
        <Row>
          <p style={pStyle}>Caracterização</p>
          <Col span={12}>
            <DescriptionItem title="Altitude" content={this.state.current.alt} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Impermeabilidade" content={this.state.current.imperm} />
          </Col>
          {/* <Col span={12}>
            <DescriptionItem title="Status" content={this.state.current.status} />
          </Col> */}
          <Col span={12}>
            <DescriptionItem title="Risco da Área" content={this.state.current.area} />
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    const { Header, Content, Footer } = Layout;

    return (
      <Layout className="layout">
        <Header style={{ background: '#1e8e3e', display: 'flex'}}>
          {/* <img
            src="logo192.png"
            // width="100px"
            height="100px"
            alt="img"
            style={{zIndex: 0}}
          /> */}
          <h1 style={{ color: 'white', fontSize: '30px', paddingLeft: '2rem' }}>Hackathon Smart UDI - Ocellot Flood Predictor</h1>
        </Header>
        <Content style={{ paddingTop: '100px', zIndex: 1 }}>

          <Row gutter={16}
            style={{marginBottom: '5rem'}}>
            <Col 
              xs={24} md={12} lg={8}
              style= {{textAlign: 'center', padding: '0 5%'}}>
              <Icon 
                type="pie-chart" 
                style={{fontSize: '15vh', paddingBottom: '2rem'}} />
              <h1>Classificação de Imagem</h1>
              <Divider color="primary"/>
              <h3>Classificar as imagens das camêras de segurança de Uberlândia.</h3>
            </Col>
            <Col 
              xs={24} md={12} lg={8}
              style= {{textAlign: 'center', padding: '0 5%'}}>
              <Icon 
                type="dot-chart" 
                style={{fontSize: '15vh', paddingBottom: '2rem'}} />
              <h1>IOT e Geodados</h1>
              <Divider color="primary"/>
              <h3>Contamos com Pluviometro de fabricação própria e estudos detalhados das áreas de risco.</h3>
            </Col>
            <Col 
              xs={24} md={12} lg={8}
              style= {{textAlign: 'center', padding: '0 5%'}}>
              <Icon 
                type="alert" 
                style={{fontSize: '15vh', paddingBottom: '2rem'}} />
              <h1>Classificação Final</h1>
              <Divider color="primary"/>
              <h3>Classificação risco para Prefeitura e Cidadão, levando em consideração todas as variáveis e alertando cidadões.</h3>
            </Col>
          </Row>

          <Row>
            <Col xs={24} lg={6}>
              <Collapse bordered={false}
                defaultActiveKey={['1']}>

                <Search size="large" placeholder="Pesquise um local" onSearch={value => this.buscar(value)} />
                
                <Panel header="Alto risco" key="1">
                  <List
                    itemLayout="horizontal"
                    dataSource={this.state.markersShow.filter((locale) => locale.danger === 'Alto')}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Icon type="environment"  style={{fontSize: '25px', color: 'red'}}/>
                            // <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                          }
                          title={<a href="/">{item.name}</a>}
                          // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                      </List.Item>
                    )}
                  >
                  </List>
                </Panel>

                <Panel header="Médio risco" key="2">
                  <List
                    itemLayout="horizontal"
                    dataSource={this.state.markersShow.filter((locale) => locale.danger === 'Medio')}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Icon type="environment"  style={{fontSize: '25px', color: 'orange'}}/>
                            // <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                          }
                          title={<a href="/">{item.name}</a>}
                          // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                      </List.Item>
                    )}
                  >
                  </List>
                </Panel>

                <Panel header="Baixo risco" key="3">
                  <List
                    itemLayout="horizontal"
                    dataSource={this.state.markersShow.filter((locale) => locale.danger === 'Baixo')}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Icon type="environment"  style={{fontSize: '25px', color: 'green'}}/>
                            // <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                          }
                          title={<a href="/">{item.name}</a>}
                          // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                      </List.Item>
                    )}
                  >
                  </List>
                </Panel>

              </Collapse>
              
            </Col>
            <Col xs={24} lg={18}>
              <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `90vh` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                markerClick={this.markerClick}
                markers={this.state.markersShow}
              />
            </Col>

          </Row>
          

          <Drawer
            title="Informações Adicionais"
            width={520}
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
            climate={this.state.data.climate}
            style={{fontSize: '10rem'}}
          >
            {this.renderLocal()}

            <Divider />
            <Row>
              <p style={pStyle}>Clima Local</p>
              <Col span={12}>
                <DescriptionItem title="Temperatura" content={this.state.data.climate.temp} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Descrição" content={this.state.data.climate.description} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Umidade" content={this.state.data.climate.humidity} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Velocidade do Vento" content={this.state.data.climate.wind} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Pluvilosidade" content={this.state.data.markers.length > 0 ? this.state.data.markers[0].pluv : 0} />
              </Col>
            </Row>
            <Divider />
          </Drawer>

        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Smart UDI Flood Predictor &copy; 2019<br/> Feito com <span role="img" aria-label="heart">💚</span> por Ocellot <span role="img" aria-label="heart">🐈</span>
        </Footer>
      </Layout>
    )
  }
}

export default App