import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import { Context } from '../context/AuthContext';

import Spacer from '../components/Spacer';
const SignupScreen = ({ navigation }) => {
    const { state, signup } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Spacer>
                <Text h3>Sign up for Tracker</Text>
            </Spacer>
            <Input
                label="Email"
                value={email}
                onChange={(newEmail) => setEmail(newEmail)}
            />
            <Spacer />
            <Input
                secureTextEntry
                label="Password"
                value={password}
                onChange={(newPassword) => setPassword(newPassword)} />
            <Spacer>
                <Button title="Sign up" type="outline" onPress={()=>(console.log(email))} />
            </Spacer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 250
    }
});

export default SignupScreen;