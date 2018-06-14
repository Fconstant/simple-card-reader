import React from 'react'
import { View, Button, Text, StyleSheet, ViewStyle, TextStyle, Platform, DrawerLayoutAndroid } from 'react-native'
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle,
    textInfoBox: {
        flexDirection: 'row',
        marginVertical: 6,
        justifyContent: 'space-around'
    } as ViewStyle,
    textInfoLabel: {
        fontSize: 16,
        fontWeight: 'bold'
    } as TextStyle,
    textInfoValue: {
        fontSize: 16,
        fontWeight: 'bold'
    } as TextStyle,
})


type Card = {
    cardType: string // Localized card type.
    cardNumber: string  // Card number.
}

type CardInfoState = {
    cardInfo?: Card,
    error: boolean,
}

export class CardInfoScreen extends React.Component<{}, CardInfoState> {

    state: CardInfoState = {
        error: false
    }

    componentWillMount() {
        if (Platform.OS === 'ios') {
            CardIOUtilities.preload();
        }
    }

    scanCard = () => {
        this.setState({ error: false })
        CardIOModule
            .scanCard({
                suppressConfirmation: true,
                hideCardIOLogo: true,
                languageOrLocale: "pt_BR"
            })
            .then((cardInfo: Card) => {
                this.setState({ cardInfo })
            })
            .catch(() => {
                this.setState({ error: true })
            })
    }

    render() {
        const { cardInfo } = this.state;
        return (
            <View style={styles.container}>
                <Button
                    title="Scan Card"
                    onPress={this.scanCard}
                />
                <View style={{ height: 6 }}/>
                { !!cardInfo ? (
                    <>
                        <View style={styles.textInfoBox}>
                            <Text style={styles.textInfoLabel}>Número</Text>
                            <Text style={styles.textInfoValue}>{ cardInfo.cardNumber }</Text>
                        </View>
                        <View style={styles.textInfoBox}>
                            <Text style={styles.textInfoLabel}>Tipo do Cartão</Text>
                            <Text style={styles.textInfoValue}>{ cardInfo.cardType }</Text>
                        </View>
                    </>
                ) : null }
            </View>
        )
    }

}