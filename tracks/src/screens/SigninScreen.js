import React, { useContext,useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context } from '../context/AuthContext';

import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SigninScreen = ({navigation}) => {

    const { state, signin, clearErrorMessage } = useContext(Context);

    useEffect(() => {
        clearErrorMessage();

        const listener = navigation.addListener('focus', () => {
            clearErrorMessage();
        });
    }, []);

    return (
        <View style={styles.container}>
            <AuthForm
                headerText="Sign In to Your Account"
                errorMessage={state.errorMessage}
                submitButtonText="Sign In"
                onSubmit={({ email, password }) => signin({ email, password })}

            />
            <NavLink
                routeName="Signup"
                text="Don't have an account? Sign up instead"
            />
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

export default SigninScreen;