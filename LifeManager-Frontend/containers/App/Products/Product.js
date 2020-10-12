import React from 'react';
import {StyleSheet,View,Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import axios from 'axios';
import {URL} from '../../../public/url';

import {connect} from 'react-redux';

const Product = (props)=>{
    const buttonHandler = ()=>{
        axios.post(URL+'/calories/eatfood',{
            id: props._id
        },{
            headers:{
                "Authorization": "Bearer "+props.token,
                "Content-Type": "application/json"
            }
        })
        .then(response=>{
            props.navigation.goBack();
        })
        .catch(err=>{
            console.log(err);
        })
    }
    const deleteHandler = ()=>{
        axios.delete(URL+'/calories/food',{
            headers:{
                "Authorization": "Bearer "+props.token,
                "Content-Type": "application/json",
                "id": props._id
            }   
        })
        .then(response=>{
            props.navigation.goBack();
        })
        .catch(err=>{
            console.log(err);
        })
    };

    return (
    <View style={styles.productContainer}>
    <Text style={styles.productText}>{props.title}</Text>
    <Text style={styles.productText}>{props.calories}kcal</Text>
    <View style={styles.productButton}>
    <Button onPress={buttonHandler} title="Eat"/>
    </View>
    <Icon onPress={deleteHandler} style={styles.productTrash} name="delete" size={25} color='black'/>
    </View>
    );
}

const styles = StyleSheet.create({
    productContainer:{
        marginTop: 30,
        flexDirection:'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#bbdefb',
        backgroundColor: '#fafafa',
        width: '100%',
    },
    productText:{
        margin: 10,
        fontSize: 20
    },
    productButton:{
        position: 'absolute',
        right: 50,
        margin: 10,
        width: '20%'
    },
    productTrash:{
        position: 'absolute',
        right: 30,
        color: '#4C8BF5'
    },
}); 

const mapStateToProps=state=>{
    return {
        token: state.token
    }
};

export default connect(mapStateToProps)(Product);