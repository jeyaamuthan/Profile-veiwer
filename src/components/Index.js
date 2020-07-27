import React, { Component } from 'react';

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
            url :'http://localhost:3009/api/v1/employees',
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
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        axios.get(url+'/list'  , config)
        .then(response => {
            console.log(response)
            const employees = response.data.data;
            this.setState({ employees });
        })
        .catch(error => {
            this.setState({ toDashboard: true });
            console.log(error);
        });
    }

   
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


delete=(id)=>{
    const {url,token}=this.state;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
    axios.delete(url+`/delete/${id}`,config).then(res=>{
this.setState({
    
})
this.getAllEmployee()
console.log("Successfuly deleted")
alert("Succesfuly deleted")

    })
    
}
    
    render() {
       // const {id}=this.state
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
            dataIndex: 'age',
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
              <DeleteOutlined onClick={this.delete.bind(this,record.id)} />
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
