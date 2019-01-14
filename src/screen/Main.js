import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { 
    Footer, 
    FooterTab, 
    Button, 
    Text
} from 'native-base';

import Barang from './Barang/Barang';
import BarangAdd from './Barang/BarangAdd';
import BarangEdit from './Barang/BarangEdit';
import Kategori from './Kategori/Kategori';
import KategoriDetail from './Kategori/KategoriDetail';

const Main = createBottomTabNavigator(
    
    {
        Barang: { screen: Barang },
        BarangAdd: { screen: BarangAdd },
        BarangEdit: { screen: BarangEdit },
        Kategori: { screen: Kategori },
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
                            active = { props.navigation.state.index === 0 && props.navigation.state.index === 1 &&  props.navigation.state.index === 2}
                            onPress = { () => props.navigation.navigate("Barang")}>
                            <Text>Barang</Text>
                        </Button>
                        <Button
                            active = { props.navigation.state.index === 3 && props.navigation.state.index === 4 }
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