import React, {useState} from 'react';
import styles from './style';
import{ KeyboardAvoidingView,StatusBar } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { Item, Input, List, ListItem, View, Container, CardItem, Thumbnail, Content, Left, Body, Icon, Text } from 'native-base';

function AmountInput ({navigation}, props) {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <Container>
            <StatusBar
            animated={true}
            backgroundColor="#FFFFFF"/>
            <CardItem style={styles.headerCard}>
              <Left>
                <Icon onPress={() => navigation.goBack() } type="MaterialCommunityIcons" name="arrow-left" style={{color: '#4D4B57'}} />
                <Text style={styles.text1}>Transfer</Text>
              </Left>
            </CardItem>
        <Content>
            <KeyboardAvoidingView>
            <List style={{ marginBottom: 10, marginTop: 20}}>
                <ListItem elevation={5} style={{backgroundColor: '#FFFFFF', borderRadius: 10, padding: 10, margin: 30}} thumbnail>
                    <Left>
                        <Thumbnail square source={require('../../assets/img/pic-samuel.png')}/>
                    </Left>
                    <Body>
                        <Text style={styles.text2}>Samuel Suhi</Text>
                        <Text style={styles.text3}>+62 813-8492-9994</Text>
                    </Body>
                </ListItem>
            </List>
            <View style={{padding: 20}}>
                <Text style={{...styles.text2, textAlign:'center'}}>
                    Rp120.000 Available
                </Text>
                <Item style={{marginTop: 20, borderColor: 'transparent'}}>
                    <TextInputMask
                    textAlign="center"
                    placeholder="0.00"
                    numeric
                    keyboardType="numeric"
                    style={{...styles.text2, color: '#6379F4', width: '100%', fontSize: 42, height: 100}}
                    placeholderTextColor="#B5BDCC"
                    onChangeText={(formatted, extracted) => {
                        console.log(formatted) // +1 (123) 456-78-90
                        console.log(extracted) // 1234567890
                    }}
                    mask={"Rp[000].[000].[000]"}
                    />
                </Item>
                <Item style={{marginTop: 50, marginBottom: 50, borderColor: 'transparent'}}>
                    <Icon type="MaterialCommunityIcons" name="pencil-outline" style={{color: '#A9A9A9'}} />
                    <Input
                    {...props}
                    onBlur={() => setIsFocused(false)}
                    onFocus={() => setIsFocused(true)}
                    placeholder="Add some notes"
                    style={[props.style, isFocused && {borderBottomWidth: 1, borderColor: 'blue', fontSize: 16, color: '#3A3D42', fontFamily: 'NunitoSans-SemiBold'}]}
                    placeholderTextColor="#B5BDCC"
                    />
                </Item>
            </View>
            </KeyboardAvoidingView>
        </Content>
      </Container>
    )
}
export default AmountInput