import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Cards.css';

function Cards(props) {
  return (
    <div className = "Container">
      <center>
        <Card className="card" style={{ width: '70rem', padding: 20,}} hover>
          <Row>
            <Col><Card.Img style={{height:'200px', width:'300px'}} variant="top" src="https://tse3.mm.bing.net/th?id=OIP.KiY0WJzqZ5wd9vdmXidPgwHaGl&pid=Api&P=0"/></Col>
            <Col xs={8}>
              <Row style={{paddingTop: 25, paddingLeft: 25}}>
                <Card.Text>
                  Worker Email: {props.workerEmail}<br/>
                  Service: {props.service}<br />
                  Type: {props.type}<br />
                  Location: {props.location}<br />
                  Salary: {props.salary}<br />
                </Card.Text>
              </Row>
              <Row>
                <div className="mb-2"style={{paddingTop: 25}}>
                    <Button variant="primary" size="lg">Accept</Button>{' '}
                </div>
              </Row>

            </Col>
          </Row>
        </Card>
      </center>
    </div>
  
  
  );
}

export default Cards;