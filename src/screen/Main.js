import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { 
    Footer, 
    FooterTab, 
    Button, 
    Text
} from 'native-base';

import Barang from './Barang';
import Kategori from './Kategori';
import BarangDetail from './BarangDetail';
import KategoriDetail from './KategoriDetail';

const Main = createBottomTabNavigator(
    
    {
        Barang: { screen: Barang },
        Kategori: { screen: Kategori },
        BarangDetail: { screen: BarangDetail },
        KategoriDetail: { screen: KategoriDetail },
    },
    {
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        tabBarComponent: props => {
            return (
                <Footer>
                    <FooterTab>
                        <Button
                            active = { props.navigation.state.index === 0 && props.navigation.state.index === 2 }
                            onPress = { () => props.navigation.navigate("Barang")}>
                            <Text>Barang</Text>
                        </Button>
                        <Button
                            active = { props.navigation.state.index === 1 && props.navigation.state.index === 3 }
                            onPress = { () => props.navigation.navigate("Kategori")}>
                            <Text>Kategori</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            );
        }
    }
);

export default createAppContainer(Main);