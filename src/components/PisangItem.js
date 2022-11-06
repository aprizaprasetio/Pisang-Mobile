import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useFavPisangCount, useImg } from '../utils'

function PisangItem({ id, name, origin, imgUrl }) {
    const img = useImg(imgUrl)
    const favorite = useFavPisangCount(id)
    const { navigate } = useNavigation()

    return (
        <TouchableOpacity style={{ paddingVertical: 5 }} onPress={() => navigate('PisangDetail', { id })}>
            <View style={styles.container}>
                {
                    img ?
                        <Image source={{ uri: img }} style={styles.img} />
                        :
                        <View style={[styles.img, { justifyContent: 'center', alignItems: 'center' }]} >
                            <ActivityIndicator />
                        </View>
                }

                <View style={styles.body}>
                    <Text style={styles.title}>
                        {name} {favorite !== 0 && '⭐' + favorite}
                    </Text>
                    <Text style={styles.title}></Text>
                    <Text style={styles.text}>{origin}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        borderWidth: .66,
        borderRadius: 20,
        elevation: 1.11
    },
    img: {
        width: '100%',
        height: 120,
        borderRadius: 15,
        resizeMode: 'cover'
    },
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5
    },
    title: {
        fontSize: 24,
        fontWeight: '700'
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: '#474747'
    }
})

export default PisangItem