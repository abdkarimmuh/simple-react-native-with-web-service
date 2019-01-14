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

import Api from '../../services/api';

class BarangDetail extends Component {

    constructor(props){
        super(props)
        this.state = {
            kategori: [],
            id: '',
            name: '',
            count: '',
            selected: '',
            error: false,
        }
    }

    componentDidMount = () => {
        this.getKategori()
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
        })
        this.props.navigation.goBack()
    }
    
    postBarang = (name, count, idKategori) => {
        Api.create()
        .addBarang(name, count, idKategori)
        .then(res => {
            console.log('Upload : '+ name + ' ' + count + ' ' + idKategori)
            this.props.navigation.navigate('Barang')
            this.setState({
                id: '',
                name: '',
                count: '',
                selected: '',
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
        Api.create()
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
        const { kategori, name, count, selected } = this.state;
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
                        <Item floatingLabel last>
                            <Label>Jumlah</Label>
                            <Input 
                                keyboardType = {'number-pad'}
                                onChangeText = { (count) => this.setState({ count }) }
                                value = { count }/>
                        </Item>
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
                    </Form>
                    <Body style = {{ marginTop: 32 }} >
                        <Button iconLeft primary
                            onPress = { () => this.postBarang(name, count, selected) }>
                            <Icon name='checkmark' />
                            <Text>Save</Text>
                        </Button>
                    </Body>
                </Content>
            </Container>
        );
    }
}

export default BarangDetail;