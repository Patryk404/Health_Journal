import React from 'react';

import {View,Image,SafeAreaView,ScrollView,StyleSheet,ActivityIndicator,Text,Linking} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Average from '../../components/Average/Average';

import axios from 'axios';
import {URL} from '../../public/url';

import {connect} from 'react-redux';

class Water extends React.Component{
    state = {
        cups: 0,
        average: 0,
        loading: false
    }

    componentDidMount(){
        this.update();
    }
    update = () =>{
        this.setState({loading: true});
        axios.get(URL+'/water',{headers: {
            "Authorization": "Bearer "+this.props.token,
            "Content-Type": "application/json"
        }})
        .then(response=>{
            this.setState({
                cups: response.data.cups
            });
            this.getAverage();
        })
        .catch(err=>{
            console.log(err);
        })
    };

    getAverage = ()=>{
        axios.get(URL+'/water/average',{headers: {
            "Authorization": "Bearer "+this.props.token,
            "Content-Type": "application/json"
        }})
        .then(response=>{
            this.setState({average: response.data.average,loading:false});
        })
        .catch(err=>{
            console.log(err);
        })
    }

    plusCupOfWater = ()=>{
        axios.put(URL + '/water/plus',{},{headers: {
            "Authorization": "Bearer "+this.props.token,
            "Content-Type": "application/json"
        }})
        .then(response=>{
            this.update();
        })
        .catch(err=>{
            console.log(err);
        })
    };

    minusCupOfWater = () =>{
        axios.put(URL + '/water/minus',{},{headers: {
            "Authorization": "Bearer "+this.props.token,
            "Content-Type": "application/json"
        }})
        .then(response=>{ 
            this.update();
        })
        .catch(err=>{
            console.log(err);
        })
    };

    waterHistoryButtonHandler = ()=>{
        this.props.navigation.navigate("WaterHistory");
    };

    render(){
        return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Icon onPress={this.update} name="autorenew" size={40} color={"black"} style={{position:'absolute',right: 30,top: 30}}/>
                <Image style={styles.image} source={require('../../public/images/water-glass1.png')}/>
                <View style={styles.button}>
                    <Button onPress={this.waterHistoryButtonHandler} title="Water History" />
                </View>
                {this.state.loading ? <ActivityIndicator style={styles.spinner} size="large" color="#0000ff"/> : null }
                <Text style={styles.textToday}>Today:</Text>
                <Text style={styles.textCups}>{this.state.cups} Cups</Text>
                <View style={{flexDirection: "row",alignSelf: 'center'}}>
                    <Icon onPress={this.minusCupOfWater} style={styles.icon}  name="minus"  size={40} color="red"/>
                    <Icon onPress={this.plusCupOfWater} style={styles.icon} name="plus" size={40} color="green"/>
                </View>
                <Average average={this.state.average}/>
                <View style={{flexDirection: 'row',position: 'absolute', top: 1,alignSelf:'center'}}>
                    <Text>Icons made by </Text> 
                    <Text onPress={()=> Linking.openURL("https://www.flaticon.com/authors/pixel-perfect")} style={{textDecorationLine: 'underline',color: 'blue'}} title="Pixel perfect">Pixel perfect</Text> 
                    <Text> from </Text> 
                    <Text onPress={()=>Linking.openURL("https://www.flaticon.com/")}  style={{textDecorationLine: 'underline',color: 'blue'}} title="Flaticon">www.flaticon.com</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    spinner:{
        position: 'absolute',
        top: 5,
        left: 5
    },
    button: {
        marginTop: 20,
        width: '30%',
        alignSelf:'center'
    }, 
    image: {
        marginTop: 30,
        width: 250,
        height: 250,
        alignSelf: 'center'
    },
    textToday: {
        marginTop: 20,
        fontSize: 30,
        alignSelf: 'center'
    },
    textCups: {
        marginTop: 10,
        fontSize: 30,
        alignSelf: 'center'
    },
    icon: {
        margin: 10
    }
});

const mapStateToProps= state=>{
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(Water);