import { StyleSheet, View, Image, Text, Pressable } from 'react-native'

function Landing({ navigation }) {

    return (
        <View>
            <Image source={require('../assets/children-pana.png')} style={styles.banner} />
            <View style={styles.container}>
                <Text style={styles.typography}>Pisang merupakan buah-buahan yang kaya akan manfaat</Text>
                <View style={styles.bottom}>
                    <Pressable style={styles.button} android_ripple={{ color: '#748FFC' }} onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: '#F8F9FA', alignSelf: 'center', fontSize: 16, fontWeight: '500' }}>
                            Masuk
                        </Text>
                    </Pressable>
                    <Pressable style={styles.buttonOutline} android_ripple={{ color: '#364FC7' }} onPress={() => navigation.navigate('Register')}>
                        <Text style={{ color: '#364FC7', alignSelf: 'center', fontSize: 16, fontWeight: '500' }}>
                            Daftar
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    banner: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
    },
    container: {
        margin: 20,
    },
    typography: {
        color: '#FFC100',
        fontSize: 30,
        fontWeight: '900',
    },
    bottom: {
        marginTop: 100,
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    button: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: '#364FC7',
        marginRight: 10,
    },
    buttonOutline: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#364FC7',
    }
})

export default Landing