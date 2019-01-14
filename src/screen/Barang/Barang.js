import React, { Component } from 'react';
import { 
    Container, 
    Header, 
    Content,
    Button, 
    Icon, 
    Text,
    Body,
    Right,
    List,
    ListItem,
    Title,
} from 'native-base';

import { 
    AsyncStorage, 
} from 'react-native'; 

import Api from '../../services/api';

class Barang extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: [],
            error: false
        }
    }

    componentDidMount = () => {
        this.getBarang()
    }

    pressAdd = () => {
        console.log('onAddBarang')
        this.props.navigation.navigate('BarangAdd', { title:'Tambah Barang' })
    }

    pressEdit = (id) => {
        console.log('onEditBarang: ' + id)
        this._storeId(id + '');
        this.props.navigation.navigate('BarangEdit', { title:'Edit Barang' })
    }

    pressRefresh = () => {
        console.log('onRefreshBarang')
        this.getBarang()
    }

    _storeId = async (id) => {
        try {
            await AsyncStorage.setItem('idBarang', id)
            console.log ('ID yang dikirim: ' + id)
        } catch (error) {
            console.log('ERR', error)
        }
    }

    getBarang = async() => {
        Api.create()
        .getBarang()
        .then(res => {
            this.setState({ data: res.data.data })
        })
        .catch(err => {
            console.log('ERR', err)
            this.setState({
                error: true
            })
        })
    }

    delBarang = async(id) => {
        Api.create()
        .delBarang(id)
        .then(res => {
            console.log('onDeleteBarang: ' + id)
        })
        .catch(err => {
            console.log('ERR', err)
            this.setState({
                error: true
            })
        })
        this.pressRefresh()
    }

    render() {
        const { data } = this.state;
        return (
            <Container>
                <Header noLeft>
                    <Body>
                        <Title>List Barang</Title>
                    </Body>
                    <Right>
                        <Button transparent
                        onPress = { () => 
                            this.pressAdd()
                        }>
                            <Icon name='add' />
                        </Button>
                        <Button transparent
                            onPress = { () => 
                                this.pressRefresh()
                            }>
                            <Icon name='refresh' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <List>
                    {
                        data.map((d) => (
                        <ListItem key = {d.id}>
                            <Body>
                                <Text>{d.nama_barang} ({d.count} buah) </Text>
                                <Text note numberOfLines={1}>{d.kategori}</Text>
                            </Body>
                            <Right>
                                <Body style = {{ flexDirection: 'row', alignContent: 'flex-start'}}>
                                    <Button warning transparent
                                        onPress = { () =>
                                            this.pressEdit(d.id)
                                        }>
                                        <Icon name='create' />
                                    </Button>
                                    <Button danger transparent
                                        onPress = { () =>
                                            this.delBarang(d.id)
                                        }>
                                        <Icon name='close' />
                                    </Button>
                                </Body>
                            </Right>
                        </ListItem>
                        ))
                    }
                    </List>
                </Content>
            </Container>
        );
    }
}

export default Barang;