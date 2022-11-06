import React from 'react'
import { getAuth } from 'firebase/auth'
import { getDatabase, ref, set, remove, push } from 'firebase/database'
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import { findPisang, useIsFavorite, useImg, useFavPisangCount } from '../utils'

function PisangDetail({ route }) {
    const { id } = route.params
    const { name, origin, description, harvestTime, imgUrl } = findPisang(id)
    const img = useImg(imgUrl)
    const [isFavorite, favorite] = useIsFavorite(id)
    const count = useFavPisangCount(id)
    const root = getDatabase()

    function addFavorite() {
        const { uid } = getAuth().currentUser
        const path = ref(root, 'pisang_favorites')
        const key = push(path).key
        set(ref(root, 'pisang_favorites/' + key), {
            pisangId: id,
            userUid: uid
        })
    }

    function removeFavorite() {
        const path = ref(root, 'pisang_favorites/' + favorite.id)
        remove(path)
    }

    if (img === null) {
        return <ActivityIndicator color="#FFC100" size={60} style={{ marginTop: 50 }} />
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Image source={{ uri: img }} style={styles.img} />
                <View style={styles.caption}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.origin}>{origin}</Text>
                </View>
            </View>
            <View style={styles.body}>

                <TouchableOpacity onPress={isFavorite ? removeFavorite : addFavorite}>
                    {
                        isFavorite ?
                            <Text style={styles.favorited}>{count !== 0 && '⭐ ' + count} Favorited</Text>
                            :
                            <Text style={styles.favorite}>{count !== 0 && '⭐ ' + count} Favorite</Text>
                    }
                </TouchableOpacity>
                <Text style={styles.text}>
                    {description}
                </Text>
                <Text style={styles.harvest}>
                    {harvestTime} bulan waktu panen
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    header: {
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 6.66,
    },
    img: {
        borderRadius: 20,
        width: '100%',
        height: 300,
    },
    favorited: {
        fontSize: 20,
        fontWeight: '300',
        textAlign: 'center',
        padding: 10,
        color: 'white',
        backgroundColor: 'black',
        borderRadius: 20,
        borderColor: 'transparent',
        borderWidth: 1,
        marginBottom: 10,
        alignSelf: 'center',
        width: 200
    },
    favorite: {
        fontSize: 20,
        fontWeight: '300',
        textAlign: 'center',
        padding: 10,
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 10,
        alignSelf: 'center',
        width: 200
    },
    caption: {
        width: '100%',
        padding: 20,
        backgroundColor: '#47474780',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        bottom: 0
    },
    name: {
        fontSize: 30,
        fontWeight: '700',
        color: 'white'
    },
    origin: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white'
    },
    body: {
        marginVertical: 10,
        paddingBottom: 30
    },
    text: {
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        padding: 30,
        marginBottom: 10,
        borderRadius: 20,
        color: 'white',
        backgroundColor: '#364FC7',
        elevation: 3.33
    },
    harvest: {
        fontSize: 18,
        textAlign: 'center',
        padding: 30,
        borderRadius: 20,
        color: 'white',
        backgroundColor: '#748FFC',
        elevation: 3.33
    }
})

export default PisangDetail