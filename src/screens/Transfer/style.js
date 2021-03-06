import {StyleSheet} from 'react-native';
const styles = StyleSheet.create ({
    headerCard: {
        height: 50,
        marginBottom: 10,
    },
    containerQuick: {
        marginBottom: 35
    },
    text1: {
        fontFamily: 'NunitoSans-Bold',
        fontSize: 18,
        color: "#514F5B",
    },
    text2: {
        fontFamily: 'NunitoSans-Bold',
        fontSize: 16,
        color: "#4D4B57",
    },
    text3: {
        fontFamily: 'NunitoSans-Regular',
        fontSize: 14,
        marginTop: 10,
        color: '#7A7886'
    },
    quickCard: {
        backgroundColor:'#FFFFFF', 
        borderRadius: 10, 
        width: 96, 
        padding : 15,
        margin: 5, 
        marginRight: 20,
        marginTop: 30,
        alignItems: 'center'
    },
    button2: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 50,
        height: 45,
        marginBottom: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e6e6e6',
        fontFamily: 'Kanit-SemiBold',
      },
      button2Confirmed: {
        backgroundColor: '#6379F4',
      },
    });

export default styles