import { signOut, getAuth } from 'firebase/auth'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

function Home({ navigation }) {
    const { currentUser } = getAuth()

    return (
        <>
            <View>
                <Text style={styles.title}>Pisang Edukasi</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.header}>Selamat datang, {currentUser.displayName}</Text>
                <View style={styles.nav}>
                    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('PisangList')} >
                        <Text style={styles.navText}>🍌</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem} onPress={() => signOut(getAuth())} >
                        <Text style={styles.navText}>🚪</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: '900',
        padding: 30,
        height: 200,
        color: 'white',
        backgroundColor: '#364FC7',
    },
    container: {
        top: -100,
        margin: 20,
        height: 150,
        backgroundColor: 'white',
        // backgroundColor: '#748FFC',
        borderRadius: 20,
        elevation: 3.33
    },
    header: {
        fontSize: 24,
        fontWeight: '900',
        padding: 20,
        color: '#FFC100',
    },
    nav: {
        bottom: -30,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    navItem: {
        padding: 16,
        marginHorizontal: 5,
        backgroundColor: '#FFC100',
        borderRadius: 24,
        elevation: 3.33
    },
    navText: {
        fontSize: 30,
        fontWeight: '900',
    },
    bottomNav: {
        position: 'absolute',
        backgroundColor: 'red',
        bottom: 0,
        width: '100%'
    }
})

export default Home