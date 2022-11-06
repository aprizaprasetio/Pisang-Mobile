import { StyleSheet, View, Image, Text, Pressable, TextInput, TouchableOpacity } from 'react-native'
import { useInput, useRegister } from '../utils'

function Register({ navigation }) {
    const [email, emailHandler] = useInput()
    const [password, passwordHandler] = useInput()
    const [confirmation, confirmationHandler] = useInput()
    const [registerHandler, fail] = useRegister(email, password, confirmation)

    return (
        <View style={styles.container}>
            <View style={{ elevation: 3.33, backgroundColor: 'white', borderRadius: 20 }}>
                <Image source={require('../assets/many-banana.jpg')} style={styles.banner} />
                <Text style={styles.title}>Daftar</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                {
                    fail &&
                    <View style={{ backgroundColor: '#f6000050', borderRadius: 20 }}>
                        <Text style={styles.alert}>{fail}</Text>
                    </View>
                }
                <TextInput
                    style={styles.control}
                    placeholder="Email"
                    selectionColor="white"
                    value={email}
                    onChangeText={emailHandler} />
                <TextInput
                    style={styles.control}
                    placeholder="Password"
                    secureTextEntry={true}
                    selectionColor="white"
                    value={password}
                    onChangeText={passwordHandler} />
                <TextInput
                    style={styles.control}
                    placeholder="Password Confirmation"
                    secureTextEntry={true}
                    selectionColor="white"
                    value={confirmation}
                    onChangeText={confirmationHandler} />
                <Pressable style={styles.button} android_ripple={{ color: '#748FFC' }} onPress={registerHandler}>
                    <Text style={{ color: '#364FC7', alignSelf: 'center', fontSize: 16, fontWeight: '500' }}>
                        Daftar
                    </Text>
                </Pressable>
            </View>
            <View style={styles.bottom}>
                <Text style={{ fontSize: 16, marginRight: 5 }}>
                    Sudah memiliki akun?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ fontSize: 16, color: '#748FFC', fontWeight: '600' }}>Masuk sekarang</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    banner: {
        height: 200,
        resizeMode: 'cover',
        backgroundColor: 'white',
        elevation: 3.33,
        borderRadius: 20,
    },
    title: {
        fontSize: 30,
        color: 'white',
        fontWeight: '500',
        position: 'absolute',
        bottom: 20,
        left: 20
    },
    alert: {
        fontSize: 16,
        color: '#1A1B1E',
        padding: 10,
    },
    control: {
        marginTop: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#748FFC',
        borderRadius: 10,
        backgroundColor: '#F8F9FA',
        elevation: 1.11,
        fontSize: 16,
    },
    button: {
        marginTop: 10,
        alignSelf: 'center',
        paddingHorizontal: 100,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#364FC7',
        elevation: 1.11,
        marginRight: 10
    },
    bottom: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
})

export default Register