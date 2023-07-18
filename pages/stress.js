import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {
  Feeling,
  Wrapper,
  NavbarCommon,
  Journal,
  Container,
} from '../components';
const stress = () => {
  const [inp, setinp] = useState('');
  const [sentiment, changeSen] = useState('');
  const handleChange = (e) => setinp(e.target.value);
  const handleSubmit = () => {
    changeSen('');
    if (!inp) return;
    axios
      .post('http://127.0.0.1:5000/predict', { text: inp })
      .then((e) => {
        changeSen(e.data.sentiment || '');
      })
      .catch((err) => console.log(err));
  };
  return (
    <Wrapper>
      <div className="p-3 px-5">
        <h3>Stress Detector</h3>
        <Form>
          <Form.Group
            className="mb-3 w-1/3"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Control
              type="text"
              value={inp}
              data="title"
              as="textarea"
              rows={8}
              onChange={handleChange}
              autoFocus
              autoComplete="off"
            />
          </Form.Group>
          <Button variant="success" onClick={handleSubmit}>
            Get Sentiment
          </Button>
          <div className="m-2">
            {sentiment.length ? <h3>{sentiment}</h3> : ''}
          </div>
        </Form>
      </div>
    </Wrapper>
  );
};

export default stress;
