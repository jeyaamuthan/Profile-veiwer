import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import '../App.css';
import axios from "axios";
import {TOKEN} from './Constants/constant';
import {Modal} from 'antd';


class Add extends Component {
    state={
      id:'',
        name:'',
        email:'',
        age:'',
        location:'',
        visible:false,
        type:'add',
        editData:{},
        
    }
componentDidMount(){

  console.log(this.props.edit)
}

componentWillReceiveProps(nextProps){
  console.log(nextProps)

  if(nextProps.edit.type === 'edit')
  this.setState({
    visible:nextProps.edit.visible,
        id:nextProps.edit.data.id,
        name:nextProps.edit.data.name,
        email:nextProps.edit.data.email,
        age:nextProps.edit.data.age,
        location:nextProps.edit.data.location,
        type:nextProps.edit.type
  })

}
    
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      type:'add',
      name:'',
      email:'',
      age:'',
      location:'',
    });
    this.props.reSet();
  };


    onChange=(e)=>{
const name=e.target.name;
const value= e.target.value;
this.setState({
    [name]:value
})
    }
    onSubmit=(e)=>{
        const {name,email,location,age,type,id}=this.state;
        let config = {
          headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN)}` }
        }
        if(type === 'add'){
          const data={
            name:name,
            email:email,
            location:location,
            age:age,
        }
console.log(data)

  axios
    .post('http://localhost:3009/api/v1/employees/create', data,config)
    .then(res => {
      console.log(res);
      this.setState({
        visible:false,
        name:'',
        email:'',
        age:'',
        location:'',
      })
      this.props.reSet();
    })
    .catch(error => {
      console.log(error);
      // alert("There is an error in API call....");
    });
        }else{
          const data={
            name:name,
            email:email,
            location:location,
            age:age,
        }
console.log(data)

  axios
    .put(`http://localhost:3009/api/v1/employees/update/${id}`, data,config)
    .then(res => {
      console.log(res);
     this.setState({
       visible:false,
       name:'',
       email:'',
       age:'',
       location:'',
     })
     this.props.reSet();
    })
    .catch(error => {
      console.log(error);
      // alert("There is an error in API call....");
    });
        }
        
    }

  

  render() {
    const {name,email,location,age,type}=this.state;
    return (
       <>
      <Button type="primary" onClick={this.showModal}>
         Add Employee
        </Button>
        <Modal
          title={false}
          visible={this.state.visible}
          footer={false}
          onCancel={this.handleCancel}
        >
           <Container className="App">
    <h2>{type === 'add'? 'Add Employee':"Edit Employee"}</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={this.onChange}
                placeholder="Enter ur Name"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label >Age</Label>
              <Input
                type="number"
                name="age"
                id="age"
                placeholder="Enter ur Age"
                value={age}
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label >Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter ur Email"
                value={email}
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label >Location</Label>
              <Input
                type="location"
                name="location"
                id="location"
                placeholder="Enter ur Location"
                value={location}
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Button onClick={this.onSubmit}>Submit</Button>
          &nbsp;&nbsp;&nbsp;
          <Button onClick={this.handleCancel}>Cancel</Button>
        </Form>
      </Container>
        </Modal>
     </>
    );
  }
}

export default Add;