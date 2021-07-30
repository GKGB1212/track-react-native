import React from 'react';
import { ViewBase, StyleSheet, Text, Button } from 'react-native';

const SigninScreen=({navigation})=>{
    return <>
    <Text style={{fontSize:48}}>SigninScreen</Text>
    <Button title="Go to Signup" onPress={()=>navigation.navigate('Signup')}/>
    </>
}

const styles=StyleSheet.create({});

export default SigninScreen;