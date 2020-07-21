import React, { Component } from 'react';
// import Header from "../elements/header";
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import {Table,Divider} from 'antd';
import {EditFilled,DeleteOutlined} from '@ant-design/icons';
import {TOKEN} from './Constants/constant';
import Add from "./Add"

export default class Index extends Component {
   

    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            toDashboard: false,
            isLoading: false,
            url :'https://gowtham-rest-api-crud.herokuapp.com/employees',
            token : localStorage.getItem(TOKEN),
            type:'add',
            editData:{},
            editStatus:false
        };
    }

    componentDidMount() {
        this.getAllEmployee()
    }

    getAllEmployee=()=>{
        const {url,token}=this.state;
        axios.get(url , { params: { token:token}})
        .then(response => {
            console.log(response)
            const employees = response.data.data.employees;
            this.setState({ employees });
        })
        .catch(error => {
            this.setState({ toDashboard: true });
            console.log(error);
        });
    }

    handleClickDelete = event => {
        axios.delete(this.url + '/' + event.target.value , { params: { token: this.token}})
            .then(response => {
                this.componentDidMount();
                this.setState({ isLoading: true})
            })
            .catch( error => {
                console.log(error.toString());
                this.setState({ toDashboard: true });
            });
    };

    editEmploee=(data)=>{
console.log(data);
this.setState({
    editData:{
        data:data,
    type:'edit',
    visible:true
    } ,
    editStatus:false

})
    }
updateEditMode=()=>{
    this.setState({
        editData:{},

    })
    this.getAllEmployee()
}

    render() {
        // if (this.state.toDashboard === true) {
        //     return <Redirect to='/' />
        // }
        const columns = [
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
          },
          {
            title: 'Age',
            dataIndex: 'emp_id',
            key: 'address',
          },
          {
            title: 'Address',
            dataIndex: 'location',
            key: 'address',
          },
          
          {
            title: 'Action',
            key: 'action',
            render:(record)=>(
              <span><EditFilled onClick={this.editEmploee.bind(this,record)} />
              <Divider type='vertical'/>
              <DeleteOutlined />
              </span>
            
            )
          },
        ];
        const {employees,editData}=this.state;
        console.log(editData)
        return (
            <div>
                {/* <Header/> */}
                <div id="wrapper" style={{width:'100%',marginTop:'60px'}}>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">Dashboard
                                </li>
                                <li className="breadcrumb-item active">Employee Details</li>
                                <li className="ml-auto"><Add edit={editData} reload={this.getAllEmployee} reSet={this.updateEditMode}/></li>
                            </ol>
                            <div>
                                <div className="card-header"><i className="fas fa-table"></i>
                                    &nbsp;&nbsp;Employees List
                                </div>
                                <div className="card-body">
                                  <Table columns={columns} dataSource={employees}/>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        );
    }
}
