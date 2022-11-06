import { StyleSheet, View, Text, Pressable, TouchableOpacity, ImageBackground, TextInput } from 'react-native'
import { useInput, useLogin } from '../utils'

function Login({ navigation }) {
    const [email, emailHandler] = useInput()
    const [password, passwordHandler] = useInput()
    const [loginHandler, fail] = useLogin(email, password)

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../assets/children-pana.png')} style={styles.container} imageStyle={styles.wallpaper}>
                <View style={styles.box}>
                    {
                        fail &&
                        <View style={{ backgroundColor: '#f6000050', borderRadius: 20 }}>
                            <Text style={styles.alert}>{fail}</Text>
                        </View>
                    }
                    <Text style={{ fontSize: 30, color: '#364FC7', fontWeight: '500' }}>Masuk</Text>
                    <TextInput
                        style={styles.control}
                        placeholder="Email"
                        selectionColor="white"
                        value={email}
                        onChangeText={emailHandler} />
                    <TextInput style={styles.control}
                        placeholder="Password"
                        secureTextEntry={true}
                        selectionColor="white"
                        value={password}
                        onChangeText={passwordHandler} />
                    <Pressable style={styles.button} android_ripple={{ color: '#748FFC' }} onPress={loginHandler}>
                        <Text style={{ color: '#F8F9FA', alignSelf: 'center', fontSize: 16, fontWeight: '500' }}>
                            Masuk
                        </Text>
                    </Pressable>
                </View>
                <View style={styles.bottom}>
                    <Text style={{ fontSize: 16, marginRight: 5 }}>
                        Belum memiliki akun?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{ fontSize: 16, color: '#748FFC', fontWeight: '600' }}>Daftar sekarang</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    alert: {
        fontSize: 16,
        color: '#1A1B1E',
        padding: 10,
    },
    control: {
        marginTop: 10,
        width: 300,
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
        paddingHorizontal: 75,
        paddingVertical: 10,
        backgroundColor: '#364FC7',
        elevation: 1.11,
        marginRight: 10
    },
    wallpaper: {
        height: 350,
        opacity: .33
    },
    box: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 3.33,
        marginTop: 200,
        marginBottom: 10
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default Login