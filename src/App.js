import React from 'react';
import { DatePicker, Layout } from 'antd';
import 'antd/dist/antd.css';

class App extends React.Component {

  render() {
    const { Header, Content, Footer } = Layout;

    return (
      <Layout className="layout">
        <Header>

        </Header>
        <Content>
          <h1>Helloson</h1>
          <DatePicker />
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          Smart UDI Flood Predictor &copy; 2019<br/> Feito com <span role="img" aria-label="heart">🖤</span> por Ocellot.
        </Footer>
      </Layout>
    )
  }
}

export default App