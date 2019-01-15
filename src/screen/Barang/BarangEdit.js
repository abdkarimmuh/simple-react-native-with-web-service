import React, { Component } from 'react';
import { 
    Container, 
    Header, 
    Content,
    Button, 
    Icon,
    Body,
    Form,
    Item,
    Label,
    Title,
    Left,
    Input,
    Picker,
    Text
} from 'native-base';

import { 
    AsyncStorage, 
} from 'react-native'; 

import Api from '../../services/api';

class BarangEdit extends Component {

    constructor(props){
        super(props)
        this.state = {
            kategori: [],
            id: '',
            name: '',
            count: '',
            selected: '',
            error: false,
            isLoading: true,
        }
    }

    componentDidMount = () => {
        this._retrieveData()
    }

    componentWillReceiveProps = () => {
        this._retrieveData()
        console.log('Selected: ' + this.state.selected)
    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    pressGoBack = () => {
        this.setState({
            id: '',
            name: '',
            count: '',
            selected: '',
            isLoading: true,
        })
        this.props.navigation.navigate('Barang')
    }

    _retrieveData = async() => {
        try {
            const value = await AsyncStorage.getItem('idBarang');
            console.log('ID yang diterima: ' + value)
            if (value !== null) {
                await this.getBarangById(value);
                await this.getKategori()
                this.setState({ isLoading: false })
            }
        } catch (error) {
            console.log('ERR', error)
        }
    }
    
    putBarang = (id, nama, jumlah, kategori) => {
        Api.create()
        .editBarang(id, nama, jumlah, kategori)
        .then(res => {
            this.props.navigation.navigate('Barang')
        })
        .catch(err => {
            console.log('ERR', err)
            this.setState({
                error: true
            })
        })
    }

    getBarangById = async(id) => {
        await Api.create()
        .getBarangById(id)
        .then(res => {
            this.setState({ 
                id: res.data.data.id + '',
                name: res.data.data.nama_barang + '',
                count: res.data.data.count + '',
                selected: res.data.data.id_kategori
            })
        })
        .catch(err => {
            console.log('ERR', err)
            this.setState({
                error: true
            })
        })
    }

    getKategori = async() => {
        await Api.create()
        .getKategori()
        .then(res => {
            this.setState({ kategori: res.data.data })
        })
        .catch(err => {
            console.log('ERR', err)
            this.setState({
                error: true
            })
        })
    }

    render() {
        const { kategori, name, count, selected, id, isLoading } = this.state;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent
                            onPress = {() =>
                                this.pressGoBack()
                            }>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.props.navigation.state.params.title}</Title>
                    </Body>
                </Header>
                <Content padder>
                    <Form>
                        <Item floatingLabel>
                            <Label>Nama Barang</Label>
                            <Input 
                                onChangeText = { (name) => this.setState({ name }) }
                                value = { name }/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Jumlah</Label>
                            <Input 
                                keyboardType = {'number-pad'}
                                onChangeText = { (count) => this.setState({ count }) }
                                value = { count }/>
                        </Item>
                    </Form>
                    <Form>
                        {
                            !isLoading
                            &&
                            <Picker
                                mode = 'dropdown'
                                iosIcon = { <Icon name = 'arrow-down' /> }
                                placeholder = 'Pilih Kategori'
                                placeholderStyle = {{ color: '#bfc6ea' }}
                                placeholderIconColor = '#007aff'
                                style = {{ width: undefined, marginTop: 16 }}
                                selectedValue = { selected }
                                onValueChange = { this.onValueChange.bind(this) }
                            >
                            {
                                kategori.map((d) => (
                                    <Picker.Item label = {d.name} value = {d.id} key = {d.id} />
                                ))
                            }
                            </Picker>
                        }
                    </Form>
                    <Body style = {{ marginTop: 32 }} >
                        <Button iconLeft primary
                            onPress = { () => this.putBarang(id, name, count, selected) }>
                            <Icon name='checkmark' />
                            <Text>Save</Text>
                        </Button>
                    </Body>
                </Content>
            </Container>
        );
    }
}

export default BarangEdit;