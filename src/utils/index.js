import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref as refDatabase, onValue } from 'firebase/database'
import { getStorage, ref as refStorage, getDownloadURL } from 'firebase/storage'

const auth = getAuth()

const PisangContext = React.createContext()

function findPisang(pisangId) {
    const { pisangs } = React.useContext(PisangContext)

    const pisang = pisangs.find(
        pisang => pisang.id === pisangId
    )

    return pisang
}

function findFavoriteByUser() {
    const { favorites } = React.useContext(PisangContext)
    const { uid } = auth.currentUser

    const favorite = favorites.filter(
        favorite => favorite.userUid === uid
    )

    return favorite
}

function useIsFavorite(pisangId) {
    const favorites = findFavoriteByUser()

    const result = favorites.find(
        favorite => favorite.pisangId === pisangId
    )

    return [!!result, result]
}

function useInput(first = '') {
    const [input, setInput] = React.useState(first)
    function inputHandler(newInput) {
        setInput(newInput)
    }

    return [
        input,
        inputHandler
    ]
}

function usePisangs() {
    const [pisangs, setPisangs] = React.useState([])
    const root = getDatabase()
    const path = refDatabase(root, 'pisangs')

    React.useEffect(() => {
        onValue(path, snapshot => {
            const response = snapshot.val()
            const pisangs = []
            for (const id in response) {
                pisangs.push({
                    ...response[id],
                    id: id,
                })
            }
            setPisangs(pisangs)
        })
    }, [])


    return pisangs
}

function useFavorites() {
    const [favorites, setFavorites] = React.useState([])
    const root = getDatabase()
    const path = refDatabase(root, 'pisang_favorites')

    React.useEffect(() => {
        onValue(path, snapshot => {
            const response = snapshot.val()
            const favorites = []
            for (const id in response) {
                favorites.push({
                    ...response[id],
                    id: id,
                })
            }
            setFavorites(favorites)
        })
    }, [])

    return favorites
}


function useFavPisangCount(pisangId) {
    if (!pisangId) return null
    const favorites = useFavorites()
    const filteredFav = favorites.filter(
        favorite => {
            return favorite.pisangId === pisangId
        }
    )

    return filteredFav.length
}

function useImg(imgUrl) {
    const [img, setImg] = React.useState(null)
    const root = getStorage()
    const path = refStorage(root, 'pisang-images/' + imgUrl)

    React.useEffect(() => {
        getDownloadURL(path).then(url => setImg(url))
    }, [])

    return img
}

function useLogin(email, password) {
    const [fail, setFail] = React.useState(null)
    const { reset } = useNavigation()

    const message = {
        'auth/user-not-found': 'Email atau password salah',
        'auth/invalid-email': 'Format email salah',
        'auth/invalid-email': 'Format email salah',
    }

    function loginHandler() {
        signInWithEmailAndPassword(auth, email, password)
            .then(reset)
            .catch(error => {
                console.info(error)
                setFail(message[error.code] ?? 'Terjadi kesalahan saat masuk')
            })
    }

    return [
        loginHandler,
        fail
    ]
}

function useRegister(email, password, confirmation) {
    const [fail, setFail] = React.useState(null)
    const { navigate } = useNavigation()

    function registerHandler() {
        if (password !== confirmation) {
            setFail('Password tidak sama')
            return
        }

        const message = {
            'auth/email-already-in-use': 'Email sudah terpakai',
            'auth/weak-password': 'Minimal 6 kata untuk password',
            'auth/invalid-email': 'Format email salah',
            'auth/uid-already-exists': 'Mohon ulangi pendaftaran'
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => navigate('Login'))
            .catch(error => setFail(message[error.code] ?? 'Terjadi kesalahan saat mendaftar'))
    }

    return [
        registerHandler,
        fail
    ]
}

function PisangProvider({ children }) {
    const pisangs = usePisangs()
    const favorites = useFavorites()
    const context = { pisangs, favorites }

    return (
        <PisangContext.Provider value={context}>
            {children}
        </PisangContext.Provider>
    )
}

export {
    PisangContext,
    findPisang,
    useIsFavorite,
    useInput,
    usePisangs,
    useFavorites,
    useFavPisangCount,
    useImg,
    useLogin,
    useRegister,
    PisangProvider
}