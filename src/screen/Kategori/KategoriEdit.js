import React, { Component } from 'react';
import { 
    Container, 
    Header, 
    Content,
    Button, 
    Icon, 
    Text,
    Body,
    Left,
    Form,
    Input,
    Label,
    Item,
    Title
} from 'native-base';

import { 
    AsyncStorage, 
} from 'react-native'; 

import Api from '../../services/api';

class KategoriEdit extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: '',
            id: '',
            error: false
        }
    }

    componentDidMount = () => {
        this._retrieveData()
    }

    componentWillReceiveProps = () => {
        this._retrieveData()
    }

    pressGoBack = () => {
        this.setState({
            id: '',
            name: ''
        })
        this.props.navigation.navigate('Kategori')
    }

    _retrieveData = async() => {
        try {
            const value = await AsyncStorage.getItem('idKategori');
            console.log('ID yang diterima: ' + value)
            if (value !== null) {
                this.getKategoriById(value);
            }
        } catch (error) {
            console.log('ERR', error)
        }
    }
    
    putKategori = (id, nama) => {
        Api.create()
        .editKategori(id, nama)
        .then(res => {
            this.props.navigation.navigate('Kategori')
        })
        .catch(err => {
            console.log('ERR', err)
            this.setState({
                error: true
            })
        })
    }

    getKategoriById = async(id) => {
        Api.create()
        .getKategoriById(id)
        .then(res => {
            this.setState({
                id: res.data.data.id,
                name: res.data.data.name
            })
        })
        .catch(err => {
            console.log('ERR', err)
            this.setState({
                error: true
            })
        })
    }

    render() {
        const { id, name } = this.state;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent
                            onPress = {() =>
                                this.props.navigation.navigate("Kategori")
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
                            <Label>Kategori</Label>
                            <Input 
                                onChangeText = { (name) => this.setState({ name }) }
                                value = { name }/>
                        </Item>
                    </Form>
                    <Body style = {{ marginTop: 32 }} >
                        <Button iconLeft primary
                            onPress = { () => this.putKategori(id, name) }>
                            <Icon name='checkmark' />
                            <Text>Save</Text>
                        </Button>
                    </Body>
                </Content>
            </Container>
        );
    }
}

export default KategoriEdit;