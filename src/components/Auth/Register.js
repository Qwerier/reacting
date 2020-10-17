import React, { Component } from 'react';
import {Grid,Form,Segment,Button,Header,Message,Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import "./register.css";
import firebase from '../../firebase';
import md5 from 'md5';


class Register extends Component{

    constructor (props){
        super(props);
        this.state = {
            username:'',
            email: '',
            password: '',
            passwordConfirmation:'',
            errors: [],
            loading : false,
            usersRef : firebase.database().ref('users')
        };
    }

    handleChange = event =>{
        this.setState({[event.target.name]: event.target.value});
    };

    // trajton ngjarjet qe ndodhin pas shtypjes se butonit 'submit'
    handleSubmit = event =>{
        event.preventDefault();

        if(this.isFormValid())
       {
        this.setState({ errors: [] , loading: true});
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email,this.state.password)
            .then(createdUser =>{
                console.log(createdUser);
                createdUser.user.updateProfile({
                    displayName: this.state.username,
                    photoURL : `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                })                
                .then(() => {
                    this.saveUser(createdUser).then(() =>{
                        console.log('user saved');
                    })
                })
                .catch(err => {
                    console.error(err);
                    this.setState({errors : this.state.errors.concat(err),loading:false});
                })
                //this.setState({loading : false});
            })
            .catch(err => {
                console.error(err);
                this.setState({ errors : this.state.errors.concat(err), loading: false});
                });
        }
       }
    
    // shfaq erroret duke i vene ne vektorin 'error' me nje celes i
    displayErrors = errors =>errors.map((error,i) => <p key={i}>{error.message}</p>);

    //kontrollon per vlefshmerine  e formes
    isFormValid = () =>{
        if(this.isFormEmpty(this.state)){
            return false;
        }
        else if(!this.isPasswordValid(this.state)){
            return false;
        }
        else{
            return true;
        }
    }

    saveUser = createdUser =>{
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar:createdUser.user.photoURL
        });
    }

    //shikon nese passwordi eshte i gjate mjaftueshem dhe perputhshmerine
    // me ate konfirmues. Vendos dhe erroret ne vendin e duhur

    isPasswordValid = ({password,passwordConfirmation}) => {
        let error;
        let errors = [];

        if( password.length < 6 || passwordConfirmation.length < 6){
            error = {message : 'Password must be at least 6 characters long'};
            this.setState({ errors: errors.concat(error) });
            return false;
        }
        else if(password !== passwordConfirmation){
            error = { message : 'Passwords do not match'};
            this.setState({ errors : errors.concat(error )});
            return false;
        }
        else{
            return true;
        }
    }

    isFormEmpty = ({username,email,password,passwordConfirmation}) =>{
        return !username.length || !email.length || !password.length || !passwordConfirmation.length;
    }

    //kontrollon per inputet te cilat e kane hedhur vleren e korruptuar
    handleInputError = (errors,inputName)=>{
        return errors.some(error => 
            error.message.toLowerCase().includes(inputName)
            ) 
            ? "error" 
            : ""
    }

    render(){
        const {username,email,password,passwordConfirmation,errors,loading} = this.state
        return(
          <Grid textAlign = 'center' verticalAlign='middle' className="app">
            <Grid.Column style ={{maxWidth: 400}}>
                <Header as = "h5" icon color = "teal" textAlign ='center'>
                    <Icon name="puzzle piece" color="teal"><br></br>Register for Convo Chat App</Icon>
                </Header>
                <Form onSubmit={this.handleSubmit} size = "large" >
                    <Segment stacked>
                        
                        <Form.Input 
                        fluid 
                        name = "username" 
                        icon="user" 
                        iconPosition="left"
                        placeholder ="Username" 
                        onChange={this.handleChange}
                        value = {username} 
                        className = { this.handleInputError(errors,'username')}
                        type="text"/>

                        <Form.Input 
                        fluid
                        name = "email" 
                        icon="mail" 
                        iconPosition="left"
                        placeholder ="Email Adress" 
                        onChange={this.handleChange}
                        value={email}
                        className = {this.handleInputError(errors,'email')}
                        type="email"/>

                        <Form.Input 
                        fluid 
                        name ="password" 
                        icon="lock" 
                        iconPosition="left"
                        placeholder="Password" 
                        onChange={this.handleChange}
                        value = {password}
                        className = {this.handleInputError(errors,'password')} 
                        type="password"
                        maxLength = "20"
                        />

                        <Form.Input 
                        fluid 
                        name = "passwordConfirmation" 
                        icon="repeat" 
                        iconPosition="left"
                        placeholder="Password Confirmation" 
                        onChange={this.handleChange}
                        value = {passwordConfirmation}
                        className = {this.handleInputError(errors,'passwordConfirmation')} 
                        type="password"
                        maxLength="20" />

                        <Button disabled = {loading} className={loading ? 'loading' : ''} color="teal" fluid size = "large">
                        Submit
                        </Button>
                    </Segment>
                </Form>
                {errors.length > 0 && (
                    <Message error>
                        <h3>Error</h3>
                        {this.displayErrors(errors)}
                    </Message>
                )}
                <Message>Already a user? <Link to="/login">Login</Link></Message>
            </Grid.Column>
          </Grid>
        )
    }
}

export default Register;