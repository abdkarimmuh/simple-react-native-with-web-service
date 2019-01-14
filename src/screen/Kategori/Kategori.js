import React, { Component } from 'react';
import { 
    Container, 
    Header, 
    Content,
    Button, 
    Text,
    Body,
    Title,
    List,
    ListItem,
    Icon,
    Right
} from 'native-base';

import { 
    AsyncStorage, 
} from 'react-native'; 

import Api from '../../services/api';

class Kategori extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: [],
            error: false
        }
    }

    componentDidMount = () => {
        this.getKategori();
    }

    pressAdd = () => {
        console.log('onAddKategori')
        this.props.navigation.navigate('KategoriAdd', { title:'Tambah Kategori' })
    }

    pressEdit = (id) => {
        console.log('onEditKategori: ' + id)
        this._storeId(id + '');
        this.props.navigation.navigate('KategoriEdit', { title:'Edit Kategori' })
    }

    pressRefresh = () => {
        console.log('onRefreshKategori')
        this.getKategori()
    }

    _storeId = async (id) => {
        try {
            await AsyncStorage.setItem('idKategori', id)
            console.log ('ID yang dikirim: ' + id)
        } catch (error) {
            console.log('ERR', error)
        }
    }

    getKategori = async() => {
        Api.create()
        .getKategori()
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

    render() {
        const { data } = this.state;
        return (
            <Container>
                <Header noLeft>
                    <Body>
                        <Title>List Kategori</Title>
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
                                <Text>{d.name}</Text>
                            </Body>
                            <Right>
                                <Body style = {{ flexDirection: 'row', alignContent: 'flex-start'}}>
                                    <Button warning transparent
                                        onPress = { () =>
                                            this.pressEdit(d.id)
                                        }>
                                        <Icon name='create' />
                                    </Button>
                                    <Button danger transparent>
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

export default Kategori;