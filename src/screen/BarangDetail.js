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
    Input
} from 'native-base';

import Api from '../services/api';

class BarangDetail extends Component {

    constructor(props){
        super(props)
        this.state = {
            kategori: [],
            name: '',
            count: 0,
            error: false
        }
    }

    componentDidMount = () => {
        this.getKategori()
    }

    postBarang = (name, count, idKategori) => {
        Api.create()
        .addBarang(name, count, idKategori)
        .then(res => {
            this.props.navigation.navigate("Barang")
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
        const { kategori } = this.state;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent
                            onPress = {() =>
                                this.props.navigation.goBack()
                            }>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.props.navigation.state.params.title}</Title>
                    </Body>
                </Header>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Nama Barang</Label>
                            <Input 
                                onChangeText = { (name) => this.setState({ name }) }
                                value = { this.state.name }/>
                        </Item>
                        <Item floatingLabel last>
                            <Label>Jumlah</Label>
                            <Input 
                                onChangeText = { (count) => this.setState({ count }) }
                                value = { this.state.count }/>
                        </Item>
                    </Form>
                    <Body style = {{ marginTop: 32 }} >
                        <Button iconLeft primary
                            onPress = { () => this.postKategori(this.state.name) }>
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