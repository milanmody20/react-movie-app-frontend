import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router';
import { loginUser } from '../redux/actions/loginUser';
import '../stylesheets/Login.css'

class Login extends Component {
    
    state = {
        email: '',
        password: '',
        message: '',
    }

    handleChange = (event) => {                             //event is passed as a perameter 
        this.setState ({
            [event.target.name]: event.target.value         //without brackets, the object is trying to set a key of event.target.name.
        })
    }

    handleSubmit = (event) => {
        event.preventDefault() 
        { this.props.loginUser(this.state) }                      //loginUser is the action loginUser.js, this is a callback function
        const react_token = localStorage.getItem("react_token")
        // console.log(react_token)
        let loginError = react_token == 'undefined' ? true : false
        this.setState({                                     //resets the form 'cleared out' after submitted
             loginError: loginError
            });
    } 

  render() {
    const react_token = localStorage.getItem("react_token")
    
    return (
      <div className='login-container'>
          { react_token && react_token != 'undefined' ? <Redirect to="/home" /> :  
          <div>
                  {this.state.loginError ? 
                  <h1 style={{color: "red"}}>Invalid Credentials</h1> : ''
                    }
                    <br/>
              <h3>LOGIN</h3>
              <br/>
              <form onSubmit={(event) => this.handleSubmit(event)} >
                  <label>Email: </label>
                  <input 
                    type='email' 
                    name='email' 
                    className='login-field' 
                    placeholder='example@abc.com' 
                    value={this.state.email} 
                    size="25" 
                    onChange={(event) => this.handleChange(event)} required 
                  />
                  <br/>
                  <label>Password: </label>
                  <input 
                    type='password' 
                    name='password' 
                    className='login-field' 
                    placeholder='min. 6 characters' 
                    value={this.state.password} 
                    onChange={(event) => this.handleChange(event)} required 
                  />
                  <br/><br/>
                  <input 
                    type='submit' 
                    value='login' 
                    id='login-btn' 
                    className="btn btn-success" 
                  />
                  <p>Don't have an account? <Link to='/signup'>Sign Up Here!</Link></p>
              </form>
          </div>
            }     
      </div>  
    )
  }
}

export default connect(null, {loginUser})(Login)          //we don't need to know whats in our store, we are only adding to our store. So we use 'null' instead of mapStateToProps. The second function is our ./redux/action/addUser