import React from 'react';
import {SafeAreaView,ScrollView,ActivityIndicator,View,Text,StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

import axios from 'axios';
import {URL} from '../../public/url'; 

import Product from './Product';

class ProductList extends React.Component {
    state = {
        products: [],
        loading: false
    }
    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        if(this.props.update){
            this.update();
            this.props.offUpdate();
        }
    }

    update=()=>{
        this.setState({loading: true});
        axios.get(URL+'/calories/food',{
            headers:{
                "Authorization": "Bearer "+ this.props.token,
                "Content-Type": "application/json"
            }
        })
        .then(response=>{
            this.setState({
                products: response.data.food,
                loading: false
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }

    addProductButtonHandler = ()=>{
        this.props.navigation.navigate('AddProduct');
    };

    render(){
        return(
                <SafeAreaView style={styles.container}>
                <Icon onPress={this.update} name="autorenew" size={40} color={"black"} style={{alignSelf: 'center'}}/>
                <View style={styles.button}>
                    <Button onPress={this.addProductButtonHandler} title="Add Product"/>
                </View>
                <ScrollView>
                    {this.state.products.map(product=>{
                        return(
                            <Product navigation={this.props.navigation} key={product._id} _id={product._id} title={product.title} calories={product.calories}/>
                        );
                    })}
                    {this.state.products.length ? null : <Text style={{alignSelf: 'center', marginTop: '10%',fontSize: 20}}>No Products :(</Text>}
                    {this.state.loading ? <ActivityIndicator style={{marginTop: '40%'}} size="large" color="#0000ff"/> : null }
                </ScrollView>
                </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignSelf: 'center',
    },
    button: {
        width: '50%',
        marginTop: 30,
        alignSelf: 'center'
    }
});

const mapDispatchToProps = dispatch=>{
    return {
        offUpdate: ()=>dispatch(actions.offUpdateComponent())
    }
};  

const mapStateToProps = state =>{
    return {
        token: state.token,
        update: state.update
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(ProductList);