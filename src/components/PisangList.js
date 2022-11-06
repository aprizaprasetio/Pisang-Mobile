import React from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { PisangContext } from '../utils'
import PisangItem from './PisangItem'

function PisangList() {
    const { pisangs } = React.useContext(PisangContext)

    if (pisangs.length === 0) {
        return <ActivityIndicator color="#FFC100" size={60} style={{ marginTop: 50 }} />
    }

    return (
        <View>
            <FlatList
                data={pisangs}
                renderItem={({ item }) => <PisangItem {...item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                style={styles.container}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 200,
    }
})

export default PisangList