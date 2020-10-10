import React from 'react'
import {View,Text,StyleSheet} from 'react-native';
import {Button,Input} from 'react-native-elements';
class Login extends React.Component {
    state = {
        username: '',
        password: ''
    };

    handleInputChange =(name,value)=>{
        this.setState({
        [name]: value
        });
    };

    handleButtonLogin=()=>{
        console.log(this.state);
    };

    handleButtonRegister=()=>{
        this.props.navigation.navigate('Register');
    };

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Manage Your Life😉</Text>
                <Input placeholder='Username' style={styles.input} value={this.state.username} onChangeText={value=>this.handleInputChange('username',value)}/>
                <Input placeholder='Password' style={styles.input} secureTextEntry={true} value={this.state.password} onChangeText={value=>this.handleInputChange('password',value)}/>
                <View style={styles.button} >
                <Button title="Login" onPress={this.handleButtonLogin}/>
                </View>
                <Text style={{marginTop: 30}}>No Account? <Text onPress={this.handleButtonRegister} style={{color: 'blue'}}>Register Now</Text></Text>
            </View>
        );
    }
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    text:{
        fontSize: 40,
        marginTop: 100,
        textAlign: 'center',
        color: 'black'
    },
    input: {
        marginTop: 20
    },
    button: {
        width: '50%',
        marginTop: 40
    }
  });
  
export default Login;