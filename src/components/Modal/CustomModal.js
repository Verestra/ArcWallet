import React from 'react';
import {Modal, View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {Icon, Button} from 'native-base';

function CustomModal({
  modalVisible,
  setModalVisible,
  accHandler,
  success,
  message,
  isLoading,
  isErr,
  phoneNumber,
  keyPhoneNumber,
  decHandler,
  logoutModal,
}) {
  return (
    <Modal
      animationType="slide"
      fullscreen={true}
      transparent={true}
      visible={modalVisible}>
      <View
        style={{
          ...styles.centeredView,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#6379F4" />
        ) : (
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 20,
              padding: 20,
            }}>
            {success || isErr || phoneNumber ? null : (
              <Icon
                style={{
                  alignSelf: 'flex-end',
                  fontSize: 34,
                }}
                onPress={() => {
                  setModalVisible(false);
                }}
                name="close"
              />
            )}
            {success ? (
              <View style={{alignItems: 'center'}}>
                <Icon
                  name="checkmark-circle"
                  style={{
                    fontSize: 100,
                    color: '#1EC15F',
                    marginTop: 0,
                    alignSelf: 'center',
                  }}
                />
                <Text style={{color: '#1EC15F', fontSize: 20}}>{message}</Text>
              </View>
            ) : (
              <View style={{alignItems: 'center'}}>
                <Icon
                  name={
                    keyPhoneNumber
                      ? 'key'
                      : logoutModal
                      ? 'log-out-outline'
                      : 'close-circle'
                  }
                  style={
                    keyPhoneNumber
                      ? {
                          fontSize: 100,
                          color: '#6379F4',
                          marginTop: 0,
                          alignSelf: 'center',
                        }
                      : {
                          fontSize: 100,
                          color: 'red',
                          marginTop: 0,
                          alignSelf: 'center',
                        }
                  }
                />
                {phoneNumber || keyPhoneNumber ? (
                  <Text
                    style={
                      keyPhoneNumber
                        ? {color: '#000', fontSize: 20, textAlign: 'center'}
                        : {color: 'red', fontSize: 20, textAlign: 'center'}
                    }>
                    {keyPhoneNumber
                      ? 'are you sure want to change primary to '
                      : logoutModal
                      ? null
                      : 'are you sure want to delete '}
                  </Text>
                ) : (
                  <Text style={{color: 'red', fontSize: 20}}>{message}</Text>
                )}
                {phoneNumber || keyPhoneNumber ? (
                  <Text
                    style={
                      keyPhoneNumber
                        ? {color: '#000', fontSize: 20, textAlign: 'center'}
                        : {color: 'red', fontSize: 20, textAlign: 'center'}
                    }>
                    {keyPhoneNumber ? message : message}
                  </Text>
                ) : null}
              </View>
            )}
            {phoneNumber ? (
              <View style={{flexDirection: 'row', width: '80%', marginTop: 50}}>
                <Button
                  style={{
                    backgroundColor: '#6379F4',
                    width: '50%',
                    borderRadius: 14,
                    margin: 14,
                  }}
                  onPress={accHandler}>
                  <Text
                    style={{
                      color: 'white',
                      width: '100%',
                      textAlign: 'center',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 15,
                    }}>
                    Yes
                  </Text>
                </Button>
                <Button
                  style={{
                    backgroundColor: '#e6e6e6',
                    width: '50%',
                    borderRadius: 14,
                    margin: 14,
                  }}
                  onPress={decHandler}>
                  <Text
                    style={{
                      color: '#6379F4',
                      width: '100%',
                      textAlign: 'center',
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 15,
                    }}>
                    No
                  </Text>
                </Button>
              </View>
            ) : (
              <Button
                style={{
                  backgroundColor: '#6379F4',
                  width: '80%',
                  borderRadius: 14,
                  margin: 14,
                  marginTop: 30,
                }}
                onPress={accHandler}>
                <Text
                  style={{
                    color: '#fff',
                    width: '100%',
                    textAlign: 'center',
                    fontFamily: 'Montserrat-SemiBold',
                    fontSize: 15,
                  }}>
                  {success || isErr ? 'Close' : 'Save'}
                </Text>
              </Button>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CustomModal;
