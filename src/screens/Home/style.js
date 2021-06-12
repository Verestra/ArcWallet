import {StyleSheet} from 'react-native';
const styles = StyleSheet.create ({ 
    headerCard: {
        backgroundColor: '#6379F4',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        height: 125
    },
    textFade: {
        fontFamily: 'NunitoSans',
        fontSize: 14,
        color: "#D0D0D0",
    },
    textHeader: {
        fontFamily: 'NunitoSans-Bold',
        fontSize: 24,
        color: '#FFFFFF',
        width: 225
    },
    containerTransaction: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    containerHistory: {
        display: 'flex',
        flexDirection: 'column'
    },
    cardTransaction: {
        borderRadius: 10,
        backgroundColor: '#EAEDFF',
        marginTop: 30,
        marginBottom: 30,
        height: 57,
        display:'flex',
        justifyContent: 'center'
    },
    cardHistory: {
        display: 'flex',
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between'
    },
    text1: {
        fontFamily: 'NunitoSans-Bold',
        fontSize: 18,
        color: "#514F5B",
    },
    text2: {
        fontFamily: 'NunitoSans-Bold',
        fontSize: 16,
        color: '#4D4B57'
    },
    text3: {
        fontFamily: 'NunitoSans-Regular',
        fontSize: 14,
        marginTop: 10,
        color: '#7A7886'
    },
    plusText: {
        fontFamily: 'NunitoSans-Bold',
        color: '#1EC15F'
    },
    minusText: {
        fontFamily: 'NunitoSans-Bold',
        color: '#FF5B37'
    },
    blueText: {
        fontFamily: 'NunitoSans-Regular',
        fontSize: 14,
        color: '#6379F4'
    },
    arrowUp: {
        fontSize: 28,
        color: '#608DE2',
    },
    bell: {
        fontSize: 30,
        color: '#F9F9F9'
    }
 })

 export default styles;