const quickData = [
    {
        id: 1,
        pict: require('../../assets/img/pic-michi.png'),
        name: 'Michi',
        phone: '+62 811-1133-4455',
        unknown: -9994
    },
    {
        id: 2,
        pict: require('../../assets/img/pic-dody.png'),
        name: 'Dody',
        phone: '+62 812-2233-4665',
        unknown: -3561
    },
    {
        id: 3,
        pict: require('../../assets/img/pic-rian.png'),
        name: 'Rian',
        phone: '+62 813-2367-8646',
        unknown: -3822
    },
    {
        id: 4,
        pict: require('../../assets/img/pic-samuel.png'),
        name: 'Samuel',
        phone: '+62 814-2678-0883',
        unknown: -6487
    },
]
function quickAccess() {
    return (
        <View style={styles.containerQuick}>
            <Text style={styles.text1}>
                Quick Access
            </Text>
            <ScrollView
                horizontal={true}
                contentContainerStyle={{ display: 'flex', flexDirection: 'row' }} >
                {quickData.map((item, i) =>
                    <TouchableWithoutFeedback
                        key={item.id}
                        onPress={() => {
                            /* 1. Navigate to the Amount Input route with state passed */
                            navigation.navigate('AmountInput', {
                                receiver: item.id,
                                name: item.name,
                                pict: `${item.pict}`,
                                phone: item.phone
                            });
                        }}>
                        <View
                            elevation={10}
                            style={styles.quickCard}>
                            <Thumbnail square source={item.pict} />
                            <Text style={styles.text2}>{item.name}</Text>
                            <Text style={styles.text3}>{item.unknown}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )}
            </ScrollView>
        </View>
    )
}

