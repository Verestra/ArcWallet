import React, {useRef, useState, useEffect} from 'react';
import {View, ToastAndroid, TextInput} from 'react-native';
import styles from './style';

function OtpInput(props) {
  const {secureIn} = props;
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [input6, setInput6] = useState('');
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();
  const inputRef5 = useRef();
  const inputRef6 = useRef();
  const nextInput = (text, ref) => {
    if (text.length === 1) {
      ref.current.focus();
    }
  };
  useEffect(() => {
    if (props.resetInp === true) {
      setInput1('');
      setInput2('');
      setInput3('');
      setInput4('');
      setInput5('');
      setInput6('');
      inputRef1.current.focus();
    }
  }, [props.resetInp]);
  useEffect(() => {
    props.changeHandler(
      `${input1 || ''}${input2 || ''}${input3 || ''}${input4 || ''}${
        input5 || ''
      }${input6 || ''}`,
    );
  }, [input1, input2, input3, input4, input5, input6]);
  //   const sendHandler = () => {
  //     const otp = `${input1 || ''}${input2 || ''}${input3 || ''}${input4 || ''}`;
  //     if (otp.length < 6) {
  //       ToastAndroid.show('Please fill all field!', ToastAndroid.SHORT);
  //       return;
  //     }
  //   };

  return (
    <View style={styles.otpContainer}>
      {!secureIn ? (
        <>
          <TextInput
            onFocus={() => setInput1('')}
            value={input1}
            returnKeyType="next"
            clearTextOnFocus={true}
            // keyboardType="phone-pad"
            ref={inputRef1}
            style={
              input1.length > 0
                ? {...styles.otp, ...styles.borderPrimary}
                : styles.otp
            }
            underlineColor="black"
            maxLength={1}
            onChangeText={text => {
              setInput1(text);
              nextInput(text, inputRef2);
            }}
          />
          <TextInput
            onFocus={() => setInput2('')}
            value={input2}
            returnKeyType="next"
            clearTextOnFocus={true}
            // keyboardType="phone-pad"
            ref={inputRef2}
            style={
              input2.length > 0
                ? {...styles.otp, ...styles.borderPrimary}
                : styles.otp
            }
            underlineColor="black"
            maxLength={1}
            onChangeText={text => {
              setInput2(text);
              nextInput(text, inputRef3);
            }}
          />
          <TextInput
            onFocus={() => setInput3('')}
            value={input3}
            returnKeyType="next"
            clearTextOnFocus={true}
            // keyboardType="phone-pad"
            ref={inputRef3}
            style={
              input3.length > 0
                ? {...styles.otp, ...styles.borderPrimary}
                : styles.otp
            }
            underlineColor="black"
            maxLength={1}
            onChangeText={text => {
              setInput3(text);
              nextInput(text, inputRef4);
            }}
          />
          <TextInput
            onFocus={() => setInput4('')}
            value={input4}
            returnKeyType="next"
            clearTextOnFocus={true}
            // keyboardType="phone-pad"
            ref={inputRef4}
            style={
              input4.length > 0
                ? {...styles.otp, ...styles.borderPrimary}
                : styles.otp
            }
            underlineColor="black"
            maxLength={1}
            onChangeText={text => {
              setInput4(text);
              nextInput(text, inputRef5);
            }}
          />
          <TextInput
            onFocus={() => setInput5('')}
            value={input5}
            returnKeyType="next"
            clearTextOnFocus={true}
            // keyboardType="phone-pad"
            ref={inputRef5}
            style={
              input5.length > 0
                ? {...styles.otp, ...styles.borderPrimary}
                : styles.otp
            }
            underlineColor="black"
            maxLength={1}
            onChangeText={text => {
              setInput5(text);
              nextInput(text, inputRef6);
            }}
          />
          <TextInput
            onFocus={() => setInput6('')}
            value={input6}
            returnKeyType="done"
            clearTextOnFocus={true}
            // keyboardType="phone-pad"
            ref={inputRef6}
            style={
              input6.length > 0
                ? {...styles.otp, ...styles.borderPrimary}
                : styles.otp
            }
            underlineColor="black"
            maxLength={1}
            onChangeText={text => {
              setInput6(text);
            }}
          />
        </>
      ) : (
        <>
          <TextInput
            onFocus={() => setInput1('')}
            value={input1}
            returnKeyType="next"
            clearTextOnFocus={true}
            keyboardType="phone-pad"
            ref={inputRef1}
            style={
              input1.length > 0
                ? {...styles.otp, ...styles.borderPrimary}
                : styles.otp
            }
            underlineColor="black"
            maxLength={1}
            onChangeText={text => {
              setInput1(text);
              nextInput(text, inputRef2);
            }}
          />
          <TextInput
            onFocus={() => setInput2('')}
            value={input2}
            returnKeyType="next"
            clearTextOnFocus={true}
            keyboardType="phone-pad"
            ref={inputRef2}
            style={
              input2.length > 0
                ? {...styles.otp, ...styles.borderPrimary}
                : styles.otp
            }
            underlineColor="black"
            maxLength={1}
            onChangeText={text => {
              setInput2(text);
              nextInput(text, inputRef3);
            }}
          />
          <TextInput
            onFocus={() => setInput3('')}
            value={input3}
            returnKeyType="next"
            clearTextOnFocus={true}
            keyboardType="phone-pad"
            ref={inputRef3}
            style={
              input3.length > 0
                ? {...styles.otp, ...styles.borderPrimary}
                : styles.otp
            }
            underlineColor="black"
            maxLength={1}
            onChangeText={text => {
              setInput3(text);
              nextInput(text, inputRef4);
            }}
          />
          <TextInput
            onFocus={() => setInput4('')}
            value={input4}
            returnKeyType="next"
            clearTextOnFocus={true}
            keyboardType="phone-pad"
            ref={inputRef4}
            style={
              input4.length > 0
                ? {...styles.otp, ...styles.borderPrimary}
                : styles.otp
            }
            underlineColor="black"
            maxLength={1}
            onChangeText={text => {
              setInput4(text);
              nextInput(text, inputRef5);
            }}
          />
          <TextInput
            onFocus={() => setInput5('')}
            value={input5}
            returnKeyType="next"
            clearTextOnFocus={true}
            keyboardType="phone-pad"
            ref={inputRef5}
            style={
              input5.length > 0
                ? {...styles.otp, ...styles.borderPrimary}
                : styles.otp
            }
            underlineColor="black"
            maxLength={1}
            onChangeText={text => {
              setInput5(text);
              nextInput(text, inputRef6);
            }}
          />
          <TextInput
            onFocus={() => setInput6('')}
            value={input6}
            returnKeyType="done"
            clearTextOnFocus={true}
            keyboardType="phone-pad"
            ref={inputRef6}
            style={
              input6.length > 0
                ? {...styles.otp, ...styles.borderPrimary}
                : styles.otp
            }
            underlineColor="black"
            maxLength={1}
            onChangeText={text => {
              setInput6(text);
            }}
          />
        </>
      )}
    </View>
  );
}

export default OtpInput;
