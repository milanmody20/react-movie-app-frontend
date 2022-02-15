import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { addUser } from '../redux/actions/addUser';
import { loginUser } from '../redux/actions/loginUser';
import '../stylesheets/Login.css'

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (event) => {                             //event is passed as a perameter 
        this.setState ({
            [event.target.name]: event.target.value         //without brackets, the object is trying to set a key of event.target.name.
        })
    }


    handleSubmit = (event) => {
        event.preventDefault() 
        { this.props.loginUser(this.state) }
        // this.setState({                                     //resets the form 'cleared out' after submitted
        //      email: '',
        //      password: ''
        // }
        // )
        console.log(this.state);
        <Redirect to="/home" />
    } 

  render() {
    return (
      <div className='login-container'>
          <h3>LOGIN</h3>
          <br/>
          <form onSubmit={(event) => this.handleSubmit(event)} >
              <label>Email: </label>
              <input type='email' name='email' className='login-field' placeholder='example@abc.com' value={this.state.email} onChange={(event) => this.handleChange(event)} required /><br/>
              <label>Password: </label>
              <input type='password' name='password' className='login-field' placeholder='password' value={this.state.password} onChange={(event) => this.handleChange(event)} required /><br/><br/>
              <input type='submit' value='login' id='login-btn' className="btn btn-success" />
              <p>Don't have an account? <Link to='/signup'>Sign Up Here!</Link></p>
          </form>
      </div>
    )
  }
}



export default connect(null, {loginUser})(Login)          //we don't need to know whats in our store, we are only adding to our store. So we use 'null' instead of mapStateToProps. The second function is our ./redux/action/addUser