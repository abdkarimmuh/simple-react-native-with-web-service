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

import Api from '../services/api';

class Barang extends Component {

    constructor(props){
        super(props)
        this.state = {
            data: [],
            error: false
        }
    }

    componentDidMount = () => {
        this.getBarang();
    }

    pressAdd = () => {
        this.props.navigation.navigate("BarangDetail", { title:"Tambah Barang" })
    }

    getBarang = async() => {
        Api.create()
        .getBarangAll()
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
                        <Title>List Barang</Title>
                    </Body>
                    <Right>
                        <Button transparent
                        onPress = { () => 
                            this.pressAdd()
                        }>
                            <Icon name='add' />
                        </Button>
                        <Button
                            onPress = { () => 
                                this.getBarang()
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
                                    <Button warning transparent>
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

export default Barang;